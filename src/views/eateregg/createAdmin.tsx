import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../hooks/useHandlePage";
import { Grid, GridSize } from "@material-ui/core";
import Input from "../../components/input/Input";
import Switches from "../../components/switch/Switch";
import Map from "../../components/map/Map";
import Button from "../../components/button/Button";
import Translate from "../../assets/traslate";
import GeoHash from "../../utils/hashing";
import { HandleAPI } from "../../utils/handle-api";
import { AdminContext } from "../../context/admin-context";
import { useHistory } from "react-router-dom";
import { cuitExp, passwordExp, phoneExp } from "../../utils/reg-exp";
import Select from "../../components/select/Select";
import Scaffold from "../../components/scaffold/scaffold";
import { BackButtonString } from "../admin/component/BackButton";
import { ColorCA } from "../../style/type-style";
import Validator from "../../utils/validator";
import yup from "../../utils/yup";

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    surname: yup.string().required().min(3).max(50),
    cuit: yup.string().matches(cuitExp).required(),
    mail: yup.string().email().required(),
    phone: yup.string().matches(phoneExp).required(),
    password: yup.string().matches(passwordExp).required(),
    place: yup.string().min(3).max(30).required()
})

const CreateAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({})
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , TRANSLATE = Translate['ES']
        , history = useHistory()
        , [form, set_form] = useState({
            name: "",
            surname: "",
            cuit: "",
            phone: "",
            mail: "",
            role: "",
            password: ""
        })
        , [errors, set_errors] = useState<any>()
        , inputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            value: form[name],
            color: "light-gray" as ColorCA,
            label: TRANSLATE.LABELS[name.toUpperCase()],
            // @ts-ignore
            onChange: (e) => set_form(prev => ({ ...prev, [e.target.name]: e.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , handleSummit = async () => {
            set_handle_page(prev => ({
                ...prev,
                loading: true,
            }))
            set_errors({})

            const { data, err } = await Validator(form, schema)
            if (err) {
                set_errors(data)
                return set_handle_page(prev => ({ ...prev, loading: false }))
            }

            const request = await HandleAPI({
                method: "post",
                path: '/admin/create-admin',
                data: form,
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
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
                        loading: false,
                        notification: true,
                        msg: TRANSLATE.OK.SAVE,
                        severity: "success",
                        color: "green",
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
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.NOT_ADMIN,
                        callback: () => history.goBack()
                    })
                case 404:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                        callback: () => history.goBack()
                    })
                case 406:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.USER_ALREADY_EXIST,
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

    useEffect(() => admin_state.admin ? undefined : history.goBack(), []);

    return <Scaffold className="m-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container alignContent="flex-start" justify="center">
            <BackButtonString className="p-left-2" />
            <Grid item xs className="p-left-2">
                <h3>{TRANSLATE.USERS.TITLE_CREATE_NEW_ADMIN}</h3>
            </Grid>
            <Input {...inputConstructor('pass')} label={"Contraseña de Administrador"} type="password" />
            <Grid item xs className="p-left-2">
                <h6>{TRANSLATE.USERS.SUBTITLE_CREATE_NEW_ADMIN}</h6>
            </Grid>
            <Input {...inputConstructor('name')} />
            <Input {...inputConstructor('surname')} />
            <Input {...inputConstructor('cuit')} />
            <Input {...inputConstructor('phone')} msg={TRANSLATE.LABELS.PHONE_HINT} type="number" />
            <Input {...inputConstructor('mail')} />
            <Select {...inputConstructor('role')} options={["policia", "admin", "funcionario"]} />
            <Input {...inputConstructor('password')} type="password" />
            <Button className="m-top-3" xs={12} sm={6} label={TRANSLATE.COMMON.SAVE} onClick={handleSummit} />
        </Grid>
    </Scaffold>
}

export default CreateAdminPage;