import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../hooks/useHandlePage";
import { UserModel } from "../../models/user.models";
import ScaffoldAdmin from "./component/ScaffoldAdmin";

const HomeAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin className="p-left-2 p-right-2">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <h4>Informacion del usuario</h4>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={4} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <h4>Informacion del usuario</h4>
            </Grid>
        </Grid>
        <Grid item xs={12} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <h4>Informacion del usuario</h4>
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default HomeAdminPage;