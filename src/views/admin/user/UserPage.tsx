import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Input from "../../../components/input/Input";
import { UserModel } from "../../../models/user.models";
import { UnixToDate } from "../../../utils/time";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import BackButton from "../component/BackButton";
import { HandleAPI } from "../../../utils/handle-api";
import { AdminContext } from "../../../context/admin-context";
import useHandlePage from "../../../hooks/useHandlePage";
import Translate from "../../../assets/traslate";
import ChipRoleAdmin from "../component/RoleChip";

const UserPage = () => {

    const location = useLocation()
        , history = useHistory()
        , [user, set_user] = useState<UserModel>()
        , { admin_state } = useContext(AdminContext)
        , TRANSLATE = Translate["ES"]
        , [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        const user_data = location.state as UserModel
        if (!!user_data) {
            set_handle_page(prev => ({ ...prev, loading: false }))
            return set_user(user_data)
        }
        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: "/admin/user/:id",
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
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        error: (request.data.length < 10)
                    }))
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
                    })
                case 404:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
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
        })();
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [location.pathname])

    return <ScaffoldAdmin>
        <Grid item xs={12} sm={7} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <BackButton />
                <Grid item xs>
                    <h4>Informacion del usuario</h4>
                </Grid>
                <ChipRoleAdmin value={user?.role} />
                <Input
                    xs={12}
                    label="Nombre"
                    disabled
                    value={user?.name}
                />
                <Input
                    xs={12}
                    label="Mail"
                    value={user?.mail}
                />
                <Input
                    xs={12}
                    label="CUIT"
                    value={user?.cuit}
                />
                <Input
                    xs={12}
                    label="Telefono"
                    value={user?.phone}
                />
                <Input
                    xs={12}
                    label="Lugar"
                    value={user?.place}
                />
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