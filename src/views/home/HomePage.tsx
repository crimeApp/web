import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
//import unitData from "../../assets/judicial-units.json";
import Scaffold from "../../components/scaffold/scaffold";
import "./HomePage.css";
import MapMarkers from "../../components/map/MapMarkers";

function HomePage() {
  const [user_position, set_position] = useState({
    lat: -31.42182659888641,
    lng: -64.18388759242008,
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
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="center"
        className="background-color-card-background m-top-2"
      >
        <Grid item xs={12} sm={6} className='p-2 m-2 home-wrap'>
          <Grid container direction='column' alignItems='center' >
            <Grid item>
              <h1 className="m-top-1">¿Querés reportar un siniestro?</h1>
            </Grid>
            <Grid item>
              <p className="home-subtitle">
                ¿Querés reportar un siniestro? Podés contarnos lo que pasó aquí.
              </p>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className='m-top-1'
                color="primary"
                type="submit"
                href={"/crime-form"}
              >
                {traslate.COMMON.START}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          {explanation}
        </Grid>
        <Grid item xs={12}>
          <MapMarkers
            xs={12}
            md={12}
            className='p-1'
            label={"Encontrá las unidades judiciales más cercanas acá."}
            positionCenter={user_position}
            positions={[
              {
                lat: -31.382232224204365,
                lng: -64.18447639101693,
                name: "casa de juan",
              },
              {
                lat: -31.40385792696248,
                lng: -64.21283551834296,
                name: "casa de juan",
              },
              { lat: -31.38536, lng: -64.17993, name: "casa de juan" },
            ]}
          />
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default HomePage;

const explanation = (
  <Grid item xs={12} md={8} className="p-1 m-left-3">
    <h3>{traslate.INSTRUCTIONS.INTRO}</h3>
    {[
      `${traslate.INSTRUCTIONS[1]}`,
      `${traslate.INSTRUCTIONS[2]}`,
      `${traslate.INSTRUCTIONS[3]}`,
      `${traslate.INSTRUCTIONS[4]}`,
    ].map((text, index) => {
      const labelId = `checkbox-list-label-${index}`;

      return (
        <ListItem key={index} role={undefined} dense >
          <ListItemAvatar>
            <Avatar>
              <Avatar>{index + 1}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId} >
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
  </Grid>
);

