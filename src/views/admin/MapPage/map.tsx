import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import Map from "../../../components/map/Map";
import Tabs from "../../../components/tab/Tab";
import useHandlePage from "../../../hooks/useHandlePage";
import { SiniesterModel } from "../../../models/siniester.models";
import { UnixToDate, UnixToDay, UnixToTime } from "../../../utils/time";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import SINIESTER_DATA from "../__data__/siniester.json";
import "./map.css"
import useWindowSize from "../../../hooks/useWindows";

const MapAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        // @ts-ignore
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>(SINIESTER_DATA as SiniesterModel[])
        , [state, set_state] = useState<SiniesterModel>(siniesters[0])
        , classNameDetailText = "w600 p-right-1"
        , classNameDetailGrid = "p-top-1 p-bottom-1"
        , { xs } = useWindowSize()

    useEffect(() => set_handle_page(prev => ({ ...prev, loading: false })), [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={6} className='p-1' container alignContent="flex-start">
            <Tabs xs={12} labels={["Ubicacion", "Detalle"]} >
                <Map xs={12} position={state.geopoint} />
                <Grid className="background-color-white p-2" container>
                    <Grid item xs={12} className='p-bottom-2'>
                        <h4>Descripcion del caso</h4>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Lugar:</span>{state.location}</p>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Descripcion extra del lugar:</span>{state.place_description}</p>
                    </Grid>
                    <Grid item xs={12} className='p-bottom-2'>
                        <h4>Informacion de la victima</h4>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>DNI:</span>{state.dni}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Nombre:</span>{state.full_name}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Edad:</span>{state.age}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Sexo:</span>{state.sex}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Danio emocional:</span>{state.emotional_damage}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Danio fisico:</span>{state.physical_damage}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Acompaniado </span>{state.victim_company}</p>
                    </Grid>
                    <Grid item xs={12} className='p-top-3 p-bottom-2'>
                        <h4>Informacion del delincuente</h4>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Rango etario:</span>{state.thief_age}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Nivel de agresividad:</span>{state.thief_agressiveness}/5</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Estaba armado? </span>{state.thief_armed ? "Si" : "No"}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Sexo:</span>{state.thief_sex}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Color de piel:</span>{state.thief_skin}</p>
                    </Grid>
                    <Grid item xs={6} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Color de pelo:</span>{state.thief_hair_color}</p>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Altura con respecto de la victima:</span>{state.thief_height}</p>
                    </Grid>
                    <Grid item xs={12} className={classNameDetailGrid}>
                        <p><span className={classNameDetailText}>Descripcion extra:</span>{state.thief_description}</p>
                    </Grid>
                </Grid>
            </Tabs>
        </Grid>
        <Grid item xs={12} sm={6} className="p-1" container style={{ height: "60vh", overflowY: "scroll" }} alignContent="flex-start">
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
                            className="p-2 background-color-white border-small map-hover-card"
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
    } className="w700" label={text + " " + severity * 100 + "%"} />
