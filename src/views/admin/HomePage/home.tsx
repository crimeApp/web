import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, IconButton, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import { AdminContext } from "../../../context/admin-context";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import Button from "../../../components/button/Button";
import { useHistory } from "react-router";
import { PaletaCard } from "../StadisticPage/layers/ConfigStadisticPage";
import Calendar from 'react-awesome-calendar';
import useWindowSize from "../../../hooks/useWindows";
import Input from "../../../components/input/Input";
import { HandleAPI } from "../../../utils/handle-api";
import Translate from "../../../assets/traslate";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import { Settings } from "@material-ui/icons";
import { SiniesterModel } from "../../../models/siniester.models";
import { DateMoreTime, UnixToDate, UnixToDateString, UnixToTime } from "../../../utils/time";
import { AttackTypeIcons, ChipSeverity } from "../MapPage/layers/SiniesterList";
import Heatmap from "../../../components/heatmap/Heatmap";
import MapMarkers from "../../../components/map/MapMarkers";
import { Skeleton } from "@material-ui/lab";
import Switches from "../../../components/switch/Switch";
import { StadisticCharModel, StadisticModel } from "../../../models/stadistic.model";
import CreateStatisticModel from "../../../utils/CreateStadisticModel";
import { StadisticsToChatsFormat } from "../../../utils/stadistcs-to";
import MakeChart from "../StadisticPage/layers/commond";

type EventCalendar = {
    id: string,
    color: string,
    from: {
        _seconds: number,
        nanoseconds: number
    } | Date,
    to: {
        _seconds: number,
        nanoseconds: number
    } | Date,
    title: string,
}

const schema = yup.object().shape({
    title: yup.string().max(250).required(),
    color: yup.string().max(50).required(),
    from: yup.date().required(),
    to: yup.date().required()
})

const HomeAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate["ES"]
        , [errors, set_errors] = useState<any>()
        , { xs } = useWindowSize()
        , [new_event, set_new_event] = useState<EventCalendar>()
        , [events, set_events] = useState<EventCalendar[]>([])
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>()
        , [heat_map, set_heatmap] = useState<boolean>(false)
        , [position, set_position] = useState<{
            lat: number,
            lng: number
        }>()
        //@ts-ignore
        , onChange = (e: any) => set_new_event(prev => ({ ...prev, [e.target.name]: e.target.value }))
        , [dataset, set_dateset] = useState<StadisticCharModel>()
        , summitEvent = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))
            set_errors(undefined)

            const val = await Validator(new_event, schema);

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors(val.data);
            }

            if (val.data.from > val.data.to) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors({
                    to: {
                        error: true,
                        msg: TRANSLATE.ERRORS.TO_DATE_ERROR
                    }
                });
            }

            const request = await HandleAPI({
                method: "post",
                path: "/admin/calendar",
                data: new_event,
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
            })

            if (!request) return set_handle_page({
                loading: false,
                error: true,
                notification: true,
                color: "red",
                severity: "error",
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_new_event(undefined)
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        msg: TRANSLATE.OK.SAVE,
                        notification: true,
                        severity: "success",
                        color: "green"
                    }))
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                    })
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        }
    useEffect(() => {
        if (!admin_state.token) {
            return history.push("/admin/login")
        }
        (async () => await handleFindSiniesters())();
        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: "/admin/calendar",
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
            })

            if (!request) return set_handle_page({
                loading: false,
                error: true,
                notification: true,
                color: "red",
                severity: "error",
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_events(request.data.data)
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                    }))
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        })();
    }, [])


    useEffect(() => siniesters
        ? set_dateset(StadisticsToChatsFormat(CreateStatisticModel(siniesters))["all"]["struct"])
        : undefined,
        [siniesters])

    const handleFindSiniesters = async (more?: boolean) => {
        set_handle_page(prev => ({ ...prev, loading: true }))
        let timestamp;
        if (siniesters && more && siniesters.length > 1) {
            timestamp = siniesters.sort((a, b) => (b.time - a.time))[siniesters.length - 1].time
        }
        const request = await HandleAPI({
            method: "get",
            path: `/sinisters?limit=8${timestamp ? `&timestamp=${timestamp}` : ''}`,
            config: {
                headers: {
                    Authorization: `Bearer ${admin_state.token}`
                }
            }
        })

        if (!request) return set_handle_page({
            loading: false,
            error: true,
            notification: true,
            color: "red",
            severity: "error",
            msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
        })

        switch (request.status) {
            case 200:
                set_siniesters(prev => (more && prev) ? [...prev, ...request.data] : request.data)
                return set_handle_page(prev => ({
                    ...prev,
                    loading: false,
                    error: request.data.length < 8
                }))
            case 401:
                return set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.UNAUTH,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                })
            default:
                return set_handle_page({
                    loading: false,
                    error: true,
                    notification: true,
                    color: "red",
                    severity: "error",
                    msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                })
        }
    }

    return <ScaffoldAdmin className={` ${xs ? "" : "p-left-2 p-right-2"} p-bottom-4 m-bottom-4`}>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={4} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container alignItems="center"
                style={{
                    height: "434px",
                    overflowY: 'scroll'
                }}>
                <Grid item xs={8} className='p-top-2 p-bottom-2'>
                    <h4>{TRANSLATE.HOME.LAST_SINIESTERS}</h4>
                </Grid>
                <Grid className="hover" item xs container justify="flex-end" onClick={() => history.push(TRANSLATE.ROUTES.ADMIN.MAP)}>
                    <p>{TRANSLATE.COMMON.SEE_MORE}</p>
                </Grid>
                {
                    siniesters ?
                        siniesters.map((s, i) =>
                            <Grid key={i} item xs={12} className='p-bottom-1' container >
                                <Grid
                                    container
                                    className="p-2 background-color-white border-small shadow hover"
                                    justify="flex-start"
                                    alignItems="center"
                                    alignContent="center"
                                    onClick={() => set_position({ lat: s.geopoint.lat, lng: s.geopoint.lng })}
                                    style={{
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        left: '0px',
                                        paddingLeft: '15px',
                                        paddingRight: '15px',
                                    }}>
                                        <p className="font-size-little w500">{UnixToDateString(DateMoreTime(s.time, s.hour))}</p>
                                    </div>
                                    <Grid item className="p-1" xs={9} md={7} container justify="center">
                                        <p className="overflow-text-siniester">{s.location}</p>
                                    </Grid>
                                    <Grid item className="p-1" xs={2} md={3} container justify="center">
                                        <ChipSeverity severity={s.severity} />
                                    </Grid>
                                    <Grid item xs={1} md={2}>
                                        <AttackTypeIcons text={s.attack_type} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                        :
                        <Grid item xs={12} className='p-bottom-1' container >
                            {
                                Array.from({ length: 4 }).map(e =>
                                    <Skeleton className='m-top-1 border-small' height='74px' width='100%' variant="rect" />)
                            }
                        </Grid>
                }
            </Grid>
        </Grid>
        <Grid item xs={12} sm={8} className="p-2" container>
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container alignItems="center">
                <Grid item xs={12} sm={8}>
                    <h4>{TRANSLATE.HOME.LAST_SINIESTERS_MAP}</h4>
                </Grid>
                <Switches
                    label={TRANSLATE.LABELS.HEAT_MAP}
                    value={heat_map}
                    onChange={(e) => set_heatmap(e.target.checked)}
                    sm={4}
                    xs={12}
                />
                <Grid item xs={12}>
                    {
                        siniesters && heat_map ?
                            <Heatmap data={siniesters?.map(e => [
                                e.geopoint.lat,
                                e.geopoint.lng, 10])} />
                            :
                            <MapMarkers xs={12}
                                zoom={12}
                                positionCenter={position || { lat: -31.416668, lng: -64.183334 }}
                                positions={siniesters?.map(e => ({
                                    lat: e.geopoint.lat,
                                    lng: e.geopoint.lng,
                                    name: e.attack_type,
                                    address: UnixToDateString(e.time),
                                    onClick: () => history.push(TRANSLATE.ROUTES.ADMIN.SINIESTER + '/' + e.id, e)
                                }))} />
                    }

                </Grid>
            </Grid>
        </Grid>
        {
            dataset && <Grid item xs={12} className="p-2" container >
                <Grid item xs={12} className="background-color-white border-small p-2 shadow" container alignItems="center">
                    <Grid item xs={8} >
                        <h4>{TRANSLATE.HOME.FLASH_ACCESS} de {siniesters?.length} siniestros</h4>
                    </Grid>
                    {
                        !handle_page.error && 
                        <Grid className="hover" item xs container justify="flex-end" >
                            <Button disabled={handle_page.loading} xs={12} sm={6} label={TRANSLATE.COMMON.LOAD_MORE_SINIESTERS} onClick={() => handleFindSiniesters(true)} />
                        </Grid>
                    }
                    <Grid item xs={12} className="m-bottom-2">
                        <p>{TRANSLATE.HOME.FLASH_ACCESS_HINT}</p>
                    </Grid>
                    {
                        [
                            {
                                label: TRANSLATE.STADISTICS.LABELS.CRIME_TYPE,
                                type: "Bar",
                                error: !dataset.crimeType,
                                data: { ...dataset.crimeType, datasets: [{ ...dataset.crimeType?.datasets[0], ...admin_state.config.statistics }] },
                            },
                            {
                                label: TRANSLATE.STADISTICS.LABELS.CRIME_TIME,
                                type: "Bar",
                                error: !dataset.crimeTime,
                                data: { ...dataset.crimeTime, datasets: [{ ...dataset.crimeTime?.datasets[0], ...admin_state.config.statistics }] },
                            },
                            {
                                label: TRANSLATE.STADISTICS.LABELS.CRIME_SEX,
                                type: "Bar",
                                error: !dataset.crimeSex,
                                data: { ...dataset?.crimeSex, datasets: [{ ...dataset?.crimeSex?.datasets[0], ...admin_state.config.statistics }] },
                            },
                        ].map(v => <MakeChart xs={12} sm={6} md={4} {...v} />)
                    }
                </Grid>
            </Grid>
        }
        <Grid item xs={12} className="p-2" container >
            <Grid item xs={12} sm={6}>
                <Accordion className="background-color-white border-small shadow m-bottom-2">
                    <AccordionSummary >
                        <Tooltip title="Preciona aqui para crear un evento">
                            <Grid container justify="center">
                                <h4>{TRANSLATE.EVENT.CREATE_EVENT}</h4>
                            </Grid>
                        </Tooltip>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <p className="p-left-2 p-right-2 p-bottom-2">{TRANSLATE.EVENT.CREATE_EVENT_HINT}</p>
                            </Grid>
                            <Input
                                xs={12}
                                label={TRANSLATE.EVENT.DESCRIPTION}
                                multiline
                                name="title"
                                color="light-gray"
                                error={errors?.title?.error}
                                error_msg={errors?.title?.msg}
                                value={new_event?.title || ""}
                                onChange={onChange}
                                rows={4}
                                maxlenght={250}
                            />
                            <Input
                                type="datetime-local"
                                name="from"
                                color="light-gray"
                                error={errors?.from?.error}
                                error_msg={errors?.from?.msg}
                                value={new_event?.from as Date || ""}
                                onChange={onChange}
                                xs={12}
                                label={TRANSLATE.EVENT.FROM}
                            />
                            <Input
                                type="datetime-local"
                                name="to"
                                color="light-gray"
                                value={new_event?.to as Date || ""}
                                error={errors?.to?.error}
                                error_msg={errors?.to?.msg}
                                onChange={onChange}
                                xs={12}
                                label={TRANSLATE.EVENT.TO}
                            />
                            <Input
                                xs={12}
                                name="color"
                                color="light-gray"
                                value={new_event?.color || ""}
                                error={errors?.color?.error}
                                error_msg={errors?.color?.msg}
                                onChange={onChange}
                                label={TRANSLATE.EVENT.COLOR}
                                type="color"
                            />
                            <Button xs={12} label={TRANSLATE.COMMON.SAVE} color="green" onClick={summitEvent} />
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                    <Grid item xs={12} className="p-bottom-2" container justify="center" alignItems="center">
                        <h4>{TRANSLATE.COMMON.METADATA}</h4>
                        <IconButton size='small' className="m-left-2" onClick={() => history.push(TRANSLATE.ROUTES.ADMIN.STADISTICS.CONFIG)}>
                            <Settings />
                        </IconButton>
                    </Grid>
                    {
                        admin_state.database ? <>
                            <Grid item xs={12} className="p-left-2 p-right-2">
                                <p className="p-left-2 p-right-2 w500">{TRANSLATE.COMMON.DATABASE_SELECT}</p>
                            </Grid>
                            <Grid item xs={12} className="p-left-2 p-right-2" container>
                                <Grid item xs={12} className="bakground-color-white border-small shadow p-2 hover" container justify="center" style={{
                                    borderLeft: "10px solid var(--violet)"
                                }}>
                                    <Grid item xs={12} className="p-left-2 p-right-2">
                                        <h5>{admin_state.database.name}</h5>
                                        <p>{admin_state.database.description}</p>
                                        <p className="font-size-little color-gray" onClick={
                                            //@ts-ignore
                                            () => history.push(`/admin/users/${admin_state.database.createdByID}`)
                                        }>{TRANSLATE.COMMON.CREATED_BY}{admin_state.database.createdByID}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </> : <Grid item xs={12}>
                            <p>{TRANSLATE.COMMON.WITHOUT_DATABASE}</p>
                            <Button label="Seleccionar dataset" onClick={() => history.push("/admin/statistics/config")} />
                        </Grid>
                    }
                    {
                        admin_state.config.statistics ? <PaletaCard
                            value={admin_state.config.statistics.backgroundColor}
                            label="Paleta de Colores seleccionada"
                            colors={admin_state.config.statistics.backgroundColor}
                        /> : <Grid item xs={12}>
                            <p>{TRANSLATE.COMMON.WITHOUT_COLORS}</p>
                            <Button label="Seleccionar Paleta" onClick={() => history.push("/admin/statistics/config")} />
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className="p-left-2">
                <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                    <Calendar
                        //@ts-ignore
                        events={events?.map(event => ({ ...event, from: new Date(event.from._seconds * 1000), to: new Date(event.to._seconds * 1000) }))}
                    />
                </Grid>
            </Grid>
        </Grid>
    </ScaffoldAdmin >
}

export default HomeAdminPage;