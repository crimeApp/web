import { Grid, GridSize } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Scaffold from "../../components/scaffold/scaffold";
import { ColorCA } from "../../style/type-style";
import traslate from "../../assets/traslate/es.json";

const ForgetPasswordPage = () => {

    const [form, set_form] = useState({ code: "", mail: "" })
        , history = useHistory()
        , [errors, set_errors] = useState<any>()
        , InputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            md: 10 as GridSize,
            //@ts-ignore
            value: form[name],
            color: "light-gray" as ColorCA,
            className: "m-top-1",
            onChange: (event: any) => set_form(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , onSummit = async () => {

            return
        }

    return <Scaffold>
        <Grid item
            xs={12} md={5}
            className="m-top-3 p-2 border-small background-color-light-gray"
            container justify="center">
            <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Recuperar contrasenia</h3>
            </Grid>
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
                xs={8}
                md={10}
                className="m-top-2"
                label="Ingresar"
                onClick={onSummit}
            />
            <Button
                xs={8}
                md={3}
                className="m-top-2"
                label="Volver"
                color="white"
                colorFont="violet"
                border
                onClick={() => history.push(traslate.ROUTES.PUBLIC.HOME)}
            />
        </Grid>
    </Scaffold>
}

export default ForgetPasswordPage;