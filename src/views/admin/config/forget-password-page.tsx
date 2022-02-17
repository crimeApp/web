import { Grid, GridSize } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Scaffold from "../../../components/scaffold/scaffold";
import { ColorCA } from "../../../style/type-style";
import traslate from "../../../assets/traslate/es.json";
import useHandlePage from "../../../hooks/useHandlePage";
import Translate from "../../../assets/traslate";
import Validator from "../../../utils/validator";
import yup from "../../../utils/yup";
import { cuitExp } from "../../../utils/reg-exp";
import { HandleAPI } from "../../../utils/handle-api";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";

const ForgetPasswordPage = () => {

    const [form, set_form] = useState({ cuit: "" })
        , [handle_page, set_handle_page] = useHandlePage({ loading: false })
        , [state, set_state] = useState(0)
        , TRANSLATE = Translate['ES']
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
            set_handle_page(prev => ({ ...prev, loading: true }))

            const val = await Validator(form.cuit, yup.string().matches(cuitExp))

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: false }))
                return set_errors(val.data)
            }

            const request = await HandleAPI({
                method: "post",
                path: `/admin/forget-password`,
                data: {
                    cuit: form.cuit
                },
            })

            if (!request) return set_handle_page({
                loading: false,
                error: true,
                notification: true,
                severity: "error",
                color: "red",
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    return set_handle_page(prev => ({
                        ...prev,
                        msg: TRANSLATE.OK.PASS_CHANGE,
                        color: "green",
                        notification: true,
                        severity: "success",
                        loading: false,
                        callback: () => history.goBack()
                    }))
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                        callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                    })
                case 404:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.NOT_FOUND_USER,
                        callback: () => history.goBack()
                    })
                case 535:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.NOT_FOUND_USER,
                        callback: () => history.goBack()
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        }

    return <Scaffold>
        <HandlePetitions handlePage={handle_page} setHandlePage={set_handle_page} />
        <Grid item
            xs={12} md={5}
            className="p-2 border-small background-color-white"
            container justify="center">
            <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Recuperar Contraseña</h3>
            </Grid>
            <Input
                label="Cuit"
                {...InputConstructor("cuit")}
            />
            <Button
                xs={12}
                md={6}
                className="p-1 m-top-2"
                label="Enviar"
                onClick={onSummitCuit}
            />
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