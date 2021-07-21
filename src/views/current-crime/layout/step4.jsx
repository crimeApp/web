import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Switches from "../../../components/switch/Switch";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const profile_options = [
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
    .oneOf(profile_options)
    .required("Elija una de las opciones"),
  thief_age: yup
    .mixed()
    .oneOf(age_options)
    .required("Elija una de las opciones"),
  thief_height: yup
    .mixed()
    .oneOf(height_options)
    .required(),
  thief_sex: yup
    .mixed()
    .oneOf(sex_options)
    .required(),
  thief_clothing: yup
    .mixed()
    .oneOf(clothing_options)
    .required(),
  thief_physical: yup
    .mixed()
    .oneOf(physical_options)
    .required(),
  thief_complaint: yup.boolean().optional().default(false),
  thief_arrested: yup.boolean().optional().default(false),
});

const CurrentCrimeStepFour = ({ data, handleNext, handleBack }) => {
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

  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center">

      <Switches
        xs={12}
        md={10}
        name={'complaint'}
        className="p-top-1 p-bottom-1 p-left-4"
        label={traslate.FORM.THEFTDETAILS.COMPLAINT}
        value={data_state.thief_complaint}
        onChange={(event) => HandleChange("thief_complaint", event.target.checked)}
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

export default CurrentCrimeStepFour;



