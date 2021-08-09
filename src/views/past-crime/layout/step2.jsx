import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Map from "../../../components/map/Map";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const schema = yup.object({
  geopoint: yup.object({
    lat: yup.number().min(-90).max(90).required(),
    lng: yup.number().min(-180).max(180).required()
  })
  .required(),
});

const PastCrimeStepTwo = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    geopoint: {
      lat: -31.42182659888641,
      lng: -64.18388759242008
    },
    ...data
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    console.log(resp.data);

    return handleNext(resp.data);
  };

  const OnBackward = () => {
    return handleBack(data_state);
  };

  return (
    <Grid
      container
      item
      xs={12}
      className="p-1"
      justify="center"
      alignItems="center"
    >
      <Map
        required
        xs={12}
        label={traslate.FORM.THEFTINFO.LOCATION}
        position={data_state.geopoint}
        onChange={(newValue) => HandleChange("geopoint", newValue)}
        error={data_state.geopoint}
        error_msg={error?.geopoint?.msg}
      />

      <Grid item className="m-top-2 m-bottom-2">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-right-3"
          onClick={OnBackward}
        >
          {traslate.COMMON.BACK}
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className=" m-left-3"
          onClick={OnFoward}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PastCrimeStepTwo;