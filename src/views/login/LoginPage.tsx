import { Grid, GridSize } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/Button";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import Input from "../../components/input/Input";
import Scaffold from "../../components/scaffold/scaffold";
import useHandlePage from "../../hooks/useHandlePage";
import { ColorCA } from "../../style/type-style";
import { HandleAPI } from "../../utils/handle-api";
import { cuitExp, passwordExp } from "../../utils/reg-exp";
import Validator from "../../utils/validator";
import yup from "../../utils/yup";
import traslate from "../../assets/traslate/index";
import { AdminContext } from "../../context/admin-context";

const schema = yup.object().shape({
    cuit: yup.string().required().matches(cuitExp),
    password: yup.string().required().matches(passwordExp)
})

const LoginPage = () => {

    const [errors, set_errors] = useState<any>()
        , [handle_page, set_handle_page] = useHandlePage({})
        , [form, set_form] = useState({
            cuit: "",
            password: ""
        })
        , TRANSLATE = traslate["ES"]
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , history = useHistory()
        , InputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            //@ts-ignore
            value: form[name],
            label: TRANSLATE.LABELS[name.toUpperCase()],
            color: "light-gray" as ColorCA,
            className: "m-top-1 p-1",
            onChange: (event: any) => set_form(prev => ({ ...prev, [name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.type === "matches" ?
                // @ts-ignore
                TRANSLATE.ERRORS[name] : errors?.[name]?.msg
        })
        , onSummit = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))
            set_errors({})

            const resp = await Validator(form, schema);

            if (resp.err) {
                set_handle_page({ ...handle_page, loading: false })
                return set_errors(resp.data)
            }

            const request = await HandleAPI({ method: "post", path: "/admin/login", data: resp.data })

            if (!request) return set_handle_page({
                ...handle_page,
                loading: false,
                color: "red",
                notification: true,
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR,
                severity: "error"
            })

            switch (request.status) {
                case 200:
                    admin_dispatch({
                        type: "LOGIN",
                        payload: {
                            token: request.data
                        }
                    })
                    return history.push(TRANSLATE.ROUTES.ADMIN.HOME)
                case 400:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: TRANSLATE.ERRORS.BAD_REQUEST
                    })
                case 404:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: TRANSLATE.ERRORS.USER_NOT_FOUND
                    })
                default:
                    return set_handle_page({
                        ...handle_page,
                        color: "red",
                        severity: "error",
                        notification: true,
                        loading: false,
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        };

    useEffect(() => admin_state.login ? history.push(TRANSLATE.ROUTES.ADMIN.HOME) : undefined, [])

    return <Scaffold>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item
            xs={12} md={5}
            className="p-3 border-small background-color-white"
            container justify="center">
            <Grid item xs={12}>
                <h3 style={{ textAlign: "center" }}>Ingresar</h3>
            </Grid>
            <Input
                {...InputConstructor("cuit")}
            />
            <Input
                {...InputConstructor("password")}
                type="password"
            />
            <Grid item xs={12}>
                <p className="p-1 w400 font-size-small hover" onClick={() => history.push(TRANSLATE.ROUTES.ADMIN.FORGET_PASSWORD)}>{TRANSLATE.COMMON.FORGET_PASSWORD}</p>
            </Grid>
            <Button
                xs={12}
                md={6}
                className="p-1 m-top-2"
                label={TRANSLATE.COMMON.GET_INTO}
                onClick={onSummit}
            />
            <Button
                xs={12}
                md={6}
                className="p-1 m-top-2"
                label={TRANSLATE.COMMON.BACK}
                color="white"
                colorFont="violet"
                onClick={() => history.push(TRANSLATE.ROUTES.PUBLIC.HOME)}
            />
        </Grid>
    </Scaffold>
}

export default LoginPage;