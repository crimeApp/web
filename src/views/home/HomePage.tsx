import React, { Fragment, useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel';
import {
  Grid,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Link,
} from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
//import unitData from "../../assets/judicial-units.json";
import Scaffold from "../../components/scaffold/scaffold";
import Button from "../../components/button/Button";

import MapMarkers from "../../components/map/MapMarkers";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import judicialUnits from '../../assets/judicial-units.json';
import Translate from "../../assets/traslate";

function HomePage() {
  const [user_position, set_position] = useState({
    lat: -31.42182659888641,
    lng: -64.18388759242008,
  })
    , TRANSLATE = Translate['ES']
    , history = useHistory()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      set_position({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Scaffold className="p-left-2 p-right-2">
      <Grid item xs={12} className="p-2" container justify="space-between" alignItems="center" alignContent="center">
        <Grid item xs={12} md={5} container justify="center" alignContent="center" alignItems="center" >
          <Grid item xs={12} container className="background-color-white p-left-3 p-right-3 border-small m-bottom-2" alignItems="center" alignContent="flex-start" justify="center" >
            <Grid item xs={12} className="p-top-3">
              <h3>{TRANSLATE.HOME.REPORT_SINIESTER_TITLE}</h3>
              <p>
                {TRANSLATE.HOME.REPORT_SINIESTER_DETAIL}
              </p>
            </Grid>
            <Button
              xs={8}
              md={5}
              color="violet"
              className="m-bottom-3"
              label={traslate.COMMON.START}
              onClick={() => history.push("/crime-form")}
            />
          </Grid>
          <Grid item xs={12} container className="background-color-white p-left-3 p-right-3 border-small m-bottom-2" alignItems="center" alignContent="center" justify="center">
            <Grid item xs={12} className="p-top-3">
              <h3>{TRANSLATE.HOME.STADISTIC_TITLE}</h3>
              <p>
                {TRANSLATE.HOME.STADISTIC_DETAIL}
              </p>
            </Grid>
            <Button
              xs={8}
              md={5}
              color="violet"
              label={TRANSLATE.HOME.STADICTIS_SUMMIT}
              onClick={() => history.push("/crime-map")}
              className="m-bottom-3"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} className="p-left-2 p-right-2">
          <h3>
            {TRANSLATE.HOME.CORDOBA}
          </h3>
          <Carousel interval={10000}>
            {
              TRANSLATE.HOME.IMGS.map(data => <>
                <img
                  className={ data.href ? "hover" : undefined }
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "var(--border-normal)"
                  }}
                  onClick={() => {
                    if(data.href) 
                      window.location.href = data.href;
                  }}
                  alt="CardPhoto"
                  src={`${process.env.PUBLIC_URL}/assets/home/${data.img}`}
                />
                <p className="p-left-2 p-right-2 p-bottom-3 overflow-text-home">{data.info}</p>
              </>)
            }
          </Carousel>

        </Grid>
      </Grid>
      <Grid item xs={12} container className="p-2">
        <Grid
          item
          xs={12}
          container
          justify="space-between"
          alignItems="flex-start"
          alignContent="center"
          className={`background-color-white border-small p-2`}
        >
          <Grid
            item
            xs={12}
            md={5}
            className={`border-normal p-2`}
          >
            <h3>{traslate.INSTRUCTIONS.INTRO}</h3>
            {explanation}
          </Grid>
          <MapMarkers
            xs={12}
            md={6}
            className={"p-bottom-2"}
            label={"Encontrá las unidades judiciales más cercanas acá."}
            positionCenter={user_position}
            positions={judicialUnits.map(e => ({ lat: e.point[0], lng: e.point[1], name: e.address }))}
          />
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default HomePage;

const explanation = (
  <Fragment>
    {
      traslate.INSTRUCTIONS.DATA.map((text, index) => (
        <ListItem key={index} role={undefined} dense>
          <ListItemAvatar>
            <Avatar>
              <Avatar>{index + 1}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={`checkbox-list-label-${index}`} className="font-size-normal w400">
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
          </ListItemText >
        </ListItem>
      ))}
  </Fragment>
);
