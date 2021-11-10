import { Grid, GridSize } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import translate from "../../../assets/traslate";
import { AdminContext } from "../../../context/admin-context";
import { useHistory } from "react-router";
import { HandleAPI } from "../../../utils/handle-api";
import Input from "../../../components/input/Input";
import { ColorCA } from "../../../style/type-style";
import { UserModel } from "../../../models/user.models";
import Button from "../../../components/button/Button";
import { BackButtonString } from "../component/BackButton";
import Validator from "../../../utils/validator";
import yup from "../../../utils/yup";
import { passwordExp } from "../../../utils/reg-exp";

const schema = yup.object().shape({
    old_password: yup.string().matches(passwordExp).required(),
    new_password: yup.string().matches(passwordExp).required(),
})

const EditPasswordAdmin = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: false }),
        { admin_state } = useContext(AdminContext),
        history = useHistory(),
        [state, set_state] = useState({
            old_password: "",
            new_password: ""
        }),
        TRANSLATE = translate["ES"],
        [errors, set_errors] = useState<any>(),
        inputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            value: state?.[name],
            color: "light-gray" as ColorCA,
            label: TRANSLATE.LABELS[name.toUpperCase()],
            // @ts-ignore
            onChange: (event: any) => set_state(prev => ({ ...prev, [event.target.name]: event.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        }),
        handleSummit = async () => {
            set_handle_page(prev => ({ ...prev, loading: true }))
            const val = await Validator(state, schema)

            if (val.err) {
                set_handle_page(prev => ({ ...prev, loading: true }))
                set_errors(val.data)
            }
            const request = await HandleAPI({
                method: "post",
                path: "/admin/user/password",
                data: val.data,
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
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
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

    return <ScaffoldAdmin className="p-bottom-4 m-bottom-4">
        <HandlePetitions handlePage={handle_page} setHandlePage={set_handle_page} />
        <Grid item xs={12} md={6} className="p-2 border-small background-color-white shadow" container justify="center">
            <BackButtonString className="p-left-2" />
            <Grid item xs={12} className="p-left-2">
                <h3>Editar Contraseña</h3>
            </Grid>
            <Input {...inputConstructor("old_password")} type="password" />
            <Input {...inputConstructor("new_password")} type="password" />
            <Button className="p-top-3" xs={8} label={TRANSLATE.COMMON.SAVE} color="green" onClick={handleSummit} />
        </Grid>
    </ScaffoldAdmin>
}

export default EditPasswordAdmin;