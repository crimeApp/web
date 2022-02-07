import { Drawer, Grid, GridSize, IconButton } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import React, { useState } from "react";
import Translate from "../../../../assets/traslate";
import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import Map from "../../../../components/map/Map";
import Select from "../../../../components/select/Select";
import Switches from "../../../../components/switch/Switch";
import useWindowSize from "../../../../hooks/useWindows";
import GeoHash from "../../../../utils/hashing";
import Validator from "../../../../utils/validator";
import yup from "../../../../utils/yup";

const schema = yup.object().shape({
    dni: yup.string(),
    start: yup.date(),
    end: yup.date()
})

const DrawerFilterLayer = ({ onSummit } : { onSummit: ({ dni, start, end, hash } : { dni?: string , start?: string, end?: string, hash?: string}) => void }) => {
    const TRANSLATE = Translate['ES']
        , [open, set_open] = useState(false)
        , { xs } = useWindowSize()
        , [state, set_state] = React.useState<{ dni?: string , start?: string, end?: string, hash?: string}>()
        , [map, set_map] = React.useState(false)
        , [map_value, set_map_value] = React.useState<any>()
        , [loading, set_loading] = React.useState(false)
        , [errors, set_errors] = React.useState<any>({})
        , inputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            value: state?.[name],
            label: TRANSLATE.LABELS[name.toUpperCase()],
            // @ts-ignore
            onChange: (event: any) => set_state(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , handleSummit = async () => {
            set_loading(true)
            set_errors({})
            const { data, err } = await Validator(state, schema)
            if(err) {
                set_errors(data)
                set_loading(false)
                return
            }

            let hash;

            if (map && map_value) {
                hash = GeoHash(map_value.lat, map_value.lng)
            }

            if ((state?.dni?.trim().length === 0 && state?.start?.trim().length === 0 && state?.end?.trim().length === 0 && hash?.trim().length === 0) || (!state && hash?.trim().length === 0)) {
                set_errors({ button: { msg: TRANSLATE.ERRORS.NOT_DATA, err: true } })
                set_loading(false)
                return
            }

            if(state && state.start && state.end && state.start > state.end) {
                set_loading(false)
                return set_errors({
                    to: {
                        error: true,
                        msg: TRANSLATE.ERRORS.TO_DATE_ERROR
                    }
                });
            }

            set_open(false)
            set_loading(false)
            //@ts-ignore
            onSummit({
                ...state,
                hash
            })
        }

    return <>
        <div className="button-hover-expand" onClick={() => set_open(true)}>
            <Search className="icon" />
            <span className="text">{TRANSLATE.COMMON.FILTER_ADVANCE}</span>
        </div>
        <Drawer className="drawer" open={open} anchor="right">
            <Grid container className="drawer-header p-2" style={{ width: xs ? '90vw' : '50vw' }} alignItems="center">
                <Grid item xs={2}>
                    <IconButton onClick={() => set_open(false)}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid item xs> 
                    <h4>{TRANSLATE.COMMON.FILTER_ADVANCE}</h4> 
                </Grid>
                <Grid item xs container justify="flex-end"> 
                    <Button label={TRANSLATE.COMMON.CLEAR_FILTER} onClick={() => {
                        set_map_value(undefined)
                        set_state({})
                    }} /> 
                </Grid>
                <Input {...inputConstructor('dni')} />
                <Input {...inputConstructor('start')} label={TRANSLATE.LABELS.START_DATE} type="date" />
                <Input {...inputConstructor('end')} label={TRANSLATE.LABELS.END_DATE} type="date" />
                <Switches label={TRANSLATE.LABELS.FIND_BY_AREA} value={map} onChange={() => set_map(!map)} />
            {
                map && <Map position={map_value} onChange={(nv, _) => set_map_value(nv)} />
            }
                <Button 
                    error={errors?.button?.error} 
                    error_msg={errors?.button?.msg} 
                    disabled={loading} 
                    className='p-1 m-top-3' 
                    xs={12} 
                    label={TRANSLATE.COMMON.APPLY_FILTER}
                    onClick={handleSummit} 
                    />
            </Grid>
        </Drawer>
    </>
}

export default DrawerFilterLayer;