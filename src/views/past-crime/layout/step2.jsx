import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Switches from "../../../components/switch/Switch";
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

const profile_options = [
  "violento",
  "amable",
  "tranquilo",
  "cauteloso",
  "desconfiado",
  "indiferente",
  "visiblemente intoxicado",
  "carismaticos",
  "no recuerdo",
];

const age_options = [
  "menor de edad",
  "18-25",
  "25-35",
  "35-45",
  "mas de 50",
  "No recuerdo"
];

const schema = yup.object({
  thief_profile: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(profile_options.map(e => e.toLowerCase()))
    .required("Elija una de las opciones"),
  thief_age: yup
    .mixed()
    .oneOf(age_options.map(e => e.toLowerCase()))
    .required("Elija una de las opciones"),
  thief_height: yup
    .mixed()
    .oneOf(height_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  thief_sex: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(sex_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  thief_clothing: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(clothing_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  thief_physical: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(physical_options.map(e => e.toLowerCase()))
    .required("Elija una opcion"),
  complaint: yup.boolean().optional(),
  arrested: yup.boolean().optional(),
});

const PastCrimeStepTwo = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    thief_profile: "",
    thief_age: "",
    thief_sex: "",
    thief_skin: "",
    thief_height: "",
    thief_clothing: "",
    thief_physical: "",
    thief_complaint: false,
    thief_arrested: false,
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) => set_data((prevState) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    console.log(resp.data);

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
      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.PROFILE}
        options={profile_options}
        value={data_state.thief_profile}
        onChange={(event, newValue) => HandleChange("thief_profile", newValue)}
        error={error?.thief_profile?.error}
        error_msg={error?.thief_profile?.msg}
      />

      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.AGE}
        options={age_options}
        value={data_state.thief_age}
        onChange={(event, newValue) => HandleChange("thief_age", newValue)}
        error={error?.thief_age?.error}
        error_msg={error?.thief_age?.msg}
      />
      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.SEX}
        options={sex_options}
        value={data_state.thief_sex}
        onChange={(event, newValue) => HandleChange("thief_sex", newValue)}
        error={error?.thief_sex?.error}
        error_msg={error?.thief_sex?.msg}
      />

      {/* <Grid item>
        <Selector
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.SKIN}
          //options={skin_options}
          value={data_state.thief_skin}
          onChange={(event, newValue) => HandleChange("thief_skin", newValue)}
          error={error?.thief_skin?.error}
          error_msg={error?.thief_skin?.msg}
        />
      </Grid> */}

      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.HEIGHT}
        options={height_options}
        value={data_state.thief_height}
        onChange={(event, newValue) => HandleChange("thief_height", newValue)}
        error={error?.thief_height?.error}
        error_msg={error?.thief_height?.msg}
      />

      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.CLOTHING}
        options={clothing_options}
        value={data_state.thief_clothing}
        onChange={(event, newValue) => HandleChange("thief_clothing", newValue)}
        error={error?.thief_clothing?.error}
        error_msg={error?.thief_clothing?.msg}
      />
      
      <Selector
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.PHYSICAL}
        options={physical_options}
        value={data_state.thief_physical}
        onChange={(event, newValue) => HandleChange("thief_physical", newValue)}
        error={error?.thief_physical?.error}
        error_msg={error?.thief_physical?.msg}
      />

      <Switches
        xs={12}
        className="p-top-1 p-bottom-1 p-left-4"
        label={traslate.FORM.THEFTDETAILS.COMPLAINT}
        value={data_state.thief_complaint}
        onChange={(event, newValue) => HandleChange("thief_complaint", newValue)}
        error={error?.thief_complaint?.error}
        error_msg={error?.thief_complaint?.msg}
      />

      <Switches
        xs={12}
        className="p-top-1 p-bottom-1 p-left-4"
        label={traslate.FORM.THEFTDETAILS.ARRESTED}
        value={data_state.thief_arrested}
        onChange={(event, newValue) => HandleChange("thief_arrested", newValue)}
        error={error?.thief_arrested?.error}
        error_msg={error?.thief_arrested?.msg}
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

export default PastCrimeStepTwo;
