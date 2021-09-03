import { Grid, GridSize } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Scaffold from "../../components/scaffold/scaffold";
import { ColorCA } from "../../style/type-style";
import traslate from "../../assets/traslate/es.json";

const ForgetPasswordPage = () => {

    const [form, set_form] = useState({ code: "", cuit: "" })
        , [state, set_state] = useState(0)
        , history = useHistory()
        , [errors, set_errors] = useState<any>()
        , InputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            //@ts-ignore
            value: form[name],
            color: "light-gray" as ColorCA,
            className: "m-top-1 p-1",
            onChange: (event: any) => set_form(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , onSummitCuit = async () => {

            return set_state(1)
        }
        , onSummitCode = async () => {

            return
        }

    const SendCuit = () => <>
        <Input
            label="Cuit"
            {...InputConstructor("cuit")}
        />
        <Button
            xs={12}
            md={6}
            className="p-1 m-top-2"
            label="Siguiente"
            onClick={onSummitCuit}
        />
    </>

    const SendCode = () => <>
        <Input
            label="Codigo"
            {...InputConstructor("code")}
            styleHelperText={{
                textAlign: "right",
                paddingRight: "1rem",
                color: form.code.length > 6 ? `var(--red)` : `var(--dark)`,
            }}
        />
        <Button
            xs={12}
            md={6}
            className="p-1 m-top-2"
            label="Validar"
            onClick={onSummitCode}
        />
    </>

    return <Scaffold>
        <Grid item
            xs={12} md={5}
            className="p-2 border-small background-color-white"
            container justify="center">
            <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Recuperar contrasenia</h3>
            </Grid>
            <h3 className="color-red">20% A TERMINAR POR LA TESIS</h3>
            {
                state === 0 ? <SendCuit /> : <SendCode />
            }
            <Button
                xs={12}
                md={6}
                className="p-1 m-top-2"
                label="Volver"
                color="white"
                colorFont="violet"
                onClick={() => history.goBack()}
            />
        </Grid>
    </Scaffold>
}

export default ForgetPasswordPage;