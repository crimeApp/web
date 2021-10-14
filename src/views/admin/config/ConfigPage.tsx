import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { ExitToApp, Warning, AccountBox } from '@material-ui/icons';
import { AdminContext } from "../../../context/admin-context";
import { useHistory } from "react-router";
const ConfigAdminPage = () => {

    const { admin_dispatch, admin_state } = useContext(AdminContext)
        , history = useHistory()
    return <ScaffoldAdmin>
        <Grid item xs={12} className="p-2">
            <h3>Configuraciones</h3>
        </Grid>
        <Grid item xs={12} container justify="flex-start">
            {
                [
                    {
                        title: "Perfil",
                        description: "Haga click aqui para editar su cuenta",
                        Icon: AccountBox
                    },
                    {
                        title: "Sección",
                        description: "Haga click aqui para cerrar la cuenta",
                        Icon: ExitToApp,
                        onClick: () => {
                            admin_dispatch({ type: "LOGOUT", payload: {} })
                            return history.push("/admin/login")
                        }
                    }
                ].map((el, index) => <Cards key={index.toString()} {...el} />)
            }
        </Grid>
    </ScaffoldAdmin>
}

export default ConfigAdminPage;

const Cards = ({
    title,
    description,
    Icon = Warning,
    onClick
}: {
    title: string,
    description?: string,
    Icon?: any,
    onClick?: (e: any) => void
}) => <Grid item xs={12} sm={4} container className="p-2">
        <Grid item xs={12} className="p-2 background-color-white shadow border-small hover" onClick={onClick} container alignItems="center">
            <Grid item xs={1}>
                <Icon />
            </Grid>
            <Grid item xs={11} container>
                <Grid item xs={12}>
                    <h5>{title}</h5>
                </Grid>
                <Grid item xs={12}>
                    <p>{description}</p>
                </Grid>
            </Grid>
        </Grid>
    </Grid>