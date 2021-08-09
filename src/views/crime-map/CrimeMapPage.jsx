import React, { useState, useEffect } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import { Grid } from "@material-ui/core";
import MapMarkers from "../../components/map/MapMarkers";
import traslate from "../../assets/traslate/es.json";
import DiscreteSlider from "../../components/slider/Slider";

const CrimeMapPage = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Scaffold>
      <Grid
        container
        item
        xs={12}
        md={10}
        justify="center"
        className="m-top-3 p-2 border-normal background-color-card-background"
      >
        <Grid item xs={12} md={10}>
          <h3>{traslate["CRIME-MAP"]["TITLE"]}</h3>
          <p className="home-subtitle">
            {traslate["CRIME-MAP"]["DESCRIPTION"]}
          </p>
        </Grid>
        <MapMarkers
          xs={12}
          md={10}
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
      <DiscreteSlider
        sm={8}
        md={10}
        label={traslate.FORM.THEFTINFO["PHYSICAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["PHYSICAL-EXPLANATION"]}
        required />
    </Scaffold>
  );
};

export default CrimeMapPage;
