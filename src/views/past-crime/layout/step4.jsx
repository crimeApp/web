import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import {
  perfil_options,
  age_options,
  sex_options,
  skin_options,
  height_options,
  clothing_options,
  physical_options,
} from "../../../assets/options";

const schema = yup.object({
  thief_profile: yup.mixed().oneOf(perfil_options).required(),
  thief_age: yup.mixed().oneOf(age_options).required(),
  thief_height: yup.mixed().oneOf(height_options).optional(),
  thief_sex: yup.mixed().oneOf(sex_options).required(),
  thief_skin: yup.mixed().oneOf(skin_options).optional(),
  thief_clothing: yup.mixed().oneOf(clothing_options).optional(),
  thief_physical: yup.mixed().oneOf(physical_options).optional(),
  complaint: yup.boolean().optional().default(false),
  arrested: yup.boolean().optional().default(false),
});

const PastCrimeStepFour = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    thief_profile: "",
    thief_age: "",
    thief_sex: "",
    thief_skin: "",
    thief_height: "",
    thief_clothing: "",
    thief_physical: "",
    complaint: false,
    arrested: false,
    ...data
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const OnBackward = () => {
    return handleBack(data_state);
  };

  const InputConstructor = (name) => ({
    name,
    xs: 12,
    md: 10,
    value: data_state[name],
    color: "light-gray",
    className: "m-top-1",
    onChange: (event) => HandleChange(name, event.target.value),
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
  });

  return (
    <Grid container className="p-3" justify="center" alignItems="center">
      <Select
        required
        {...InputConstructor("thief_profile")}
        label={traslate.FORM.THEFTDETAILS.PROFILE}
        options={perfil_options}
      />

      <Select
        required
        {...InputConstructor("thief_age")}
        label={traslate.FORM.THEFTDETAILS.AGE}
        options={age_options}
      />

      <Select
        required
        {...InputConstructor("thief_sex")}
        label={traslate.FORM.THEFTDETAILS.SEX}
        options={sex_options}
      />

      <Select
        required
        {...InputConstructor("thief_height")}
        label={traslate.FORM.THEFTDETAILS.HEIGHT}
        options={height_options}
      />

      <Select
        required
        {...InputConstructor("thief_clothing")}
        label={traslate.FORM.THEFTDETAILS.CLOTHING}
        options={clothing_options}
      />

      <Select
        required
        {...InputConstructor("thief_physical")}
        label={traslate.FORM.THEFTDETAILS.PHYSICAL}
        options={physical_options}
      />

      <Select
        required
        {...InputConstructor("thief_skin")}
        label={traslate.FORM.THEFTDETAILS.SKIN}
        options={skin_options}
      />

      <Switches
        xs={12}
        md={10}
        className="p-top-1 p-bottom-1 p-left-4"
        label={traslate.FORM.THEFTDETAILS.COMPLAINT}
        value={data_state.complaint}
        onChange={(event) => HandleChange("complaint", event.target.checked)}
        error={error?.complaint?.error}
        error_msg={error?.complaint?.msg}
      />

      <Switches
        xs={12}
        md={10}
        className="p-top-1 p-bottom-1 p-left-4"
        label={traslate.FORM.THEFTDETAILS.ARRESTED}
        value={data_state.arrested}
        onChange={(event) => HandleChange("arrested", event.target.checked)}
        error={error?.arrested?.error}
        error_msg={error?.arrested?.msg}
      />

      <Grid item className="m-top-1 m-bottom-2">
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

export default PastCrimeStepFour;
