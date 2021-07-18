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

const accompaniment_options = [
  "Solo/a, gente alrededor",
  "Acompañado, gente alrededor",
  "Solo/a, no gente",
  "Acompañado, no gente alrededor",
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

const today =  new Date();

const schema = yup.object({
  attack_type: yup
    .mixed()
    .oneOf(attack_type_options)
    .required("Completar la casilla"),
  hour: yup
    .mixed()
    .oneOf(hour_options)
    .required("Completar la casilla"),
  date: yup
    .date()
    .max(today)
    .required("Ingresar una fecha valida"),
  place_description: yup
    .mixed()
    .oneOf(place_options)
    .required("Completar la casilla"),
  accompaniment: yup
    .mixed()
    .oneOf(accompaniment_options)
    .required("Completar la casilla"),
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
    <Grid container item xs={12} className="p-1" justify="center" alignItems="center">
      <Select
        xs={10}
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
        xs={10}
        type='date'
        value={data_state.date}
        label={traslate.FORM.THEFTINFO.DATE}
        onChange={(e) => HandleChange("date", e.target.value)}
        color="light-gray"
        className="m-top-1"
        error={error?.date?.error}
        error_msg={error?.date?.msg} />

      <Select
        xs={10}
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
        xs={10}
        color="light-gray"
        className="m-top-1 "
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
        value={data_state.place_description}
        error={error?.place_description?.error}
        onChange={(event) => HandleChange("place_description", event.target.value)}
        error_msg={error?.place_description?.msg}
      />

      <Select
        xs={10}
        color="light-gray"
        className="m-top-1"
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
        value={data_state.accompaniment}
        onChange={(event) => HandleChange("accompaniment", event.target.value)}
        error={error?.accompaniment?.error}
        error_msg={error?.accompaniment?.msg}
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
