import React, { useState, useEffect } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import { Grid, Card } from "@material-ui/core";
import yup from "../../utils/yup";
//import axios from "axios";
import traslate from "../../assets/traslate/es.json";
import Validator from "../../utils/validator";
import MapMarkers from "../../components/map/MapMarkers";
import {
  time_options,
} from "../../assets/options";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Switches from "../../components/switch/Switch";
import Select from "../../components/select/Select";
import DiscreteSlider from "../../components/slider/Slider";
import CrimeReports from "../crime-reports/CrimeReports";

const schema = yup.object({
  time_fraction: yup.mixed().oneOf(time_options).default(""),
  date: yup.date().optional().default(""),
  location: yup.string().optional().default(""),
  armed: yup.boolean().optional().default(false),
  agressiveness: yup.number().optional().default(1),
});

const CrimeMapPage = () => {
  const [user_position, set_position] = useState({
    lat: -31.42182659888641,
    lng: -64.18388759242008,
  });

  const [form_data, set_data] = useState({
    ...schema.getDefault(),
  });

  const [error, setError] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  async function HandleSubmit(event) {
    setError({});

    const resp = await Validator(form_data, schema);

    if (resp.err) return setError(resp.data);

    /*  try {
       const response = await axios.post(url + "/new-sinister", form_data);
       if (response) {
         setLoading(false);
       }
     } catch (e) {
       setTimeout(() => {
         setError(true);
         setLoading(false);
       }, 3000);
     } */
  }

  const InputConstructor = (name) => ({
    name,
    xs: 12,
    md: 12,
    //@ts-ignore
    value: form_data[name],
    className: "p-left-3 p-right-3 p-top-2",
    color: "light-gray",
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
    onChange: (event) => HandleChange(name, event.target.value),
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
        item
        xs={12}
        container
        className="background-color-card-background p-left-1 p-right-1"
        alignItems="center"
        alignContent="center"
        justify="space-between"
      >
        <Grid item xs={12} className="p-left-1 p-right-1 m-top-1 p-bottom-1 border-medium border-normal" >
          <div className="p-left-3 p-right-3 ">
          <h3>{traslate["CRIME-MAP"]["TITLE"]}</h3>
          <p className="home-subtitle">
            {traslate["CRIME-MAP"]["DESCRIPTION"]}
          </p>
          </div>

          <Input
            {...InputConstructor("date")}
            type="date"
            label={traslate.FORM.THEFTINFO.DATE}
          />

          <Input
            {...InputConstructor("location")}
            type="text"
            label={traslate.FORM.THEFTINFO.LOCATION}
          />

          <Select
            {...InputConstructor("time_fraction")}
            label={traslate.FORM.THEFTINFO.TIMEFRACTION}
            options={time_options}
          />

          <Switches
            {...InputConstructor("armed")}
            label={traslate.FORM.THEFTDETAILS.ARMED}
            onChange={(event) => HandleChange("armed", event.target.checked)}
          />

          <DiscreteSlider
            {...InputConstructor("agressiveness")}
            label={traslate.FORM.THEFTDETAILS.AGRESSIVE}
            onChange={(event, newValue) => HandleChange("agressiveness", newValue)}
          />

          <Button
            color="violet"
            className='p-left-4 p-right-4 p-top-3'
            label={'Consultar'}
            onClick={HandleSubmit}
          />
        </Grid>
        
        <MapMarkers
          xs={12}
          md={7}
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
      <CrimeReports/>
    </Scaffold>
  );
};

export default CrimeMapPage;
