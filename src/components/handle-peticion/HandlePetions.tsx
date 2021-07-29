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
}: HandlePetitionsProps) => <>
        <Snackbar
            open={handlePage.notification}
            autoHideDuration={3000}
            onClose={() => {
                setHandlePage(prev => ({ ...prev, notification: false }))
                handlePage.callback()
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>
            <Alert severity={handlePage.severity} style={{
                color: `var(--${handlePage.color})`,
                fontWeight: 500,
                margin: "0px",
                padding: "0px",
                backgroundColor: "var(--light-gray)"
            }}>
                {handlePage.msg}
            </Alert>
        </Snackbar>
        {
            handlePage.loading &&
            <Backdrop open={handlePage.loading} style={{ zIndex: 1000, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        }

    </>

export default HandlePetitions;