import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { ErrorOutline, Error, HelpOutline } from '@material-ui/icons';
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
import traslate from "../../assets/traslate/es.json";
import useWindowSize from "../../hooks/useWindows";


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

    const { md } = useWindowSize();

    const MobileAccess = () => (
        <Fragment>
            <MenuList>
                <MenuItem>
                    <Button href="/current-crime-form">
                        <ListItemIcon>
                            <ErrorOutline fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{traslate.MENU.CURRENTCRIME}</ListItemText>
                    </Button>

                </MenuItem>

                <Divider />

                <MenuItem>
                    <Button href="/past-crime-form">
                        <ListItemIcon>
                            <Error fontSize="small" />
                        </ListItemIcon>
                        <ListItemText >{traslate.MENU.PASTCRIME}</ListItemText>
                    </Button>
                </MenuItem>

                <Divider />

                <MenuItem>
                    <Button href="/current-crime-form">
                        <ListItemIcon>
                            <HelpOutline fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{traslate.MENU.US}</ListItemText>
                    </Button>
                </MenuItem>
            </MenuList>
        </Fragment>
    );

    const DesktopAccess = () => (
        <Fragment>
            <Grid item xs={8} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    href="/current-crime-form">
                    <p style={{ color: "white", fontSize: "small", fontWeight: "bold" }}>
                        {traslate.MENU.CURRENTCRIME}
                    </p>
                </Button>
            </Grid>
            <Grid item xs={8} md={6}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href="/past-crime-form">
                    <p style={{ color: "var(--primaty-color)", fontSize: "small", fontWeight: "bold" }}>
                        {traslate.MENU.PASTCRIME}
                    </p>
                </Button>
            </Grid>
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
                    {!md ?
                        <Grid item xs={4} container justify="flex-end">
                            <DesktopAccess />
                        </Grid> :
                        <Fragment>
                            <Grid item xs container justify="flex-end">
                                <IconButton onClick={() => set_anchor(!anchor)}><MenuIcon /></IconButton>
                            </Grid>
                            <Drawer anchor="left" open={anchor} onClose={() => set_anchor(!anchor)}>
                                <Grid item xs container direction="column" className="p-top-3 p-left-2">
                                    <MobileAccess />
                                </Grid>
                            </Drawer>
                        </Fragment>}
                </Grid>
            </Toolbar>
        </AppBar >
    );
}