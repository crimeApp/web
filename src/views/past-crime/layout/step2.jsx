import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

/* const clothing_options = [
    { label: "Formal", value: "formal" },
    { label: "Casual", value: "casual" },
    { label: "Deportivo", value: "deportivo" },
    { label: "Trabajo", value: "trabajo" },
    { label: "Semiinformal", value: "semiformal" },
    { label: "Escolar", value: "escolar" },
    { label: "Arreglado", value: "arreglado" },
    { label: "Desalineado", value: "desalineado" },
  ];
  
  const gender_options = [
    { label: "Hombre", value: "hombre" },
    { label: "Mujer", value: "mujer" },
    { label: "Prefiero no decir", value: "indefinido" },
  ];
  
  const height_options = [
    { label: "Alto", value: "alto" },
    { label: "Mediano", value: "mediano" },
    { label: "Bajo", value: "bajo" },
  ];
  
  const physical_options = [
    { label: "Flaco", value: "flaco" },
    { label: "Normal", value: "normal" },
    { label: "Obeso", value: "obeso" },
    { label: "Atletico", value: "atletico" },
    { label: "Corpulento", value: "corpulento" },
  ];
  
  const profile_options = [
    { label: "Violento", value: "violento" },
    { label: "Amable", value: "amable" },
    { label: "Tranquilo", value: "tranquilo" },
    { label: "Cauteloso", value: "cauteloso" },
    { label: "no recuerdo", value: "no recuerdo" },
    { label: "Visiblemente intoxicado", value: "intoxicado" },
    { label: "Indiferente", value: "indiferente" },
    { label: "Desconfiado", value: "desconfiado" },
  ];
  
  const age_options = [
    { label: "Menor de edad", value: "menor" },
    { label: "18-25", value: "18-25" },
    { label: "25-35", value: "25-35" },
    { label: "35-45", value: "35-45" },
    { label: "+50", value: "+50" },
  ]; */

const schema = yup.object({
  thief_profile: yup
    .mixed()
    .oneOf([
      "violento",
      "amable",
      "tranquilo",
      "cauteloso",
      "desconfiado",
      "indiferente",
      "visiblemente intoxicado",
      "carismaticos",
      "no recuerdo",
    ])
    .required("Elija una de las opciones"),
  thief_age: yup
    .mixed()
    .oneOf([
      "menor de edad",
      "18-25",
      "25-35",
      "35-45",
      "mas de 50",
      "No recuerdo",
    ])
    .required("Elija una de las opciones"),
  thief_height: yup.mixed().oneOf(["alto", "mediano", "bajo", "no recuerdo"]),
  thief_clothing: yup
    .mixed()
    .oneOf([
      "formal",
      "casual",
      "deportivo",
      "trabajo",
      "semiformal",
      "escolar",
      "arreglado",
      "desalineado",
    ]),
  thief_physical: yup
    .mixed()
    .oneOf(["delgado", "casual", "corpulento", "obeso", "atletico"]),
  complaint: yup.boolean().optional(),
  arrested: yup.boolean().optional(),
});

const PastCrimeStepTwo = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    thief_profile: "",
    thief_age: "",
    thief_gender: "",
    thief_skin: "",
    thief_height: "",
    thief_clothing: "",
    thief_physical: "",
    thief_complaint: false,
    thief_arrested: false,
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) =>
    set_data({ ...data_state, [name]: value });

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) {
      set_error(resp.data);
    }

    handleNext(resp.data);
  };

  const OnBackward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) {
      set_error(resp.data);
    }

    handleBack(resp.data);
  };

  return (
    <Grid
      container
      direction="column"
      className="form-wrap"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.PROFILE}
          //options={place_options}
          value={data_state.thief_profile}
          onChange={(e) => HandleChange("thief_profile", e.target.value)}
          error={error?.thief_profile}
          error_msg={error?.thief_profile?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.AGE}
          //options={age_options}
          value={data_state.thief_age}
          onChange={(e) => HandleChange("thief_age", e.target.value)}
          error={error?.thief_age}
          error_msg={error?.thief_age?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.GENDER}
          //options={gender_options}
          value={data_state.thief_gender}
          onChange={(e) => HandleChange("thief_gender", e.target.value)}
          error={error?.thief_gender}
          error_msg={error?.thief_gender?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.SKIN}
          //options={skin_options}
          value={data_state.thief_skin}
          onChange={(e) => HandleChange("thief_skin", e.target.value)}
          error={error?.thief_skin}
          error_msg={error?.thief_skin?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.HEIGHT}
          //options={height_options}
          value={data_state.thief_height}
          onChange={(e) => HandleChange("thief_height", e.target.value)}
          error={error?.thief_height}
          error_msg={error?.thief_height?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.CLOTHING}
          //options={clothing_options}
          value={data_state.thief_clothing}
          onChange={(e) => HandleChange("thief_clothing", e.target.value)}
          error={error?.thief_clothing}
          error_msg={error?.thief_clothing?.msg}
        />
      </Grid>
      <Grid item>
        <Input
          xs={12}
          color="light-gray"
          className="m-top-1 m-bottom-1"
          label={traslate.FORM.THEFTDETAILS.PHYSICAL}
          //options={physical_options}
          value={data_state.thief_physical}
          onChange={(e) => HandleChange("thief_physical", e.target.value)}
          error={error?.thief_physical}
          error_msg={error?.thief_physical?.msg}
        />
      </Grid>
      <Grid item className="m-top-1 m-bottom-1">
        <Input
          xs={12}
          color="light-gray"
          label={traslate.FORM.THEFTDETAILS.COMPLAINT}
          value={data_state.thief_complaint}
          onChange={(e) => HandleChange("thief_complaint", e.target.value)}
          error={error?.thief_complaint}
          error_msg={error?.thief_complaint?.msg}
        />
      </Grid>
      <Grid item className="m-top-1 m-bottom-1">
        <Input
          xs={12}
          color="light-gray"
          label={traslate.FORM.THEFTDETAILS.ARRESTED}
          value={data_state.thief_arrested}
          onChange={(e) => HandleChange("thief_arrested", e.target.value)}
          error={error?.date}
          error_msg={error?.date?.msg}
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

export default PastCrimeStepTwo;
