import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Input from "../../../components/input/Input";
import { UserModel } from "../../../models/user.models";
import { UnixToDate } from "../../../utils/time";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import BackButton from "../component/BackButton";

const UserPage = () => {

    const location = useLocation()
        , history = useHistory()
        , [user, set_user] = useState<UserModel>()

    useEffect(() => {
        const user_data = location.state as UserModel
        if (!user_data) {
            //FIND DATA IN BACKEND
        }
        set_user(user_data)
    }, [location.pathname])
    return <ScaffoldAdmin>
        <Grid item xs={12} sm={7} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <BackButton />
                <Grid item xs>
                    <h4>Informacion del usuario</h4>
                </Grid>
                <Input
                    xs={12}
                    label="Nombre"
                    color="light-gray"
                    disabled
                    value={user?.name}
                />
                <Input
                    xs={12}
                    label="Mail"
                    color="light-gray"
                    value={user?.mail}
                />
                <Input
                    xs={12}
                    label="CUIT"
                    color="light-gray"
                    value={user?.cuit}
                />
                <Input
                    xs={12}
                    label="Telefono"
                    color="light-gray"
                    value={user?.phone}
                />
                <Input
                    xs={12}
                    label="Lugar"
                    color="light-gray"
                    value={user?.place}
                />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
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