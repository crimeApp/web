import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Select from "../../../components/select/Select";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const place_options = [
  "parque",
  "calle",
  "parada de colectivo",
  "centro comercial",
  "propiedad privada",
  "supermercado",
  "estacionamiento",
  "otro",
];

const accompaniment_options = [
  "solo/a, gente alrededor",
  "acompañado, gente alrededor",
  "solo/a, no gente",
  "acompañado, no gente alrededor",
];

const attack_type_options = [
  "robo",
  "asesinato",
  "abuso sexual",
  "secuestro",
  "asalto",
  "hurto",
];

const hour_options = ["Mañana", "Mediodia", "Tarde", "Noche"];

const today =  new Date();

const min_date = new Date('March 1, 2000 00:00:00');

const schema = yup.object({
  attack_type: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(attack_type_options.map((e) => e.toLowerCase()))
    .required("Completar la casilla"),
  hour: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(hour_options.map((e) => e.toLowerCase()))
    .required("Completar la casilla"),
  date: yup
    .date()
    .max(today)
    .min(min_date)
    .required("Ingresar una fecha valida"),
  place_description: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(place_options.map((e) => e.toLowerCase()))
    .required("Completar la casilla"),
  accompaniment: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(accompaniment_options.map((e) => e.toLowerCase()))
    .required("Completar la casilla"),
});

interface PastCrimeStepOneProps {
  data: any;
  handleNext: (data: any) => void;
  handleBack: (data: any) => void;
}

type schemaType = yup.InferType<typeof schema>;

const PastCrimeStepOne = ({
  data,
  handleNext,
  handleBack,
}: PastCrimeStepOneProps) => {

  const [data_state, set_data] = useState<schemaType>({
    attack_type: "",
    hour: "",
    date: "",
    place_description: "",
    accompaniment: "",
    position: {
      lat: 0,
      lng: 0,
    },
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
    <Grid container className="p-3" justify="center" alignItems="center">
      <Select
        xs={12}
        color="light-gray"
        className="m-top-1 "
        label={traslate.FORM.THEFTINFO.THEFT}
        value={data_state.attack_type}
        onChange={(event) => HandleChange("attack_type", event.target.value)}
        options={attack_type_options}
        error={error?.attack_type?.error}
        error_msg={error?.attack_type?.msg}
      />

      <Input
        xs={12}
        type='date'
        value={data_state.date}
        label={data_state.date ? traslate.FORM.THEFTINFO.DATE : ''}
        defaultValue={data_state.date}
        onChange={(e) => HandleChange("date", e.target.value)}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        error={error?.date?.error}
        error_msg={error?.date?.msg} />

      <Select
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTINFO.TIMEFRACTION}
        value={data_state.hour}
        onChange={(event) => HandleChange("hour", event.target.value)}
        options={hour_options}
        error={error?.hour?.error}
        error_msg={error?.hour?.msg}
      />

      <Select
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
        value={data_state.place_description}
        error={error?.place_description?.error}
        onChange={(event) => HandleChange("place_description", event.target.value)}
        error_msg={error?.place_description?.msg}
      />

      <Select
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
        value={data_state.accompaniment}
        onChange={(event) => HandleChange("accompaniment", event.target.value)}
        error={error?.accompaniment?.error}
        error_msg={error?.accompaniment?.msg}
      />

      <Grid item className="m-top-1 m-bottom-2">
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
          className=" m-left-3"
          onClick={OnFoward}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PastCrimeStepOne;
