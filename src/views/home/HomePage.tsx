import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  Card,
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
//import unitData from "../../assets/judicial-units.json";
import Scaffold from "../../components/scaffold/scaffold";
import Button from "../../components/button/Button";

import useWindows from "../../hooks/useWindows";
import MapMarkers from "../../components/map/MapMarkers";
import CrimeMapPage from "../crime-map/CrimeMapPage";
import "./HomePage.css";

function HomePage() {
  const [user_position, set_position] = useState({
    lat: -31.42182659888641,
    lng: -64.18388759242008,
  });

  const { xs, md } = useWindows();

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
        item
        xs={12}
        container
        className={`p-left-1 p-right-2 background-color-card-background  ${xs ? "" : "m-bottom-3"
          }`}
      >
        <Grid
          item
          xs={12}
          container
          className={`background-color-card-background`}
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid
            item
            xs={12}
            md={5}
            container
            className={`${xs ? "" : "m-right-3 p-top-2 p-bottom-2"}`}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Card variant="outlined" className="border-normal p-bottom-1">
              <Grid
                item
                xs={12}
                container
                className="p-left-3 p-right-3"
                alignItems="center"
                alignContent="flex-start"
                justify="center"
              >
                <Grid item xs={12}>
                  <h3>¿Querés reportar un siniestro?</h3>
                  <p>
                    Alerta a las autoridades y a las personas mas cercanas si
                    sufris algun tipo de siniestros para crear un espacio de
                    comunicacion y favorecer la seguridad ciudadana de Cordoba.
                  </p>
                </Grid>

                <Grid item xs={8} md={5}>
                  <Link underline="none" href={"/crime-form"}>
                    <Button
                      color="violet"
                      label={traslate.COMMON.START}
                    ></Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>

            <Card
              variant="outlined"
              className="border-normal m-top-3 p-bottom-1"
            >
              <Grid
                item
                xs={12}
                container
                className="p-left-3 p-right-3"
                alignItems="center"
                alignContent="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <h3>¿Querés ver cómo está la seguridad ciudadana actual?</h3>
                  <p>
                    Con los datos anónimos recibidos y las alertas, creamos
                    reportes para informarte sobre los siniestros más recientes
                    ocurridos en la ciudad. Para acceder, haz click en el
                    siguiente botón.
                  </p>
                </Grid>

                <Grid item xs={8} md={5}>
                  <Link underline="none" href={"/crime-map"}>
                    <Button color="violet" label={"Ver reportes"}></Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {xs || md ? (
            ""
          ) : (
              <Grid item md={6} className="p-top-2">
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="CardPhoto"
                  src={process.env.PUBLIC_URL + "/assets/home_page1.png"}
                />
              </Grid>
            )}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        justify="space-between"
        alignItems="center"
        alignContent="center"
        className={`p-left-3 p-right-3 
          background-color-card-background  ${xs ? "m-top-2" : "m-top-3"}`}
      >
        <Grid
          item
          xs={12}
          md={5}
          className={`border-normal background-color-light-gray ${xs ? "p-2" : "m-left-4 p-3"
            }`}
        >
          {xs ? (
            <h3>{traslate.INSTRUCTIONS.INTRO}</h3>
          ) : (
              <h2>{traslate.INSTRUCTIONS.INTRO}</h2>
            )}

          {explanation}
        </Grid>
        <MapMarkers
          xs={12}
          md={6}
          className={""}
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

      <Grid item xs={12}>
        {xs ? "" : <CrimeMapPage />}
      </Grid>

    </Scaffold>
  );
}

export default HomePage;

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
              <div className="font-size-normal w400">
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
                <div className="font-size-normal w400">
                  {text}
                </div>
              )}
          </ListItemText>
        </ListItem>
      );
    })}
  </Fragment>
);
