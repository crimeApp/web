import { Grid, GridSize } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/Button";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import Input from "../../components/input/Input";
import Scaffold from "../../components/scaffold/scaffold";
import useHandlePage from "../../hooks/useHandlePage";
//import { HandlePageModel } from "../../models/HandlePageModel";
import { ColorCA } from "../../style/type-style";
import { HandleAPI } from "../../utils/handle-api";
import { cuitExp, passwordExp } from "../../utils/reg-exp";
import Validator from "../../utils/validator";
import yup from "../../utils/yup";
import traslate from "../../assets/traslate/es.json";

const schema = yup.object().shape({
    cuit: yup.string().required().matches(cuitExp),
    password: yup.string().required().matches(passwordExp)
})


const LoginPage = () => {

    const [errors, set_errors] = useState<any>()
        , [handle_page, set_handle_page] = useHandlePage()
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
            error_msg: errors?.[name]?.type === "matches" ?
                // @ts-ignore
                traslate.ERRORS[name] : errors?.[name]?.msg
        })
        , onSummit = async () => {
            set_handle_page({ ...handle_page, loading: true })
            set_errors({})

            const resp = await Validator(form, schema);

            if (resp.err) {
                set_handle_page({ ...handle_page, loading: false })
                return set_errors(resp.data)
            }

            const request = await HandleAPI("post", "/login", resp.data)

            if (!request) return set_handle_page({
                ...handle_page,
                loading: false,
                color: "red",
                notification: true,
                msg: traslate.ERRORS.INTERNAL_SERVER_ERROR,
                severity: "error"
            })

            switch (request.status) {
                case 200:
                    localStorage.setItem("token", request.data.token)
                    return history.push(traslate.ROUTES.ADMIN.HOME)
                case 400:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: traslate.ERRORS.BAD_REQUEST
                    })
                case 404:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: traslate.ERRORS.USER_NOT_FOUND
                    })
                default:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: traslate.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        };

    return <Scaffold>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
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
            <Button
                xs={12}
                md={10}
                className="m-top-2"
                label="Ingresar"
                onClick={onSummit}
            />
            <Button
                xs={12}
                md={10}
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

export default LoginPage;