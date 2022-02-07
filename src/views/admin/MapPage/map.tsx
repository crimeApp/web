import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, GridSize, IconButton, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import Map from "../../../components/map/Map";
import Tabs from "../../../components/tab/Tab";
import useHandlePage from "../../../hooks/useHandlePage";
import { SiniesterModel } from "../../../models/siniester.models";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import "./map.css"
import { HandleAPI } from "../../../utils/handle-api";
import { AdminContext } from "../../../context/admin-context";
import { useHistory } from "react-router";
import Translate from "../../../assets/traslate";
import EditIcon from '@material-ui/icons/Edit';
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Select from "../../../components/select/Select";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import { ColorCA } from "../../../style/type-style";
import SiniesterList from "./layers/SiniesterList";
import { Add, CancelTwoTone, More, Search, Visibility } from "@material-ui/icons";
import { age_options, attack_type_options, hair_options, height_options, sex_options, skin_options } from "../../../assets/options";
import { BackButtonString } from "../component/BackButton";
import DrawerFilterLayer from "./layers/DrawerFilter";
import qs from 'querystring';
import { UnixToDate, UnixToDay, UnixToTime } from "../../../utils/time";

const schema = yup.object().shape({
    full_name: yup.string().max(60),
    age: yup.number().min(1).max(100),
    sex: yup.string().max(30),
    attack_type: yup.string().min(3).max(30),
    location: yup.string().min(0).max(200),
    place_description: yup.string().min(3).max(50),
    thief_age: yup.string().max(60),
    thief_hair_color: yup.string().max(30),
    thief_height: yup.string().max(40),
    thief_skin: yup.string().max(30),
    thief_clothing: yup.string().max(30),
    thief_accompanied: yup.number().max(10),
    thief_armed: yup.bool(),
    thief_physical: yup.string().max(30),
    victim_accompaniment: yup.string().max(50),
    thief_sex: yup.string().min(3).max(30),
    thief_description: yup.string().min(3).max(50),
    thief_company: yup.number().min(0).max(10),
    stolen_items: yup.array().of(yup.string().required().min(3).max(30)).max(10),
    other_items: yup.string().max(250),
    comment: yup.string().max(150),
});

const MapAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate["ES"]
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>([])
        //@ts-ignore
        , [state, set_state] = useState<SiniesterModel>({})
        , [can_edit, set_can_edit] = useState(false)
        , [edit_state, set_edit_state] = useState<boolean>(true)
        , [errors, set_errors] = useState<any>()
        , contextQueryRef = useRef<any>({})
        , inputConstructor = (name: string) => ({
            name,
            xs: 6 as GridSize,
            //@ts-ignore
            value: state?.[name] || TRANSLATE.ERRORS.WITHOUT_DATA,
            color: "light-gray" as ColorCA,
            //@ts-ignore
            onChange: (event: any) => set_state(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , submitEditSiniester = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))
            set_edit_state(true)

            const val = await Validator(state, schema)

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors(val.data)
            }

            const request = await HandleAPI({
                method: "put",
                path: `/sinister/${state?.id}`,
                data: state,
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
                severity: "error",
                color: "red",
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_siniesters(prev => prev.map(e => e.id === state.id ? state : e))
                    return set_handle_page(prev => ({
                        ...prev,
                        msg: TRANSLATE.OK.SAVE,
                        color: "green",
                        notification: true,
                        severity: "success",
                        loading: false,
                    }))
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                        callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                    })
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

    useEffect(() => {
        if (!admin_state.token) {
            return history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
        }

        if (admin_state.admin) {
            set_can_edit(true)
        }

        (async () => handleFindSiniesters({}))();
    }, [])

    const handleFindSiniesters = async (data: { dni?: string, start?: string, end?: string, hash?: string }, more?: boolean) => {
        set_handle_page(prev => ({ ...prev, loading: true }))
        let timestamp;
        if (more && siniesters.length > 1) {
            data = contextQueryRef.current
            timestamp = siniesters.sort((a, b) => (b.time - a.time))[siniesters.length - 1].time
        } else {
            contextQueryRef.current = data
        }
        const query = qs.encode(JSON.parse(JSON.stringify({ ...data, timestamp })))
        const request = await HandleAPI({
            method: "get",
            path: `/sinisters?${query}`,
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
                set_siniesters(prev => more
                    ? (request.data.length > 0)
                        ? [...prev, ...request.data]
                        : prev
                    : request.data)
                set_state(request.data[0])
                return set_handle_page(prev => ({
                    ...prev,
                    loading: false,
                    error: (request.data.length < 10)
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

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={6} className='p-1' container justify="center" alignItems="center" alignContent="flex-start">
            <BackButtonString />
            <Grid item xs>
                <h3>{TRANSLATE.MAP.TITLE}</h3>
            </Grid>
            <div className="button-hover-expand m-right-2" onClick={() => history.push('/crime-form')}>
                <Add className="icon" />
                <span className="text">{TRANSLATE.COMMON.NEW_SINIESTER}</span>
            </div>
            <DrawerFilterLayer onSummit={handleFindSiniesters} />
            <Tabs className="m-top-2" xs={12} labels={["Ubicacion", "Detalle"]} >
                <Map xs={12} position={state?.geopoint} />
                <Grid className="background-color-white p-2" container
                    style={{
                        borderRadius: "0px 0px 5px 5px"
                    }}>
                    <Grid item xs={10} className='p-bottom-2 m-top-2 p-left-2' container alignItems="center" >
                        <h4>{TRANSLATE.FORM.THEFTINFO.CASE_INFO}</h4>
                        {
                            !edit_state && <Chip size="small" label="Editando" />
                        }
                    </Grid>
                    {
                        can_edit &&
                        <Tooltip title={edit_state ? TRANSLATE.MAP.EDIT : TRANSLATE.MAP.CANCEL}>
                            <IconButton onClick={() => set_edit_state(prev => !prev)}>
                                {
                                    edit_state ? <EditIcon /> : <CancelTwoTone />
                                }
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title={TRANSLATE.MAP.ONLY_SEE}>
                        <IconButton onClick={() => history.push(TRANSLATE.ROUTES.ADMIN.SINIESTER + '/' + state.id, state)}>
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Select
                        {...inputConstructor("state")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.LABELS.STATE}
                        xs={12}
                        disabled={edit_state}
                        options={['Cancelado', 'Pendiente', 'Revisado']}
                    />
                    <Input
                        {...inputConstructor("time")}
                        value={UnixToDay(state?.time)}
                        xs={6}
                        label={TRANSLATE.LABELS.DAY}
                        disabled
                    />
                    <Input
                        {...inputConstructor("time")}
                        value={UnixToTime(state?.time)}
                        xs={6}
                        label={TRANSLATE.LABELS.TIME}
                        disabled
                    />
                    <Input
                        {...inputConstructor("location")}
                        xs={12}
                        label={TRANSLATE.FORM.THEFTDETAILS.PLACE}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("place_description")}
                        xs={12}
                        label={TRANSLATE.FORM.THEFTDETAILS.PLACE_EXTRA_DESCRIPTION}
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    <Input
                        {...inputConstructor("comment")}
                        xs={12}
                        label={TRANSLATE.FORM.THEFTINFO.EXTRA_INFORMATION}
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2 p-left-2'>
                        <h4>{TRANSLATE.FORM.PERSONALINFO.VICTIM_INFORMATION}</h4>
                    </Grid>
                    <Input
                        {...inputConstructor("dni")}
                        xs={12}
                        label={TRANSLATE.FORM.PERSONALINFO.DNI}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("full_name")}
                        label={TRANSLATE.FORM.PERSONALINFO.NAME}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("age")}
                        label={TRANSLATE.FORM.PERSONALINFO.AGE}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("sex")}
                        label={TRANSLATE.FORM.PERSONALINFO.SEX}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        options={[...sex_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("emotional_damage")}
                        label={TRANSLATE.FORM.THEFTINFO.EMOTIONAL}
                        type="number"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("physical_damage")}
                        label={TRANSLATE.FORM.THEFTINFO.PHYSICAL}
                        type="number"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("victim_company")}
                        label={TRANSLATE.FORM.THEFTDETAILS.ACCOMPANIED}
                        type="number"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("stolenItems")}
                        xs={12}
                        label={TRANSLATE.FORM.PERSONALINFO.OBJECTS_STOLEN}
                        value={state?.stolen_items?.toString()}
                        multiline
                        rows={2}
                        disabled={true}
                    />
                    <Input
                        {...inputConstructor("other_items")}
                        xs={12}
                        label={TRANSLATE.FORM.PERSONALINFO.OTHERS_OBJECTS}
                        value={state?.other_items}
                        multiline
                        rows={3}
                        maxlenght={250}
                        disabled={edit_state}
                    />
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2 p-left-2'>
                        <h4>{TRANSLATE.FORM.THEFTDETAILS.THIEFINFO}</h4>
                    </Grid>
                    <Select
                        {...inputConstructor("thief_age")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.AGE}
                        disabled={edit_state}
                        options={[...age_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                    />
                    <Input
                        {...inputConstructor("thief_agressiveness")}
                        label={TRANSLATE.FORM.THEFTDETAILS.AGRESSIVE}
                        type="number"
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_sex")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.SEX}
                        options={[...sex_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_skin")}
                        options={[...skin_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.SKIN}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_hair_color")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.HAIR}
                        options={[...hair_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("thief_company")}
                        label={TRANSLATE.FORM.THEFTDETAILS.ACCOMPANIED}
                        type="number"
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("attack_type")}
                        options={[...attack_type_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        xs={12}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.ARMED}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("thief_description")}
                        xs={12}
                        label={TRANSLATE.FORM.THEFTINFO.EXTRA_INFORMATION}
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    {
                        !edit_state && (
                            <>
                                <Button xs={6} className="p-1" onClick={() => set_edit_state(true)} color="red" label={TRANSLATE.COMMON.CANCEL} />
                                <Button xs={6} className="p-1" label={TRANSLATE.COMMON.SAVE} color="green" onClick={submitEditSiniester} />
                            </>
                        )
                    }
                </Grid>
            </Tabs>
        </Grid>
        <SiniesterList state={state} set_state={set_state} siniesters={siniesters} notMore={handle_page.error} onMore={() => handleFindSiniesters({}, true)} />
    </ScaffoldAdmin>
}

export default MapAdminPage;
