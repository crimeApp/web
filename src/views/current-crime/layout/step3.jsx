import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import { dniExp } from "../../../utils/reg-exp";
import { sex_options } from "../../../assets/options";

const schema = yup.object({
  victim_victim_full_name: yup
    .string()
    .transform((e) => e.toLowerCase())
    .optional(),
  victim_dni: yup.string().matches(dniExp).required(),
  victim_age: yup.number().max(100).min(12).required(),
  victim_sex: yup.mixed().oneOf(sex_options).required(),
  victim_help: yup.boolean().optional().default(false),
});

const CurrentCrimeStepThree = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    victim_full_name: "",
    victim_dni: "",
    victim_sex: "",
    victim_age: 11,
    victim_help: false,
    ...data,
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
    error_msg: error?.[name]?.msg,
  });

  return (
    <Grid container className="p-3" justify="center" alignItems="center">
      <Input
        label={traslate.FORM.PERSONALINFO.NAME}
        {...InputConstructor("victim_full_name")}
      />

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
        {...InputConstructor("victim_sex")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={sex_options}
        required
      />

      <Input
        required
        label={traslate.FORM.PERSONALINFO.AGE}
        {...InputConstructor("victim_age")}
      />

      <Switches
        xs={12}
        md={10}
        name={"complaint"}
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
