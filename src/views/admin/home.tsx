import { Grid } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import { AdminContext } from "../../context/admin-context";
import useHandlePage from "../../hooks/useHandlePage";
import { UserModel } from "../../models/user.models";
import ScaffoldAdmin from "./component/ScaffoldAdmin";
import Button from "../../components/button/Button";
import { useHistory } from "react-router";

const HomeAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin className="p-left-2 p-right-2">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <h4>Informacion del usuario</h4>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={4} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <Grid item xs={12}>
                    <h4>Metadata</h4>
                </Grid>
                {
                    admin_state.database ? <Grid item xs={12} className="p-2" container>
                        <Grid item xs={12} className="bakground-color-white border-small shadow p-2 hover" container justify="center" style={{
                            borderLeft: "10px solid var(--violet)"
                        }}>
                            <Grid item xs={12} className="p-left-2 p-right-2">
                                <h5>{admin_state.database.name}</h5>
                                <p>{admin_state.database.description}</p>
                                <p className="font-size-little color-gray" onClick={
                                    //@ts-ignore
                                    () => history.push(`/admin/users/${admin_state.database.createdByID}`)
                                }>Creado por {admin_state.database.createdByID}</p>
                            </Grid>
                        </Grid>
                    </Grid> : <Grid item xs={12}>
                        <p>Sin Dataset elegigo</p>
                        <Button label="Seleccionar dataset" onClick={() => history.push("/admin/statistics/config")} />
                    </Grid>
                }
            </Grid>

        </Grid>
        <Grid item xs={12} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2 shadow" container>
                <h4>Informacion del usuario</h4>
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default HomeAdminPage;