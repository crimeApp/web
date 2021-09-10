import React from "react"
import { Grid, IconButton } from "@material-ui/core"
import { ArrowBackIos } from "@material-ui/icons"
import { useHistory } from "react-router"


const BackButton = () => {
    const history = useHistory()

    return <Grid item xs={12} className="p-left-2 p-right-2" container justify="flex-start" alignItems="center">
        <IconButton size="small" onClick={() => history.goBack()}>
            <ArrowBackIos />
        </IconButton>
    </Grid>
}

export default BackButton;