import { Drawer, Grid, GridSize, IconButton } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import React, { useState } from "react";
import Translate from "../../../assets/traslate";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import Tags from "../../../components/tags/Tags";
import useWindowSize from "../../../hooks/useWindows";
import { cuitExp } from "../../../utils/reg-exp";
import Validator from "../../../utils/validator";
import yup from "../../../utils/yup";

const schema = yup.object().shape({
    tags: yup.array().of(yup.string()).required(),
})

const FilterDatabaseLayer = ({ onSummit } : { onSummit: (tags: string[]) => void }) => {
    const TRANSLATE = Translate['ES']
        , [open, set_open] = useState(false)
        , { xs } = useWindowSize()
        , [state, set_state] = React.useState<{ tags?: string[] }>({})
        , [loading, set_loading] = React.useState(false)
        , [errors, set_errors] = React.useState<any>({})
        , handleSummit = async () => {
            set_loading(true)
            set_errors({})
            const { data, err } = await Validator(state, schema)

            if (err) {
                set_errors(data)
                set_loading(false)
                return
            }

            set_loading(false)
            set_open(false)
            
            if(state.tags)
                onSummit(state.tags)
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
                    <Button label={TRANSLATE.COMMON.CLEAR_FILTER} onClick={() => set_state({})} />
                </Grid>
                <Tags
                    tags={state.tags}
                    label="Etiquetas para el informe"
                    color='white'
                    onChange={(_, tags) => set_state(prev => ({ ...prev, tags }))}
                    maxTags={10}
                    maxLenght={40}
                    error={errors?.tags?.error}
                    error_msg={errors?.tags?.msg}
                    msg="Precione Enter para guardar la etiqueta"
                    buttonLabel={TRANSLATE.COMMON.SELECT} />
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

export default FilterDatabaseLayer;