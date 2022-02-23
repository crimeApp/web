import { Drawer, Grid, GridSize, IconButton } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import React, { useState } from "react";
import Translate from "../../../assets/traslate";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import useWindowSize from "../../../hooks/useWindows";
import { cuitExp } from "../../../utils/reg-exp";
import Validator from "../../../utils/validator";
import yup from "../../../utils/yup";

const schema = yup.object().shape({
    cuit: yup.string().matches(cuitExp).notRequired(),
    role: yup.string(),
    place: yup.string().max(50)
})

const FilterLayer = ({ onSummit } : { onSummit: ({ cuit, role, place } : { cuit?: string, role?: string, place?: string}) => void }) => {
    const TRANSLATE = Translate['ES']
        , [open, set_open] = useState(false)
        , { xs } = useWindowSize()
        , [state, set_state] = React.useState<{ cuit?: string, role?: string, place?: string}>({})
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
            const { data, err } = await Validator({
                ...state,
                cuit: state.cuit?.trim().length === 0 ? undefined : state.cuit
            }, schema)

            if(err) {
                set_errors(data)
                set_loading(false)
                return
            }

            if ((state?.cuit?.trim().length === 0 && state?.role?.trim().length === 0 && state?.place?.trim().length === 0) || !state) {
                set_errors({ button: { msg: TRANSLATE.ERRORS.NOT_DATA, err: true } })
                set_loading(false)
                return
            }

            set_loading(false)
            set_open(false)
            //@ts-ignore
            onSummit(state)
        }

    return <>
        <div className="button-hover-expand" onClick={() => {
            set_state({})
            set_open(true)
        }}>
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
                    <Button label={TRANSLATE.COMMON.CLEAR_FILTER} onClick={() => set_state({})} /> 
                </Grid>
                <Input {...inputConstructor('cuit')} />
                <Select {...inputConstructor('role')} options={["policia", "admin", "funcionario"]} />
                <Input {...inputConstructor('place')} />
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

export default FilterLayer;