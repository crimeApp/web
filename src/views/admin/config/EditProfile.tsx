import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import translate from "../../../assets/traslate";

const EditProfileAdmin = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: false }),
        [state, set_state] = useState(),
        TRANSLATE = translate["ES"]

    return <ScaffoldAdmin>
        <HandlePetitions handlePage={handle_page} setHandlePage={set_handle_page} />
        <Grid item xs={12} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
        </Grid>
    </ScaffoldAdmin>
}

export default EditProfileAdmin;