import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, GridSize, IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import Map from "../../../components/map/Map";
import Tabs from "../../../components/tab/Tab";
import useHandlePage from "../../../hooks/useHandlePage";
import { SiniesterModel } from "../../../models/siniester.models";
import { UnixToDate } from "../../../utils/time";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import SINIESTER_DATA from "../__data__/siniester.json";
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
import { CancelTwoTone } from "@material-ui/icons";

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
    comment: yup.string().max(150),
});

const MapAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate["ES"]
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>([])
        //@ts-ignore
        , [state, set_state] = useState<SiniesterModel>(SINIESTER_DATA[0])
        , [edit_state, set_edit_state] = useState<boolean>(true)
        , [errors, set_errors] = useState<any>()
        , classNameDetailText = "w600 p-right-1"
        , classNameDetailGrid = "p-top-1 p-bottom-1"
        , onChange = (e: any) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))
        , inputConstructor = (name: string) => ({
            name,
            xs: 6 as GridSize,
            //@ts-ignore
            value: state[name],
            color: "light-gray" as ColorCA,
            onChange: (event: any) => set_state(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , submitEditSiniester = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))

            const val = await Validator(state, schema)

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors(val.data)
            }

            const request = await HandleAPI({
                method: "put",
                path: `/sinister/${state.id}`,
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
                    }))
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                        callback: () => history.push("/admin/login")
                    })
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
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
                path: "/sinisters?order=desc",
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
                    set_siniesters(request.data)
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

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={6} className='p-1' container alignContent="flex-start">
            <Tabs xs={12} labels={["Ubicacion", "Detalle"]} >
                <Map xs={12} position={state.geopoint} />
                <Grid className="background-color-white p-2" container
                    style={{
                        borderRadius: "0px 0px 5px 5px"
                    }}>
                    <Grid item xs={8} className='p-bottom-2 m-top-2 p-left-2' container alignItems="center" >
                        <h4>Descripcion del caso</h4>
                        {
                            !edit_state && <Chip size="small" label="Editando" />
                        }
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        <IconButton onClick={() => set_edit_state(prev => !prev)}>
                            {
                                edit_state ? <EditIcon /> : <CancelTwoTone />
                            }
                        </IconButton>
                    </Grid>

                    <Input
                        {...inputConstructor("location")}
                        xs={12}
                        label="Lugar"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("place_description")}
                        xs={12}
                        label="Descripcion extra del lugar"
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    <Input
                        {...inputConstructor("comment")}
                        xs={12}
                        label="Comentarios del caso"
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2 p-left-2'>
                        <h4>Informacion de la victima</h4>
                    </Grid>
                    <Input
                        {...inputConstructor("dni")}
                        xs={12}
                        label="DNI"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("full_name")}
                        label="Nombre"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("age")}
                        label="Edad"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("sex")}
                        label="Sexo"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("emotional_damage")}
                        label="Daño emocional"
                        type="number"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("physical_damage")}
                        label="Daño fisico"
                        type="number"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("victim_company")}
                        label="Acompañado"
                        type="number"
                        disabled={edit_state}
                    />
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Objetos robados:</span>{state.stolenItems?.toString()}</p>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Otros objetos:</span>{state.other_items}</p>
                    </Grid>
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2 p-left-2'>
                        <h4>Informacion del delincuente</h4>
                    </Grid>
                    <Select
                        {...inputConstructor("thief_age")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label="Rango etario"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("thief_agressiveness")}
                        label="Nivel de agresividad"
                        type="number"
                        disabled={edit_state}
                    />
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Estaba armado? </span>{state.thief_armed ? "Si" : "No"}</p>
                    </Grid>
                    <Select
                        {...inputConstructor("thief_sex")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label="Sexo"
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_skin")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label="Color de piel"
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_hair_color")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label="Color de pelo"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("thief_company")}
                        label="Acompañado"
                        type="number"
                        disabled={edit_state}
                    />
                    <Select
                        {...inputConstructor("thief_height")}
                        //@ts-ignore
                        onChange={(e, _) => set_state(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        label="Altura"
                        disabled={edit_state}
                    />
                    <Input
                        {...inputConstructor("thief_description")}
                        xs={12}
                        label="Descripcion extra"
                        disabled={edit_state}
                        multiline
                        rows={3}
                        maxlenght={250}
                    />
                    {
                        !edit_state && (
                            <>
                                <Button xs={6} className="p-1" onClick={() => set_edit_state(true)} color="red" label="Cancelar" />
                                <Button xs={6} className="p-1" label="Guardar" color="green" onClick={submitEditSiniester} />
                            </>
                        )
                    }
                </Grid>
            </Tabs>
        </Grid>
        <SiniesterList state={state} set_state={set_state} siniesters={siniesters} />
    </ScaffoldAdmin>
}

export default MapAdminPage;
