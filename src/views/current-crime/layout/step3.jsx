import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import Selector from "../../../components/selector/Selector";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const clothing_options = [
  "formal",
  "casual",
  "deportivo",
  "trabajo",
  "semiformal",
  "escolar",
  "arreglado",
  "desalineado",
];

const sex_options = ["hombre", "mujer", "indefinido"];

const height_options = ["alto", "mediano", "bajo", "no recuerdo"];

const physical_options = ["delgado", "corpulento", "corpulento", "obeso", "atletico"];

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
  victim_age: yup
    .number()
    .max(100)
    .min(12)
    .required("Completar la casilla"),
  victim_height: yup
    .mixed()
    .oneOf(height_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  victim_sex: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(sex_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  victim_clothing: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(clothing_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  victim_physical: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(physical_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
});

const CurrentCrimeStepThree = ({ data, handleNext, handleBack }) => {

  const [data_state, set_data] = useState({
    victim_name: "",
    victim_dni: "",
    victim_sex: "",
    victim_age: "",
    victim_skin: "",
    victim_height: "",
    victim_clothing: "",
    victim_physical: "",
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
    handleBack(data);
  };


  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center"
    >
      <Input
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.NAME}
        value={data_state.victim_name}
        onChange={(event, newValue) => HandleChange("victim_name", newValue)}
        error={error?.victim_name?.error}
        error_msg={error?.victim_name?.msg}
      />

      <Input
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.DNI}
        value={data_state.victim_dni}
        onChange={(event, newValue) => HandleChange("victim_dni", newValue)}
        error={error?.victim_dni?.error}
        error_msg={error?.victim_dni?.msg}
      />

      <Selector
        xs={10}
        color='light-gray'
        options={sex_options}
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.SEX}
        value={data_state.victim_sex}
        onChange={(event, newValue) => HandleChange("victim_sex", newValue)}
        error={error?.victim_sex?.error}
        error_msg={error?.victim_sex?.msg}
      />

      <Input
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.AGE}
        value={data_state.victim_age}
        onChange={(event, newValue) => HandleChange("victim_age", newValue)}
        error={error?.victim_age?.error}
        error_msg={error?.victim_age?.msg}
      />

      <Selector
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.HEIGHT}
        value={data_state.victim_height}
        options={height_options}
        onChange={(event, newValue) => HandleChange("victim_height", newValue)}
        error={error?.victim_height?.error}
        error_msg={error?.victim_height?.msg}
      />

      <Input
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.SKIN}
        //options={skin_options}
        value={data_state.victim_skin}
        onChange={(event, newValue) => HandleChange("victim_skin", newValue)}
        error={error?.victim_skin?.error}
        error_msg={error?.victim_skin?.msg}
      />

      <Selector
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.CLOTHING}
        options={clothing_options}
        value={data_state.victim_clothing}
        onChange={(event, newValue) => HandleChange("victim_clothing", newValue)}
        error={error?.victim_clothing?.error}
        error_msg={error?.victim_clothing?.msg}
      />

      <Selector
        xs={10}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.PERSONALINFO.PHYSICAL}
        options={physical_options}
        value={data_state.victim_physical}
        onChange={(event, newValue) => HandleChange("victim_physical", newValue)}
        error={error?.victim_physical?.error}
        error_msg={error?.victim_physical?.msg}
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

export default CurrentCrimeStepThree;