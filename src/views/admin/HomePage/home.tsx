import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@material-ui/core";
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
        , [events, set_events] = useState<EventCalendar[]>()
        //@ts-ignore
        , onChange = (e: any) => set_new_event(prev => ({ ...prev, [e.target.name]: e.target.value }))
        , summitEvent = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))

            const val = await Validator(new_event, schema);

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors(val.data);
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
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_events(request.data.data)
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        error: (request.data.length < 10)
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

    return <ScaffoldAdmin className={` ${xs ? "" : "p-left-2 p-right-2"} p-bottom-4 m-bottom-4`}>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={7} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <Calendar
                    //@ts-ignore
                    events={events?.map(event => ({ ...event, from: new Date(event.from._seconds * 1000), to: new Date(event.to._seconds * 1000) }))}
                />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} className="p-2">
            <Accordion className="background-color-white border-small shadow m-bottom-2">
                <AccordionSummary >
                    <Grid container justify="center">
                        <h4>Crear evento</h4>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Input
                            xs={12}
                            label="Descripcion"
                            multiline
                            name="title"
                            error={errors?.title?.error}
                            error_msg={errors?.title?.msg}
                            value={new_event?.title}
                            onChange={onChange}
                            rows={4}
                            maxlenght={250}
                        />
                        <Input
                            type="datetime-local"
                            name="from"
                            error={errors?.from?.error}
                            error_msg={errors?.from?.msg}
                            value={new_event?.from as Date}
                            onChange={onChange}
                            xs={12}
                            label="Fecha de inicio"
                        />
                        <Input
                            type="datetime-local"
                            name="to"
                            value={new_event?.to as Date}
                            error={errors?.to?.error}
                            error_msg={errors?.to?.msg}
                            onChange={onChange}
                            xs={12}
                            label="Fecha Final"
                        />
                        <Input
                            xs={12}
                            name="color"
                            value={new_event?.color}
                            error={errors?.color?.error}
                            error_msg={errors?.color?.msg}
                            onChange={onChange}
                            label="Color"
                            type="color"
                        />
                        <Button xs={12} label="Guardar" color="green" onClick={summitEvent} />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <Grid item xs={12} className="p-bottom-2" container justify="center">
                    <h4>Metadata</h4>
                </Grid>
                {
                    admin_state.database ? <>
                        <Grid item xs={12} className="p-left-2 p-right-2">
                            <p className="p-left-2 p-right-2 w500">Base de datos</p>
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
                                    }>Creado por {admin_state.database.createdByID}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </> : <Grid item xs={12}>
                        <p>Sin BD seleccionada</p>
                        <Button label="Seleccionar dataset" onClick={() => history.push("/admin/statistics/config")} />
                    </Grid>
                }
                {
                    admin_state.config.statistics ? <PaletaCard
                        value={admin_state.config.statistics.backgroundColor}
                        label="Paleta de Colores"
                        colors={admin_state.config.statistics.backgroundColor}
                    /> : <Grid item xs={12}>
                        <p>Sin Paleta de colores</p>
                        <Button label="Seleccionar Paleta" onClick={() => history.push("/admin/statistics/config")} />
                    </Grid>
                }
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default HomeAdminPage;