import React, { Fragment, useContext, useState } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Person, BarChart, Explore, Menu, Home, Settings, Storage } from '@material-ui/icons';
import {
    Grid,
    Toolbar,
    AppBar,
    Button,
    IconButton,
    Drawer,
    BottomNavigation,
    BottomNavigationAction,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindows";
import translate from "../../../assets/traslate/es.json"
import { AdminContext } from "../../../context/admin-context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(0, 0, 0, 0),
        display: 'flex'
    },
    menuButton: {
        color: "black",
        width: "auto",
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
        color: "black",
    },
    navigator: {
        position: "fixed",
        width: "100%",
        bottom: "0px",
        left: "0px",
        right: "0px"
    },
    appBar: {
        backgroundColor: "white",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        backgroundColor: "white",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        paddingLeft: `70px`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    content_expand: {
        paddingLeft: `${drawerWidth}px`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}),
);

const ScaffoldAdmin = ({ className, children }: any) => {
    const classes = useStyles();

    const [anchor, set_anchor] = useState(false)
        , theme = useTheme()
        , location = useLocation()
        , { xs } = useWindowSize()
        , [navbar, set_navbar] = useState(location.pathname.split("/")[2])
        , history = useHistory()
        , { admin_state } = useContext(AdminContext)

    return (
        <>
            <div className="layout-basic-header">
                <AppBar position="fixed" className={clsx(classes.appBar, {
                    [classes.appBarShift]: anchor,
                })}>
                    <Toolbar>
                        <Grid item xs={12} container alignContent="center" alignItems="center">
                            {!xs && <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => set_anchor(true)}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: anchor,
                                })}
                            >
                                <Menu />
                            </IconButton>}
                            <Grid item xs className="hover">
                                <img
                                    onClick={() => history.push(translate.ROUTES.ADMIN.HOME)}
                                    alt="CrimeApp"
                                    className="menu-logo"
                                    src={process.env.PUBLIC_URL + "/assets/logos/CAdmin.png"}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar >
                {
                    !xs &&
                    <Drawer variant="permanent" anchor="left" className={clsx(classes.drawer, {
                        [classes.drawerOpen]: anchor,
                        [classes.drawerClose]: !anchor,
                    })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: anchor,
                                [classes.drawerClose]: !anchor,
                            }),
                        }}>
                        <div className={classes.toolbar}>
                            <IconButton onClick={() => set_anchor(false)}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <List>
                            <ListItem button onClick={() => history.push(`/admin/home`)}>
                                <ListItemIcon><Home color={navbar === "home" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary={"Inicio"} />
                            </ListItem>
                            <ListItem button onClick={() => history.push(`/admin/users`)}>
                                <ListItemIcon><Person color={navbar === "users" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary="Usuarios" />
                            </ListItem>
                            <ListItem button onClick={() => history.push(`/admin/statistics`)}>
                                <ListItemIcon><BarChart color={navbar === "statistics" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary={"Estadistica"} />
                            </ListItem>
                            <ListItem button onClick={() => history.push(`/admin/map`)}>
                                <ListItemIcon><Explore color={navbar === "map" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary={"Mapa"} />
                            </ListItem>
                            {
                                admin_state.admin &&
                                <ListItem button onClick={() => history.push(`/admin/datasets`)}>
                                <ListItemIcon><Storage color={navbar === "datasets" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary={"Datasets"} />
                            </ListItem>
                            }
                            <ListItem button onClick={() => history.push(`/admin/config`)}>
                                <ListItemIcon><Settings color={navbar === "config" ? "primary" : "action"} /></ListItemIcon>
                                <ListItemText primary={"Configuracion"} />
                            </ListItem>
                        </List>
                    </Drawer>
                }
            </div>
            <main className={!xs ? clsx(classes.content, {
                [classes.content_expand]: anchor,
            }) : ""}>
                <Grid className={`layout-basic-content ${className}`} container justify="center">
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
                            <BottomNavigationAction label="Config" value="config" icon={<Settings />} />
                        </BottomNavigation>
                        : null
                }
            </main>
        </>
    );
}

export default ScaffoldAdmin;