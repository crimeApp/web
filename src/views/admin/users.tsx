import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import Button from "../../components/button/Button";
import useHandlePage from "../../hooks/useHandlePage";
import useWindowSize from "../../hooks/useWindows";
import { UserModel } from "../../models/user.models";
import { UnixToDay } from "../../utils/time";
import ChipRoleAdmin from "./component/RoleChip";
import ScaffoldAdmin from "./component/ScaffoldAdmin";
import users_data from "./__data__/users.json"

const UsersAdminPage = () => {

    const users: UserModel[] = users_data as UserModel[]
        , [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { xs } = useWindowSize()

    useEffect(() => {
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
        <Grid item xs={12} container justify="center" className="m-top-1 p-1 background-color-white border-small">
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
                    users.map((user, index) =>
                        <Grid item xs={12} className={`p-1 hover background-color-${index % 2 ? "white" : "light-gray"} border-small`} container alignItems="center">
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
        <Button className="m-top-3" xs={12} sm={6} label="Cargar Mas" />
    </ScaffoldAdmin>
}

export default UsersAdminPage;