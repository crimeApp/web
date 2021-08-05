import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import { dniExp } from "../../../utils/reg-exp";

const clothing_options = [
  "Formal",
  "Casual",
  "Deportivo",
  "Trabajo",
  "Semiformal",
  "Escolar",
  "Arreglado",
  "Desalineado",
];

const sex_options = ["Hombre", "Mujer", "Indefinido"];

const height_options = ["Alto", "Mediano", "Bajo", "No recuerdo"];

const skin_options = ["no lo sé/no contesta", "piel muy clara", "piel clara",
  "piel morena clara", "piel morena oscura", "piel oscura", "piel muy oscura"];

const physical_options = ["Delgado", "Corpulento", "Obeso", "Atlético"];

const schema = yup.object({
  victim_sex: yup
    .mixed()
    .oneOf(sex_options)
    .required(),
  victim_dni: yup
    .string()
    .matches(dniExp)
    .required(),
  victim_age: yup
    .number()
    .max(100)
    .min(12),
  victim_height: yup
    .mixed()
    .oneOf(height_options)
    .optional(),
  victim_skin: yup
    .mixed()
    .oneOf(skin_options)
    .optional(),
  victim_clothing: yup
    .mixed()
    .optional()
    .oneOf(clothing_options),
  victim_physical: yup
    .mixed()
    .optional()
    .oneOf(physical_options),
});

const PastCrimeStepThree = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    victim_dni: "",
    victim_sex: "",
    victim_age: 12,
    victim_height: "",
    victim_clothing: "",
    victim_physical: "",
    ...data
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({
      ...prevState,
      [name]: value,
    }));

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
    error_msg: error?.[name]?.msg
  })

  return (
    <Grid container className="p-3" justify="center" alignItems="center">
      <Input
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.PERSONALINFO.DNI}
        value={data_state.victim_dni}
        onChange={(event) => HandleChange("victim_dni", event.target.value)}
        error={error?.victim_dni?.error}
        error_msg={
          error?.victim_dni?.type === "matches"
            ? "El dni ingresado es incorrecto"
            : error?.victim_dni?.msg
        }
      />

    <Select
        required
        {...InputConstructor("victim_sex")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={sex_options}
      />

      <Input
        required
        type={'number'}
        {...InputConstructor("victim_age")}
        label={traslate.FORM.PERSONALINFO.AGE}
      />

      <Select
        required
        {...InputConstructor("victim_height")}
        label={traslate.FORM.PERSONALINFO.HEIGHT}
        options={height_options}
      />

      <Select
        required
        {...InputConstructor("victim_clothing")}
        label={traslate.FORM.PERSONALINFO.CLOTHING}
        options={clothing_options}
      />

      <Select
        required
         {...InputConstructor("victim_skin")}
        label={traslate.FORM.PERSONALINFO.SKIN}
        options={skin_options}
      />

      <Select
        required
        {...InputConstructor("victim_physical")}
        label={traslate.FORM.PERSONALINFO.PHYSICAL}
        options={physical_options}
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

export default PastCrimeStepThree;
