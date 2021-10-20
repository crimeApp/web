import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import Button from "../../../components/button/Button";
import useHandlePage from "../../../hooks/useHandlePage";
import useWindowSize from "../../../hooks/useWindows";
import { UserModel } from "../../../models/user.models";
import { UnixToDay } from "../../../utils/time";
import { AdminContext } from "../../../context/admin-context";
import ChipRoleAdmin from "../component/RoleChip";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import users_data from "../__data__/users.json"
import { useHistory } from "react-router";
import { HandleAPI } from "../../../utils/handle-api";
import Translate from "../../../assets/traslate";

const UsersAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , TRANSLATE = Translate["ES"]
        , history = useHistory()
        , [users, set_users] = useState<UserModel[]>()
        , { xs } = useWindowSize()
        , loadMoreUsers = async () => {
            if (!users || users?.length < 1) return
            const request = await HandleAPI({
                method: "get",
                path: `/admin/users?timestamp=${users[users.length - 1].createdAt}`,
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
                    //@ts-ignore
                    set_users(prev => [...prev, request.data])
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
                        color: "red",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
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

    useEffect(() => {
        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: "/admin/users",
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
                    set_users(request.data)
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
                        color: "red",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push("/admin/login")
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
    }, [])

    return <ScaffoldAdmin className="p-left-2 p-right-2">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12}>
            <h3 className="p-left-1">Usuarios</h3>
        </Grid>
        <Grid item xs={12} container justify="center" className="m-top-1 p-1 background-color-white border-small shadow">
            <Grid item xs={12} className="p-1" container>
                {
                    !xs && <Grid item xs={3} className="m-top-2" container justify="center">
                        <h5>
                            Nombre completo
                        </h5>
                    </Grid>
                }
                <Grid item xs={4} sm={3} className="m-top-2" container justify="center">
                    <h5>
                        CUIT
                    </h5>
                </Grid>
                <Grid item xs={4} sm={2} className="m-top-2" container justify="center">
                    <h5>
                        Lugar
                    </h5>
                </Grid>
                <Grid item xs={4} sm={2} className="m-top-2" container justify="center">
                    <h5>
                        Role
                    </h5>
                </Grid>
                {
                    !xs && <Grid item xs={2} className="m-top-2" container justify="center">
                        <h5>
                            Fecha de creacion
                        </h5>
                    </Grid>
                }
            </Grid>
            <Grid item xs={12} container alignContent="center" alignItems="center" justify="center" className="m-top-2">
                {
                    users?.map((user, index) =>
                        <Grid key={user.cuit} item xs={12} className={`p-1 hover background-color-${index % 2 ? "white" : "light-gray"} border-small`} container alignItems="center"
                            onClick={() => history.push(`/admin/users/${user.cuit}`, user)}
                        >
                            {
                                !xs &&
                                <Grid item xs={3} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                    <p>
                                        {user.name + " " + user.surname}
                                    </p>
                                </Grid>
                            }
                            <Grid item xs={4} sm={3} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                <p>
                                    {user.cuit}
                                </p>
                            </Grid>
                            <Grid item xs={4} sm={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                <p>
                                    {user.place}
                                </p>
                            </Grid>
                            <Grid item xs={4} sm={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                <ChipRoleAdmin value={user.role} />
                            </Grid>
                            {!xs && <Grid item xs={3} sm={2} className="m-top-1 m-bottom-1" container justify="center" alignItems="center">
                                <p>
                                    {UnixToDay(user.createdAt)}
                                </p>
                            </Grid>
                            }
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
        {
            !handle_page.error && <Button className="m-top-3" xs={12} sm={6} label="Cargar Mas" onClick={loadMoreUsers} />
        }
    </ScaffoldAdmin>
}

export default UsersAdminPage;