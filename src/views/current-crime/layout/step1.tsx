import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Select from "../../../components/select/Select";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const place_options = [
  "Parque",
  "Calle",
  "Parada de colectivo",
  "Centro comercial",
  "Propiedad privada",
  "Supermercado",
  "Estacionamiento",
  "Otro",
];

const attack_type_options = [
  "Robo",
  "Asesinato",
  "Abuso sexual",
  "Secuestro",
  "Asalto",
  "Hurto",
];

const hour_options = ["Mañana", "Mediodia", "Tarde", "Noche"];

const schema = yup.object({
  attack_type: yup
    .mixed()
    .oneOf(attack_type_options)
    .required(),
  hour: yup
    .mixed()
    .oneOf(hour_options)
    .required(),
  date: yup
    .date()
    .max(new Date())
    .min(new Date('01/01/2010'))
    .required(),
  place_description: yup
    .mixed()
    .oneOf(place_options)
    .required(),
  street_1: yup
    .string()
    .required(),
  street_2: yup
    .string()
    .required(),
});

interface CurrentCrimeStepOneProps {
  data: any;
  handleNext: (data: any) => void;
  handleBack: (data: any) => void;
}

type schemaType = yup.InferType<typeof schema>;

const CurrentCrimeStepOne = ({
  data,
  handleNext,
  handleBack,
}: CurrentCrimeStepOneProps) => {
  const [data_state, set_data] = useState<schemaType>({
    attack_type: "",
    hour: "",
    date: new Date(),
    place_description: "",
    street_1: "",
    street_2: "",
    ...data,
  });


  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) =>
    set_data((prevState: any) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  return (
    <Grid
      container
      item
      xs={12}
      className="p-1"
      justify="center"
      alignItems="center"
    >
      <Select
        xs={12}
        md={10}
        color="light-gray"
        className="m-top-1 "
        label={traslate.FORM.THEFTINFO.THEFT}
        value={data_state.attack_type}
        onChange={(event) => HandleChange("attack_type", event.target.value)}
        options={attack_type_options}
        error={error?.attack_type?.error}
        error_msg={error?.attack_type?.msg}
      />

      <Select
        xs={12}
        md={10}
        color="light-gray"
        className="m-top-1"
        label={traslate.FORM.THEFTINFO.TIMEFRACTION}
        value={data_state.hour}
        onChange={(event) => HandleChange("hour", event.target.value)}
        options={hour_options}
        error={error?.hour?.error}
        error_msg={error?.hour?.msg}
      />

      <Select
        xs={12}
        md={10}
        color="light-gray"
        className="m-top-1 "
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
        value={data_state.place_description}
        error={error?.place_description?.error}
        onChange={(event) => HandleChange("place_description", event.target.value)}
        error_msg={error?.place_description?.msg}
      />

      <Input
        xs={12}
        md={10}
        color="light-gray"
        type={'text'}
        className="m-top-1 m-bottom-1"
        label={"Escriba el nombre de la primera calle"}
        value={data_state.street_1}
        onChange={(event) => HandleChange("street_1", event.target.value)}
        error={error?.street_1?.error}
        error_msg={error?.street_1?.msg}
      />

      <Input
        xs={12}
        md={10}
        color="light-gray"
        type={'text'}
        className="m-top-1 m-bottom-1"
        label={"Escriba el nombre de la segunda calle"}
        value={data_state.street_2}
        onChange={(event) => HandleChange("street_2", event.target.value)}
        error={error?.street_2?.error}
        error_msg={error?.street_2?.msg}
      />

      <Grid item className="m-top-3 m-bottom-2">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-right-3"
          onClick={handleBack}
        >
          {traslate.COMMON.BACK}
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-left-3"
          onClick={OnFoward}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CurrentCrimeStepOne;
