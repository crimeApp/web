import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, IconButton } from "@material-ui/core";
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

const MapAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate["ES"]
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>([])
        //@ts-ignore
        , [state, set_state] = useState<SiniesterModel>(SINIESTER_DATA[0])
        , [edit_state, set_edit_state] = useState<boolean>(true)
        , classNameDetailText = "w600 p-right-1"
        , classNameDetailGrid = "p-top-1 p-bottom-1"

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
                <Grid className="background-color-white p-2" container style={{ borderRadius: "0px 0px 5px 5px" }}>
                    <Grid item xs={8} className='p-bottom-2 m-top-2'>
                        <h4>Descripcion del caso</h4>
                    </Grid>
                    {
                        edit_state && <Grid item xs={4} container justify="flex-end">
                            <IconButton onClick={() => set_edit_state(false)}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    }
                    <Input
                        xs={12}
                        label="Lugar"
                        color="light-gray"
                        name="location"
                        disabled={edit_state}
                        value={state.location}
                    />
                    <Input
                        xs={12}
                        label="Descripcion extra del lugar"
                        color="light-gray"
                        disabled={edit_state}
                        multiline
                        name="place_description"
                        rows={3}
                        maxlenght={250}
                        value={state.place_description}
                    />
                    <Input
                        xs={12}
                        label="Comentarios del caso"
                        color="light-gray"
                        disabled={edit_state}
                        name="comment"
                        multiline
                        rows={3}
                        maxlenght={250}
                        value={state.comment}
                    />
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2'>
                        <h4>Informacion de la victima</h4>
                    </Grid>
                    <Input
                        xs={12}
                        label="DNI"
                        color="light-gray"
                        disabled={edit_state}
                        name="dni"
                        value={state.dni}
                    />
                    <Input
                        xs={6}
                        label="Nombre"
                        color="light-gray"
                        disabled={edit_state}
                        name="fill_name"
                        value={state.full_name}
                    />
                    <Input
                        xs={6}
                        label="Edad"
                        color="light-gray"
                        disabled={edit_state}
                        name="age"
                        value={state.age}
                    />
                    <Input
                        xs={6}
                        label="Sexo"
                        color="light-gray"
                        disabled={edit_state}
                        name="sex"
                        value={state.sex}
                    />
                    <Input
                        xs={6}
                        label="Daño emocional"
                        color="light-gray"
                        type="number"
                        disabled={edit_state}
                        name="emotional_damage"
                        value={state.emotional_damage}
                    />
                    <Input
                        xs={6}
                        label="Daño fisico"
                        color="light-gray"
                        type="number"
                        disabled={edit_state}
                        name="physical_damage"
                        value={state.physical_damage}
                    />
                    <Input
                        xs={6}
                        label="Acompañado"
                        type="number"
                        color="light-gray"
                        disabled={edit_state}
                        name="victim_company"
                        value={state.victim_company}
                    />
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Objetos robados:</span>{state.stolenItems?.toString()}</p>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Otros objetos:</span>{state.other_items}</p>
                    </Grid>
                    <Grid item xs={12} className='p-top-3 p-bottom-2 m-top-2'>
                        <h4>Informacion del delincuente</h4>
                    </Grid>
                    <Select
                        xs={6}
                        label="Rango etario"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_age"
                        value={state.thief_age}
                    />
                    <Input
                        xs={6}
                        label="Nivel de agresividad"
                        type="number"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_agressiveness"
                        value={state.thief_agressiveness}
                    />
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Estaba armado? </span>{state.thief_armed ? "Si" : "No"}</p>
                    </Grid>
                    <Select
                        xs={6}
                        label="Sexo"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_sex"
                        value={state.thief_sex}
                    />
                    <Select
                        xs={6}
                        label="Color de piel"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_skin"
                        value={state.thief_skin}
                    />
                    <Select
                        xs={6}
                        label="Color de pelo"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_hair_color"
                        value={state.thief_hair_color}
                    />
                    <Input
                        xs={6}
                        label="Acompañado"
                        type="number"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_company"
                        value={state.thief_company}
                    />
                    <Select
                        xs={6}
                        label="Altura"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_height"
                        value={state.thief_height}
                    />
                    <Input
                        xs={12}
                        label="Descripcion extra"
                        color="light-gray"
                        disabled={edit_state}
                        name="thief_description"
                        multiline
                        rows={3}
                        maxlenght={250}
                        value={state.thief_description}
                    />
                    {
                        !edit_state && (
                            <>
                                <Button xs={6} className="p-1" onClick={() => set_edit_state(true)} color="red" label="Cancelar" />
                                <Button xs={6} className="p-1" label="Guardar" color="green" />
                            </>
                        )
                    }
                </Grid>
            </Tabs>
        </Grid>
        <Grid item xs={12} sm={6} className="m-top-1 p-1" container style={{ height: "80vh", overflowY: "scroll" }} alignContent="flex-start">
            <Grid item xs={12} container className="p-2" style={{ borderLeft: "10px solid transparent" }}>
                <Grid item xs={4} className="p-1" container justify="center"><p className="w700">Fecha</p></Grid>
                <Grid item xs={5} className="p-1" container justify="center"><p className="w700">Siniestro</p></Grid>
                <Grid item xs={3} className="p-1" container justify="center"><p className="w700">Severidad</p></Grid>
            </Grid>
            {
                siniesters.map((s, i) =>
                    <Grid key={i} item xs={12} className='p-bottom-1' container >
                        <Grid
                            container
                            className="p-2 background-color-white border-small map-hover-card shadow"
                            onClick={() => set_state(s)}
                            justify="space-between"
                            alignItems="center"
                            alignContent="center"
                            style={{
                                borderLeft: s.id === state.id
                                    ? "10px solid var(--violet)"
                                    : "10px solid transparent"
                            }}
                        >
                            <Grid item className="p-1" xs={4} container justify="center">
                                <p>{UnixToDate(s.time)}</p>
                            </Grid>
                            <Grid item className="p-1" xs={5} container justify="center">
                                <p>{s.attack_type}</p>
                            </Grid>
                            <Grid item className="p-1" xs={3} container justify="center">
                                <ChipSeverity severity={s.severity} />
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    </ScaffoldAdmin>
}

export default MapAdminPage;


const ChipSeverity = ({ text = "", severity }: { text?: string, severity: number }) => <Chip
    color={
        severity >= 0.6
            ? "secondary"
            : severity >= 0.4
                ? "primary"
                : "default"
    } className="w700" label={text + " " + Number(severity.toFixed(2)) * 100 + "%"} />
