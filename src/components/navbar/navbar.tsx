import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { ErrorOutline, Error, HelpOutline, AccountCircle } from '@material-ui/icons';
import "./navbar.css";
import {
    Grid,
    Toolbar,
    AppBar,
    Button,
    IconButton,
    Drawer,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider

} from "@material-ui/core";

import useWindowSize from "../../hooks/useWindows";
import { useHistory } from "react-router-dom";

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
}));

export default function Navbar() {
    const classes = useStyles();

    const [anchor, set_anchor] = useState(false);
    const history = useHistory()

    const MobileAccess = () => (
        <Fragment>
            <MenuList>
                <MenuItem onClick={() => history.push("/crime-form")}>
                    <ListItemIcon>
                        <ErrorOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Completar formulario</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => history.push("/crime-map")}>
                    <ListItemIcon>
                        <Error fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Ver mapa y reportes</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => history.push("/contact")}>
                    <ListItemIcon>
                        <HelpOutline fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sobre nosotros</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => history.push("/admin/login")} >
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Admin</ListItemText>
                </MenuItem>
            </MenuList>
        </Fragment>
    );

    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
                <Grid item xs={12} container alignContent="center" alignItems="center">
                    <Grid item xs={8}>
                        <Button href="/" >
                            <img
                                alt="CrimeApp"
                                className="menu-logo"
                                src={process.env.PUBLIC_URL + "/assets/logos/CrimeApp.png"}
                            />
                        </Button>
                    </Grid>
                    <Grid item xs container justify="flex-end">
                        <IconButton onClick={() => set_anchor(!anchor)}><MenuIcon /></IconButton>
                    </Grid>
                    <Drawer anchor="right" open={anchor} onClose={() => set_anchor(!anchor)}>
                        <Grid item xs container direction="column" className="p-top-3 p-left-2">
                            <MobileAccess />
                        </Grid>
                    </Drawer>
                </Grid>
            </Toolbar>
        </AppBar >
    );
}