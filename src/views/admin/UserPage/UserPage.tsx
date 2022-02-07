import { Grid, IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Input from "../../../components/input/Input";
import { UserModel } from "../../../models/user.models";
import { UnixToDate } from "../../../utils/time";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { BackButton, BackButtonString } from "../component/BackButton";
import { HandleAPI } from "../../../utils/handle-api";
import { AdminContext } from "../../../context/admin-context";
import useHandlePage from "../../../hooks/useHandlePage";
import Translate from "../../../assets/traslate";
import ChipRoleAdmin from "../component/RoleChip";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import { Edit } from "@material-ui/icons";
import Button from "../../../components/button/Button";
import yup from "../../../utils/yup";
import { phoneExp } from "../../../utils/reg-exp";
import Validator from "../../../utils/validator";

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    surname: yup.string().required().min(3).max(50),
    phone: yup.string().matches(phoneExp).required(),
    mail: yup.string().email().required(),
})

const UserPage = () => {

    const location = useLocation()
        , history = useHistory()
        , [user, set_user] = useState<UserModel>()
        , [errors, set_errors] = useState<any>({})
        , { admin_state } = useContext(AdminContext)
        , TRANSLATE = Translate["ES"]
        , [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [can_edit, set_can_edit] = useState(false)
        , [editing, set_editing] = useState(false)

    useEffect(() => {
        const user_data = location.state as UserModel

        if (admin_state.cuit === location.pathname.split("/")[3]) {
            set_can_edit(true)
        }

        if (!!user_data) {
            set_handle_page(prev => ({ ...prev, loading: false }))
            return set_user(user_data)
        }

        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: `/admin/user/${location.pathname.split("/")[3]}`,
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
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch (request.status) {
                case 200:
                    set_user(request.data)
                    set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        error: (request.data.length < 10)
                    }))
                    break;
                case 401:
                    set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                    break;
                case 404:
                    set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        msg: TRANSLATE.ERRORS.NOT_FOUND_USER,
                        callback: () => history.goBack()
                    })
                    break;
                default:
                    set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        color: "red",
                        severity: "error",
                        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                    })
                    break;
            }
        })();
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [location.pathname])

    const onSummit = async () => {

        set_handle_page( prev => ({ ...prev, loading: true }))
        set_errors({})
        const {data, err} = await Validator(user, schema)

        if(err) {
            set_errors(data)
            return set_handle_page( prev => ({ ...prev, loading: false }))
        }

        const request = await HandleAPI({
            method: "put",
            path: `/admin/user`,
            data: data,
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
                set_handle_page(prev => ({
                    ...prev,
                    msg: TRANSLATE.OK.SAVE,
                    color: "green",
                    notification: true,
                    severity: "success",
                    loading: false,
                }))
                break;
            case 400:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.BAD_REQUEST,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                })
                break;
            case 401:
                set_handle_page({
                    loading: false,
                    error: true,
                    severity: "error",
                    color: "red",
                    msg: TRANSLATE.ERRORS.UNAUTH,
                    callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                })
                break;
            default:
                set_handle_page({
                    loading: false,
                    error: true,
                    notification: true,
                    color: "red",
                    severity: "error",
                    msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
                })
                break;
        }
        return set_editing(false)
    }

    //@ts-ignore
    const handleChange = (e) => set_user(prev => ({ ...prev, [e.target.name]: e.target.value}))

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={7} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container alignItems="center">
                <BackButtonString className="p-left-2" />
                <Grid item xs className="p-left-2" >
                    <h4>{TRANSLATE.USERS.TITLE_USER}</h4>
                </Grid>
                <ChipRoleAdmin value={user?.role} />
                {
                can_edit && !editing &&
                        <IconButton className="m-left-2" size="small" onClick={() => set_editing(true)}>
                            <Edit />
                        </IconButton>
                }
                <Input
                    xs={12}
                    color={editing ? undefined : 'light-gray' }
                    label={TRANSLATE.LABELS.NAME}
                    disabled={!editing}
                    onChange={handleChange}
                    name='name'
                    error={errors?.name?.error}
                    error_msg={errors?.name?.msg}
                    value={user?.name}
                />
                <Input
                    xs={12}
                    color={editing ? undefined : 'light-gray' }
                    label={TRANSLATE.LABELS.SURNAME}
                    disabled={!editing}
                    onChange={handleChange}
                    name='surname'
                    error={errors?.surname?.error}
                    error_msg={errors?.surname?.msg}
                    value={user?.surname}
                />
                <Input
                    xs={12}
                    color={editing ? undefined : 'light-gray' }
                    label={TRANSLATE.LABELS.MAIL}
                    error={errors?.mail?.error}
                    error_msg={errors?.mail?.msg}
                    onChange={handleChange}
                    name='mail'
                    disabled={!editing}
                    value={user?.mail}
                />
                <Input
                    xs={12}
                    color='light-gray'
                    label={TRANSLATE.LABELS.CUIT}
                    disabled
                    value={user?.cuit}
                />
                <Input
                    xs={12}
                    color={editing ? undefined : 'light-gray' }
                    label={TRANSLATE.LABELS.PHONE}
                    error={errors?.phone?.error}
                    onChange={handleChange}
                    name='phone'
                    error_msg={errors?.phone?.msg}
                    disabled={!editing}
                    value={user?.phone}
                />
                <Input
                    xs={12}
                    color='light-gray'
                    label={TRANSLATE.LABELS.PLACE}
                    disabled
                    value={user?.place}
                />
                {
                    editing && (
                        <>
                            <Button color="red" xs={6} label={TRANSLATE.COMMON.CANCEL} className="p-2" onClick={() => set_editing(false)} />
                            <Button color="green" xs={6} label={TRANSLATE.COMMON.SAVE} className="p-2" onClick={onSummit} />
                        </>
                    )
                }
                
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <Grid item xs={12}>
                    <h4>Estado</h4>
                </Grid>
                <Grid item xs={12}>
                    {user?.createdAt && <p>• Usuario creado el <span className="w600">{UnixToDate(user.createdAt)}</span></p>}
                </Grid>
                <Grid item xs={12}>
                    {user?.createdByID && <p className="hover" onClick={() => history.push(`/admin/user/${user.createdByID}`)}>• Creado por <span className="w600">{user.createdBy}</span></p>}
                </Grid>
                <Grid item xs={12}>
                    {user?.updatedAt && <p>• Ultima vez modficiado <span className="w600">{UnixToDate(user.updatedAt)}</span></p>}
                </Grid>
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default UserPage;