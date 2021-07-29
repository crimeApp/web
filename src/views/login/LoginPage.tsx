import { Grid, GridSize } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Scaffold from "../../components/scaffold/scaffold";
import { ColorCA } from "../../style/type-style";


const LoginPage = () => {

    const [errors, set_errors] = useState<any>()
        , [form, set_form] = useState({
            cuit: "",
            password: ""
        })
        , history = useHistory()
        , InputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            md: 10 as GridSize,
            //@ts-ignore
            value: form[name],
            color: "light-gray" as ColorCA,
            className: "m-top-1",
            onChange: (event: any) => set_form(prev => ({ ...prev, [name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , onSummit = () => {

        };

    return <Scaffold>
        <Grid item xs={12} md={5} className="m-top-3 p-2 border-small background-color-card-background" container justify="center">
            <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Ingresar</h3>
            </Grid>
            <Input
                {...InputConstructor("cuit")}
                label="Cuit"
            />
            <Input
                type="password"
                label="Contrasenia"
                {...InputConstructor("password")}
            />
            <Button xs={12} md={10} className="m-top-2" label="Ingresar" />
            <Button
                xs={12}
                md={10}
                className="m-top-2"
                label="Volver"
                color="white"
                colorFont="violet"
                border
                onClick={() => history.push("/")}
            />
        </Grid>
    </Scaffold>
}

export default LoginPage;