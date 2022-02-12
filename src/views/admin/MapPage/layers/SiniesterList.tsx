import { Chip, Grid, IconButton, Tooltip } from "@material-ui/core";
import { Info, Search } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import Translate from "../../../../assets/traslate";
import Button from "../../../../components/button/Button";
import { SiniesterModel } from "../../../../models/siniester.models";
import { DateMoreTime, UnixToDateString } from "../../../../utils/time";
import StateSiniester from "../../component/StateSiniester";
import $ from 'jquery';

const SiniesterList = ({ siniesters = [], state, set_state, notMore, onMore }: { siniesters?: SiniesterModel[], state?: SiniesterModel, set_state: any, notMore?: boolean, onMore: () => void }) => {

    const TRANSLATE = Translate['ES']

    return <Grid item xs={12} sm={6} className="m-top-1 p-1" container style={{ height: "80vh", overflowY: "scroll" }} alignContent="flex-start">
        <Grid item xs={12} container alignItems="center" style={{
            borderRight: "10px solid transparent"
        }}>
            <Grid item xs={2} className="p-1" container justify="center"><p className="w700 font-size-small">{TRANSLATE.MAP.PLACE}</p></Grid>
            <Grid item xs={4} className="p-1" container justify="center" alignItems="center">
                <p className="w700 font-size-small">{TRANSLATE.MAP.SEVERITY}</p>
                <Tooltip className="w700 font-size-normal" title={TRANSLATE.MAP.SEVERITY_HINT}>
                    <Info />
                </Tooltip>
            </Grid>
            <Grid item xs={2} className="p-1" container justify="center"><p className="w700 font-size-small">{TRANSLATE.MAP.KIND_CASE}</p></Grid>
            <Grid item xs={4} className="p-1" container justify="center" alignItems="center">
                <p className="w700 font-size-small">{TRANSLATE.MAP.STATE}</p>
                <Tooltip className="w700 font-size-normal" title={TRANSLATE.MAP.STATE_HINT}>
                    <Info />
                </Tooltip>
            </Grid>
        </Grid>
        {
            siniesters.length > 1 ?
                siniesters.map((s, i) =>
                    <Grid key={i} item xs={12} className='p-bottom-1' container >
                        <Grid
                            container
                            className="p-2 background-color-white border-small map-hover-card shadow"
                            onClick={() => {
                                set_state(s)
                                $('html, body').animate({scrollTop: 0 }, 'slow');
                            }}
                            justify="flex-start"
                            alignItems="center"
                            alignContent="center"
                            style={{
                                borderLeft: s.id === state?.id
                                    ? "10px solid var(--violet)"
                                    : "10px solid transparent",
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
                            <Grid item className="p-1" xs={7} md={9}>
                                <p className="overflow-text-siniester">{s.location}</p>
                            </Grid>
                            <Grid item className="p-1" xs container justify="center">
                                <ChipSeverity severity={s.severity} />
                            </Grid>
                            <Grid item xs >
                                <AttackTypeIcons text={s.attack_type} />
                            </Grid>
                            <Grid item xs >
                                <StateSiniester state={s.state} size='20px' />
                            </Grid>
                        </Grid>
                    </Grid>
                ) :
                <Grid item xs={12} className='p-bottom-1' container >
                    {
                        Array.from({ length: 10 }).map(e =>
                            <Skeleton className='m-top-1 border-small' height='74px' width='100%' variant="rect" />)
                    }
                </Grid>
        }
        {
            !notMore && <Button xs={12} className="p-2" onClick={onMore} label='Cargar mas' />
        }
    </Grid>
}

export default SiniesterList;


export const ChipSeverity = ({ text = "", severity }: { text?: string, severity: number }) =>
    <Tooltip title={severity >= 0.6
        ? "Serevidad: Caso muy importante"
        : severity >= 0.4
            ? "Serevidad:Caso preocupante"
            : "Serevidad: Caso con daños menores"}>
        <Chip
            className={`font-size-little w700 background-color-${severity >= 0.6
                ? "red"
                : severity >= 0.4
                    ? "orange"
                    : "green"}`} label={text + " " + Number(severity.toFixed(2)) * 100 + "%"} />
    </Tooltip>

const AttackTypeMap = {
    "Robo con arma blanca": "knife.png",
    "Robo sin armas": "hands.png",
    "Robo con arma de fuego": "gun.png",
    "Daño a la propiedad privada": "hurt.png",
    "Hurto": "theft.png"
}

export const AttackTypeIcons = ({ text = "" }: { text?: string }) =>
    <Tooltip title={`Tipo de ataque: ${text}`}>
        <img style={{ width: '30px', height: '30px' }} src={`${process.env.PUBLIC_URL}/assets/attack_type/${AttackTypeMap[text]}`} />
    </Tooltip>