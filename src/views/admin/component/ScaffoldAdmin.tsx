import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorOutline, Error, HelpOutline, AccountCircle, Person, BarChart, Explore, Menu, Home } from '@material-ui/icons';
import {
    Grid,
    Toolbar,
    AppBar,
    Button,
    IconButton,
    Drawer,
    BottomNavigation,
    BottomNavigationAction

} from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindows";
import translate from "../../../assets/traslate/es.json"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(0, 0, 0, 0),
    },
    menuButton: {
        color: "black",
        width: "auto",
    },
    title: {
        flexGrow: 1,
        color: "black",
    },
    appbar: {
        backgroundColor: "white",
    },
    navigator: {
        position: "fixed",
        width: "100%",
        bottom: "0px",
        left: "0px",
        right: "0px"
    }
}));

const ScaffoldAdmin = ({ className, children }: any) => {
    const classes = useStyles();

    const [anchor, set_anchor] = useState(false)
        , location = useLocation()
        , url = location.pathname.split("/")
        , { xs } = useWindowSize()
        , [navbar, set_navbar] = useState(url[url.length - 1])
        , history = useHistory()

    return (
        <>
            <div className="layout-basic-header">
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar>
                        <Grid item xs={12} container alignContent="center" alignItems="center">
                            <Grid item xs={8} className="hover">
                                <img
                                    onClick={() => history.push(translate.ROUTES.ADMIN.HOME)}
                                    alt="CrimeApp"
                                    className="menu-logo"
                                    src={process.env.PUBLIC_URL + "/assets/logos/CAdmin.png"}
                                />
                            </Grid>
                            {
                                !xs ? <>
                                    <Grid item xs container justify="flex-end">
                                        <IconButton onClick={() => set_anchor(!anchor)}><Menu /></IconButton>
                                    </Grid>
                                    <Drawer anchor="right" open={anchor} onClose={() => set_anchor(!anchor)}>
                                        <Grid item xs container direction="column" className="p-top-3 p-left-2">
                                        </Grid>
                                    </Drawer>
                                </> : null
                            }
                        </Grid>
                    </Toolbar>
                </AppBar >
            </div>
            <Grid item xs={12} className={`layout-basic-content ${className}`} container justify="center">
                {children}
            </Grid>
            {
                xs ?
                    <BottomNavigation value={navbar} onChange={(_: any, nv: string) => {
                        set_navbar(nv)
                        //@ts-ignore
                        history.push(`/admin/${nv}`)
                    }} className={classes.navigator} >
                        <BottomNavigationAction label="Inicio" value="home" icon={<Home />} />
                        <BottomNavigationAction label="Usuarios" value="users" icon={<Person />} />
                        <BottomNavigationAction label="Estadisticas" value="statistics" icon={<BarChart />} />
                        <BottomNavigationAction label="Mapa" value="map" icon={<Explore />} />
                    </BottomNavigation>
                    : null
            }
        </>
    );
}

export default ScaffoldAdmin;