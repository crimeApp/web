import React, { Fragment } from "react";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import useWindowSize from "../../hooks/useWindows";
import "./HomePage.css";

const card = (
  <CardContent>
    <Grid container alignContent="center">
      <Grid item>
        <h3>{traslate.FORM.INFO}</h3>
        <p className="home-page home-subtitle">{traslate.FORM.EXPLANATION}</p>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className=""
            href="/current-crime-form"
          >
            {traslate.COMMON.START}
          </Button>
        </CardActions>
      </Grid>
      <Grid item>
        <img
          alt="CardPhoto"
          src={process.env.PUBLIC_URL + "/assets/home_page.png"}
        />
      </Grid>
    </Grid>
  </CardContent>
);

const explanation = (
  <CardContent>
    <h3>{traslate.FORM.INSTRUCTIONS}</h3>

    {[1, 2, 3, 4, 5, 6].map((value) => {
      const labelId = `checkbox-list-label-${value}`;

      return (
        <ListItem key={value} role={undefined} dense>
          <ListItemAvatar>
            <Avatar>
              <Avatar>{value}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
        </ListItem>
      );
    })}
  </CardContent>
);

const FlashAccess = () => (
  <>
    <Grid
      container
      className="home-page home-wrap m-top-1"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10}>
        <h3>{traslate.MENU.CURRENTCRIME}</h3>
        <p className="home-subtitle">{traslate["FORM"]["CURRENT-INTRO"]}</p>
      </Grid>

      <Grid item xs={10}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-bottom-2 m-top-1"
          href="/current-crime-form"
        >
          {traslate.COMMON.START}
        </Button>
      </Grid>
    </Grid>

    <Grid
      container
      className="home-page home-wrap m-top-2"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10}>
        <h3>{traslate.MENU.PASTCRIME}</h3>
        <p className="">{traslate["FORM"]["PAST-INTRO"]}</p>
      </Grid>

      <Grid item xs={10}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-bottom-3 m-top-1"
          href="/past-crime-form"
        >
          {traslate.COMMON.START}
        </Button>
      </Grid>
    </Grid>
  </>
);

function HomePage() {
  const { md } = useWindowSize();

  return (
    <Scaffold>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        className="p-2"
      >
        {!md ? (
          <>
            <Grid item xs={10}>
              <Card variant="elevation">{card}</Card>
            </Grid>
            <Grid item xs={10}>
              <Card variant="elevation">{explanation}</Card>
            </Grid>
          </>
        ) : (
          <Fragment>
            <Grid item>
              <FlashAccess />
            </Grid>
            <Grid item xs={12}>
              <Card>{explanation}</Card>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Scaffold>
  );
}

export default HomePage;
