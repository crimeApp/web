import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import Map from "../../components/map/Map";
import Tabs from "../../components/tab/Tab";
import useHandlePage from "../../hooks/useHandlePage";
import { SiniesterModel } from "../../models/siniester.models";
import { UnixToDate, UnixToDay, UnixToTime } from "../../utils/time";
import ScaffoldAdmin from "./component/ScaffoldAdmin";
import SINIESTER_DATA from "./__data__/siniester.json";
import "./admin.css"

const MapAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        // @ts-ignore
        , [siniesters, set_siniesters] = useState<SiniesterModel[]>(SINIESTER_DATA as SiniesterModel[])
        , [state, set_state] = useState<SiniesterModel>(siniesters[0])
        , [tab, set_tab] = useState(0)

    console.log(siniesters)

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
                        <h4>Informacion de la victima</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <p><span className="w700 p-right-1">DNI:</span>{state.dni}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p><span className="w700 p-right-1">Nombre:</span>{state.full_name}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p><span className="w700 p-right-1">Edad:</span>{state.age}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p><span className="w700 p-right-1">Sexo:</span>{state.sex}</p>
                    </Grid>
                </Grid>
            </Tabs>
        </Grid>
        <Grid item xs={12} sm={6} className="p-1" container style={{ height: "60vh", overflowY: "scroll" }} alignContent="flex-start">
            {
                siniesters.map((s, i) =>
                    <Grid key={i} item xs={12} className='p-bottom-1' container >
                        <Grid
                            container
                            className="p-2 background-color-white border-small hover-card"
                            onClick={() => set_state(s)}
                            justify="space-between"
                            alignItems="center"
                            style={{
                                borderLeft: s.id === state.id
                                    ? "10px solid var(--violet)"
                                    : undefined
                            }}
                        >
                            <Grid item>
                                <p>{UnixToDay(s.time)}</p>
                            </Grid>
                            <Grid item>
                                <p>{UnixToTime(s.time)}</p>
                            </Grid>
                            <Grid item>
                                <p>{s.attack_type}</p>
                            </Grid>
                            <Grid item>
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


const ChipSeverity = ({ severity }: { severity: number }) => <Chip
    color={
        severity >= 0.6
            ? "secondary"
            : severity >= 0.4
                ? "primary"
                : "default"
    } className="w700" label={severity * 100 + "%"} />
