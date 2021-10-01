import React from "react"
import { Grid, IconButton } from "@material-ui/core"
import { ArrowBackIos } from "@material-ui/icons"
import { useHistory } from "react-router"


const BackButton = ({ xs = 1, md = 1, className}: { xs?: any, md?: any, className?: string}) => {
    const history = useHistory()

    return <Grid item xs={xs} md={md} className={className} container justify="flex-start" alignItems="center">
        <IconButton size="small" onClick={() => history.goBack()}>
            <ArrowBackIos />
        </IconButton>
    </Grid>
}

export default BackButton;