import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import { dniExp } from "../../../utils/reg-exp";

const sex_options = ["Hombre", "Mujer", "Indefinido"];

const schema = yup.object({
  full_name: yup
    .string()
    .transform((e) => e.toLowerCase())
    .optional(),
  dni: yup.string().matches(dniExp),
  victim_age: yup.number().max(100).min(12).required().default(0),
  victim_sex: yup.mixed().oneOf(sex_options).required(),
  victim_help: yup.mixed().optional().default(false),
});

const CurrentCrimeStepThree = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    full_name: "",
    dni: "",
    victim_sex: "",
    victim_age: 12,
    victim_help: false,
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

  return (
    <Grid container className="p-3" justify="center" alignItems="center">
      <Input
        xs={12}
        md={10}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.PERSONALINFO.NAME}
        value={data_state.full_name}
        onChange={(event) => HandleChange("full_name", event.target.value)}
        error={error?.full_name?.error}
        error_msg={error?.full_name?.msg}
      />

      <Input
        xs={12}
        md={10}
        required
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.PERSONALINFO.DNI}
        value={data_state.dni}
        onChange={(event) => HandleChange("dni", event.target.value)}
        error={error?.dni?.error}
        error_msg={
          error?.dni?.type === "matches"
            ? "El DNI ingresado es incorrecto"
            : error?.dni?.msg
        }
      />

      <Select
        xs={12}
        md={10}
        required
        color="light-gray"
        options={sex_options}
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.PERSONALINFO.SEX}
        value={data_state.victim_sex}
        onChange={(event) => HandleChange("victim_sex", event.target.value)}
        error={error?.victim_sex?.error}
        error_msg={error?.victim_sex?.msg}
      />

      <Input
        xs={12}
        md={10}
        color="light-gray"
        type={'number'}
        required
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.PERSONALINFO.AGE}
        value={data_state.victim_age}
        onChange={(event) => HandleChange("victim_age", event.target.value)}
        error={error?.victim_age?.error}
        error_msg={error?.victim_age?.msg}
      />

      <Switches
        xs={12}
        md={10}
        name={'complaint'}
        className="p-top-1 p-bottom-1 p-left-4"
        label={"¿Necesita asistencia médica?"}
        value={data_state.victim_help}
        onChange={(event) => HandleChange("victim_help", event.target.checked)}
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
