import React from "react"
import { Grid } from "@material-ui/core"
import { ArrowBackIos } from "@material-ui/icons"
import { useHistory } from "react-router"


const BackButton = ({ xs = 1, md = 1, className }: { xs?: any, md?: any, className?: string }) => {
    const history = useHistory()

    return <Grid item xs={xs} md={md} className={`hover ${className}`} container justify="center" alignItems="center" onClick={() => history.goBack()}>
        <ArrowBackIos />
    </Grid>
}

const BackButtonString = ({ className }: { className?: string}) => {
    const history = useHistory()
    return <Grid item xs={12} className={`hover ${className}`} container alignItems="center" onClick={() => history.goBack()} >
        <ArrowBackIos style={{ width: "12px", height: "12px" }} />
        <p className="font-size-little">
            Volver
        </p>
    </Grid>
}

export {
    BackButtonString,
    BackButton
}