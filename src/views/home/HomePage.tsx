import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Card as CardMUI,
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

const Card = ({ children }: any) => (
  <CardMUI variant="elevation">
    <CardContent>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="flex-start"
      >
        {children}
      </Grid>
    </CardContent>
  </CardMUI>
);

const FlashAccess = () => (
  <>
    <Grid
      container
      item xs={10}
      className="home-wrap m-top-1"
      justify="center"
      alignItems="center"
      alignContent="center"
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
      item xs={10}
      className="home-wrap m-top-3"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={10}>
        <h3>{traslate.MENU.PASTCRIME}</h3>
        <p className="home-subtitle">{traslate["FORM"]["PAST-INTRO"]}</p>
      </Grid>

      <Grid item xs={10}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-bottom-2 m-top-1"
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      set_position({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Scaffold>
      {!md ? (
        <Grid
          item
          xs={12}
          container
          className="p-2"
          justify="flex-end"
          alignItems="flex-end"
          alignContent="center"
        >
          <Grid item xs={12}>
            <Card>
              <Grid item xs={6}>
                <h3>{traslate.FORM.INFO}</h3>
                <p className="home-subtitle">
                  {traslate.FORM.EXPLANATION}
                </p>

                <img
                  alt="CardPhoto"
                  src={process.env.PUBLIC_URL + "/assets/home_page.png"}
                />
              </Grid>
              <Grid item xs={6} className='m-top-3'>
                <FlashAccess/>
              </Grid>
            </Card>

            <Grid item xs={12} className='p-top-2'>
              <Card>
                <Grid item xs={6}>
                  <h4>{traslate.INSTRUCTIONS.INTRO}</h4>
                  {explanation}
                </Grid>
                <Grid item xs={6}>
                  <Map
                    xs={12}
                    label={"Encontrá las unidades más cercanas acá."}
                    position={user_position}
                    onChange={(newValue) => set_position(newValue)}
                  />
                </Grid>
              </Card>
            </Grid>
            
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          container
          justify="center"
          alignItems="center"
          spacing={2}
        >
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
