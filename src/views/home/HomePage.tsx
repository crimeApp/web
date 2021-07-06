import React, { Fragment, useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
//import unitData from "../../assets/judicial-units.json";
import Map from "../../components/map/Map";
import Scaffold from "../../components/scaffold/scaffold";
import useWindowSize from "../../hooks/useWindows";
import "./HomePage.css";

const explanation = (
  <Fragment>
    <h4>{traslate.INSTRUCTIONS.INTRO}</h4>
    {[
      `${traslate.INSTRUCTIONS[1]}`,
      `${traslate.INSTRUCTIONS[2]}`,
      `${traslate.INSTRUCTIONS[3]}`,
      `${traslate.INSTRUCTIONS[4]}`,
    ].map((text, index) => {
      const labelId = `checkbox-list-label-${index}`;

      return (
        <ListItem key={index} role={undefined} dense>
          <ListItemAvatar>
            <Avatar>
              <Avatar>{index + 1}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId}>
            {index === 0 ? (
              <div>
                {text}
                <Link
                  underline="none"
                  color="primary"
                  href="http://www.mpfcordoba.gob.ar/como-hacer-una-denuncia/"
                >
                  Ministerio Público Fiscal.
                </Link>
              </div>
            ) : (
              text
            )}
          </ListItemText>
        </ListItem>
      );
    })}
  </Fragment>
);

const card = (
  <CardContent>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignContent="flex-start"
    >
      <Grid item>
        <h3>{traslate.FORM.INFO}</h3>
        <p className="home-page home-subtitle">{traslate.FORM.EXPLANATION}</p>
        {explanation}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-top-3 m-left-3"
          href="/current-crime-form"
        >
          {traslate.COMMON.START}
        </Button>
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
  const [user_position, set_position] = useState({
    lat: 45.4,
    lng: -75.7,
  });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      set_position({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  return (
    <Scaffold>
      {!md ? (
        <Grid
          container
          className="p-2"
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card variant="elevation">{card}</Card>
          </Grid>
          <Map
            xs={12}
            label={"Encontrá las unidades más cercanas acá."}
            position={user_position}
            onChange={(newValue) => set_position(newValue)}
          />
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <FlashAccess />
          </Grid>
          <Grid item xs={10}>
            {explanation}
          </Grid>
          <Map
            xs={12}
            className="p-1"
            label={"Encontrá las unidades más cercanas acá."}
            position={user_position}
            onChange={(newValue) => set_position(newValue)}
          />
        </Grid>
      )}
    </Scaffold>
  );
}

export default HomePage;
