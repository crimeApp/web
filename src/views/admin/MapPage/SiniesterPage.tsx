import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, GridSize, IconButton } from "@material-ui/core";
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
import { useHistory, useLocation } from "react-router";
import Translate from "../../../assets/traslate";
import EditIcon from '@material-ui/icons/Edit';
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Select from "../../../components/select/Select";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import { ColorCA } from "../../../style/type-style";
import SiniesterList from "./layers/SiniesterList";
import { CancelTwoTone, Search } from "@material-ui/icons";
import { age_options, attack_type_options, hair_options, height_options, number_options, sex_options, skin_options } from "../../../assets/options";
import { BackButtonString } from "../component/BackButton";
import { UnixToDate, UnixToDay, UnixToTime } from "../../../utils/time";
import { deepDiffMapper } from "../../../utils/controllers";

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

const SiniesterPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate["ES"]
        , location = useLocation()
        , [state, set_state] = useState<SiniesterModel>()
        , [can_edit, set_can_edit] = useState(false)
        , [edit_state, set_edit_state] = useState<boolean>(true)
        , [errors, set_errors] = useState<any>()
        , [versions, set_versions] = useState<{
            name: string,
            deep: {
                label: string,
                now: string,
                before: string,
                type: string
            }[]
        }[] | undefined>()
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
                    return set_handle_page(prev => ({
                        ...prev,
                        msg: TRANSLATE.OK.SAVE,
                        color: "green",
                        notification: true,
                        severity: "success",
                        loading: false,
                        callback: () => history.goBack()
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

        const siniester_data = location.state as SiniesterModel

        if (!!siniester_data) {
            set_handle_page(prev => ({ ...prev, loading: false }))
            return set_state(siniester_data)
        }

        (async () => {
            const request = await HandleAPI({
                method: "get",
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
                    set_state(request.data)
                    return set_handle_page(prev => ({
                        ...prev,
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
        })()
    }, [])

    useEffect(() => {
        if (state && state.versions) {
            // @ts-ignore
            set_versions(Object.keys(state.versions).map(ver => ({
                name: ver,
                deep: deepDiffMapper().map({
                    ...state,
                    versions: undefined,
                    date: undefined,
                    geopoint: undefined,
                    id: undefined,
                    stolen_items: undefined,
                    updatedAt: undefined
                }, {
                    ...state.versions[ver],
                    versions: undefined,
                    date: undefined,
                    geopoint: undefined,
                    id: undefined,
                    stolen_items: undefined,
                    updatedAt: undefined
                })
            })))
        }
    }, [state])

    return <ScaffoldAdmin className="p-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} className='p-1' container justify="center" alignItems="flex-start" alignContent="flex-start">
            <BackButtonString />
            <Grid item xs={12} container>
                <Grid item xs>
                    <h4>{TRANSLATE.MAP.TITLE_INDIVIDUAL}</h4>
                    <p className="w500">Id: {state?.id}</p>
                </Grid>
                { /* <Button label={TRANSLATE.COMMON.PRINT} onClick={() => uiPrint({ name: state?.id })} /> */}
            </Grid>
            <Grid item xs={12} container>
                <Map xs={12} position={state?.geopoint} />
                <Grid id='capture' xs={12} className="background-color-white p-2" container
                    style={{
                        borderRadius: "0px 0px 5px 5px"
                    }}>
                    <Grid item xs={8} className='p-bottom-2 m-top-2 p-left-2' container alignItems="center" >
                        <h4>{TRANSLATE.FORM.THEFTINFO.CASE_INFO}</h4>
                        {
                            !edit_state && <Chip size="small" label="Editando" />
                        }
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        {
                            can_edit &&
                            <IconButton onClick={() => set_edit_state(prev => !prev)}>
                                {
                                    edit_state ? <EditIcon /> : <CancelTwoTone />
                                }
                            </IconButton>
                        }
                    </Grid>
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
                        {...inputConstructor("hour")}
                        type="time"
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
                        options={sex_options}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("emotional_damage")}
                        label={TRANSLATE.FORM.THEFTINFO.EMOTIONAL}
                        options={number_options}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("physical_damage")}
                        label={TRANSLATE.FORM.THEFTINFO.PHYSICAL}
                        options={number_options}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("victim_company")}
                        label={TRANSLATE.FORM.THEFTDETAILS.ACCOMPANIED}
                        options={number_options}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("stolen_items")}
                        xs={12}
                        label={TRANSLATE.FORM.PERSONALINFO.OBJECTS_STOLEN}
                        value={state?.stolen_items?.toString()}
                        multiline
                        rows={3}
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
                    <Select
                        {...inputConstructor("thief_agressiveness")}
                        label={TRANSLATE.FORM.THEFTDETAILS.AGRESSIVE}
                        options={number_options}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
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
                    <Select
                        {...inputConstructor("thief_height")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.FORM.THEFTDETAILS.HEIGHT}
                        options={[...height_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_company")}
                        label={TRANSLATE.FORM.THEFTDETAILS.ACCOMPANIED}
                        options={number_options}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("attack_type")}
                        options={[...attack_type_options, TRANSLATE.ERRORS.WITHOUT_DATA]}
                        xs={12}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label={TRANSLATE.LABELS.ATTACK_TYPE}
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
                    {
                        versions && <>
                            <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2 p-left-2'>
                                <h4>{TRANSLATE.MAP.VERSION_CONTROL}</h4>
                            </Grid>
                            {
                                versions.map(version =>
                                    <Grid item xs={12} container>
                                        <Accordion>
                                            <AccordionSummary>
                                                <p className="w600 p-left-2 p-right-2 p-bottom-2 fonst-size-normal">Version editada el {version.name}</p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid item xs={12} container>
                                                    <Grid className="p-2" item xs={12} container justify="center" alignItems="center">
                                                        <Grid item xs={3}>
                                                            <p className="w600">Etiqueta</p>
                                                        </Grid>
                                                        <Grid item xs={3} container justify="center">
                                                            <p className="w600">Tipo de cambio</p>
                                                        </Grid>
                                                        <Grid item xs={3} container justify="center">
                                                            <p className="w600">Valor previo</p>
                                                        </Grid>
                                                        <Grid item xs={3} container justify="center">
                                                            <p className="w600">Valor nuevo</p>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        version.deep.map((items, index) => <Grid className={`p-left-2 p-right-2 p-top-1 p-bottom-1 background-color-${index % 2
                                                            ? "white"
                                                            : "light-gray"
                                                            }`} item xs={12} container>
                                                            <Grid item xs={3} >
                                                                <p className="w600">{TRANSLATE.LABELS[items.label.toUpperCase()]}</p>
                                                            </Grid>
                                                            <Grid item xs={3} container justify="center">
                                                                <p>{items.type}</p>
                                                            </Grid>
                                                            <Grid item xs={3} container justify="center">
                                                                <p>{items.before}</p>
                                                            </Grid>
                                                            <Grid item xs={3} container justify="center">
                                                                <p>{items.now}</p>
                                                            </Grid>
                                                        </Grid>)
                                                    }
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>)
                            }
                        </>
                    }
                </Grid>
            </Grid>
        </Grid>
    </ScaffoldAdmin >
}

export default SiniesterPage;
