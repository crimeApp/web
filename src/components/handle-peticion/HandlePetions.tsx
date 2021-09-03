import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { HandlePageModel } from "../../models/HandlePageModel";

interface HandlePetitionsProps {
    handlePage: HandlePageModel,
    setHandlePage: React.Dispatch<React.SetStateAction<HandlePageModel>>
}

const HandlePetitions = ({
    handlePage,
    setHandlePage
}: HandlePetitionsProps) => {

    const [load, set_load] = React.useState<boolean>(handlePage.loading ?? false)

    //@ts-ignore
    React.useEffect(() => handlePage.loading !== load ? setTimeout(() => set_load(false), 500) : undefined, [handlePage.loading])

    return <>
        <Snackbar
            open={handlePage.notification}
            autoHideDuration={3000}
            onClose={() => {
                setHandlePage(prev => ({ ...prev, notification: false }))
                handlePage.callback && handlePage.callback()
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>
            <Alert severity={handlePage.severity} variant="filled">
                {handlePage.msg}
            </Alert>
        </Snackbar>
        {
            (handlePage.loading || load) &&
            <Backdrop open={(handlePage.loading || load)} style={{ zIndex: 10000, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        }

    </>
}

export default HandlePetitions;