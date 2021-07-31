import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const perfil_options = [
  "Violento",
  "Amable",
  "Tranquilo",
  "Cauteloso",
  "Desconfiado",
  "Indiferente",
  "Visiblemente intoxicado",
  "Carismático",
  "No recuerdo",
  "No lo sé"
]

const age_options = [
  "Menor de edad",
  "18-25",
  "25-35",
  "35-45",
  "Más de 50",
  "No recuerdo"
];

const sex_options = ["Hombre", "Mujer", "Indefinido"];

const skin_options = ["no lo sé/no contesta", "piel muy clara", "piel clara",
  "piel morena clara", "piel morena oscura", "piel oscura", "piel muy oscura"];

const clothing_options = [
  "Formal",
  "Casual",
  "Deportivo",
  "Trabajo",
  "Semiformal",
  "Escolar",
  "Arreglado",
  "Desalineado"
];

const height_options = ["Alto", "Mediano", "Bajo", "No recuerdo"];

const physical_options = ["Delgado", "Corpulento", "Obeso", "Atlético"];

const schema = yup.object({
  thief_profile: yup
    .mixed()
    .oneOf(perfil_options)
    .required(),
  thief_age: yup
    .mixed()
    .oneOf(age_options)
    .required(),
  thief_height: yup
    .mixed()
    .oneOf(height_options)
    .optional(),
  thief_skin: yup
    .mixed()
    .oneOf(skin_options)
    .optional(),
  thief_clothing: yup
    .mixed()
    .oneOf(clothing_options)
    .optional(),
  thief_physical: yup
    .mixed()
    .oneOf(physical_options)
    .optional(),
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

  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center">

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.PROFILE}
        options={perfil_options}
        value={data_state.thief_profile}
        onChange={(event) => HandleChange("thief_profile", event.target.value)}
        error={error?.thief_profile?.error}
        error_msg={error?.thief_profile?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.AGE}
        options={age_options}
        value={data_state.thief_age}
        onChange={(event) => HandleChange("thief_age", event.target.value)}
        error={error?.thief_age?.error}
        error_msg={error?.thief_age?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.SEX}
        options={sex_options}
        value={data_state.thief_sex}
        onChange={(event) => HandleChange("thief_sex", event.target.value)}
        error={error?.thief_sex?.error}
        error_msg={error?.thief_sex?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.HEIGHT}
        options={height_options}
        value={data_state.thief_height}
        onChange={(event) => HandleChange("thief_height", event.target.value)}
        error={error?.thief_height?.error}
        error_msg={error?.thief_height?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.CLOTHING}
        options={clothing_options}
        value={data_state.thief_clothing}
        onChange={(event) => HandleChange("thief_clothing", event.target.value)}
        error={error?.thief_clothing?.error}
        error_msg={error?.thief_clothing?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.PHYSICAL}
        options={physical_options}
        value={data_state.thief_physical}
        onChange={(event) => HandleChange("thief_physical", event.target.value)}
        error={error?.thief_physical?.error}
        error_msg={error?.thief_physical?.msg}
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTDETAILS.SKIN}
        options={skin_options}
        value={data_state.thief_skin}
        onChange={(event) => HandleChange("thief_skin", event.target.value)}
        error={error?.thief_skin?.error}
        error_msg={error?.thief_skin?.msg}
      />

      <Switches
        xs={12}
        md={10}
        required
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
        required
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



