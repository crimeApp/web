import { Chip, Grid, Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React from "react";
import { SiniesterModel } from "../../../../models/siniester.models";
import { UnixToDate } from "../../../../utils/time";

const SiniesterList = ({ siniesters, state, set_state }: { siniesters?: SiniesterModel[], state: SiniesterModel, set_state: any }) => <Grid item xs={12} sm={6} className="m-top-1 p-1" container style={{ height: "80vh", overflowY: "scroll" }} alignContent="flex-start">
    <Grid item xs={12} container className="p-2" style={{ borderLeft: "10px solid transparent" }}>
        <Grid item xs={4} className="p-1" container justify="center"><p className="w700">Fecha</p></Grid>
        <Grid item xs={5} className="p-1" container justify="center"><p className="w700">Siniestro</p></Grid>
        <Grid item xs={3} className="p-1" container justify="center" alignItems="center">
            <p className="w700">Severidad </p>
            <Tooltip title="Es la importancia que se le atribuye a la naturaleza del caso">
                <Info />
            </Tooltip>
        </Grid>
    </Grid>
    {
        siniesters?.map((s, i) =>
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

export default SiniesterList;


const ChipSeverity = ({ text = "", severity }: { text?: string, severity: number }) => <Chip
    className={`w700 background-color-${severity >= 0.6
        ? "red"
        : severity >= 0.4
            ? "orange"
            : "green"}`} label={text + " " + Number(severity.toFixed(2)) * 100 + "%"} />