import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
//import Selector from "../../../components/selector/Selector";
import RadioButtons from "../../../components/radio-buttons/RadioButtons";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const sex_options = ["hombre", "mujer", "indefinido"];

const schema = yup.object({
  victim_name: yup
    .string()
    .transform((e) => e.toLowerCase())
    .optional(),
  victim_dni: yup
    .number()
    .min(100000)
    .max(99999999)
    .required("Completar la casilla"),
  victim_sex: yup
    .string()
    .transform((e) => e.toLowerCase())
    .oneOf(["hombre", "mujer", "indefinido"])
    .required("Elija una opcion"),
  victim_age: yup.number().max(100).min(12).required("Completar la casilla"),
});

const PastCrimeStepFour = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    victim_name: "",
    victim_dni: "",
    victim_sex: "",
    victim_age: "",
    victim_skin: "",
    victim_height: "",
    victim_clothing: "",
    victim_pyshical: "",
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) => set_data((prevState) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const OnBackward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleBack(resp.data);
  };

  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.NAME}
          value={data_state.victim_name}
          onChange={(e) => HandleChange("victim_name", e.target.value)}
          error={error?.victim_name?.error}
          error_msg={error?.victim_name?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.DNI}
          //options={place_options}
          value={data_state.victim_dni}
          onChange={(e) => HandleChange("victim_dni", e.target.value)}
          error={error?.victim_dni?.error}
          error_msg={error?.victim_dni?.msg}
        />
      </Grid>
      <Grid item>
        <RadioButtons
          xs={12}
          color='light-gray'
          options={sex_options}
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.SEX}
          value={data_state.victim_sex}
          onChange={(e) => HandleChange("victim_sex", e.target.value)}
          error={error?.victim_sex?.error}
          error_msg={error?.victim_sex?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.AGE}
          value={data_state.victim_age}
          onChange={(e) => HandleChange("victim_age", e.target.value)}
          error={error?.victim_age?.error}
          error_msg={error?.victim_age?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.HEIGHT}
          value={data_state.victim_height}
          //options={height_options}
          onChange={(e) => HandleChange("victim_height", e.target.value)}
          error={error?.victim_height?.error}
          error_msg={error?.victim_height?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.SKIN}
          //options={skin_options}
          value={data_state.victim_skin}
          onChange={(e) => HandleChange("victim_skin", e.target.value)}
          error={error?.victim_skin?.error}
          error_msg={error?.victim_skin?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.CLOTHING}
          //options={clothing_options}
          value={data_state.victim_clothing}
          onChange={(e) => HandleChange("victim_clothing", e.target.value)}
          error={error?.victim_clothing?.error}
          error_msg={error?.victim_clothing?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          color='light-gray'
          className='m-top-1 m-bottom-1'
          label={traslate.FORM.PERSONALINFO.PHYSICAL}
          //options={pyshic_options}
          value={data_state.victim_pyshical}
          onChange={(e) => HandleChange("victim_pyshical", e.target.value)}
          error={error?.victim_pyshical?.error}
          error_msg={error?.victim_pyshical?.msg}
        />
      </Grid>

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
