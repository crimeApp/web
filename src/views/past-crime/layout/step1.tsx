import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

/* const place_options = [
  {
    label: "Parque",
    value: "parque",
  },
  {
    label: "Calle",
    value: "calle",
  },
  {
    label: "Parada de colectivo",
    value: "parada de colectivo",
  },
  {
    label: "centro comercial",
    value: "centro comercial",
  },
  {
    label: "propiedad privada",
    value: "propiedad privada",
  },
  {
    label: "supermercado",
    value: "supermercado",
  },
  {
    label: "Estacionamiento",
    value: "estacionamiento",
  },
  {
    label: "Otro",
    value: "otro",
  },
];

const accompaniment_options = [
  {
    label: "Solo/a, gente alrededor",
    value: "solo/a, gente alrededor",
  },
  {
    label: "Acompañado, gente alrededor",
    value: "acompañado, gente alrededor",
  },
  {
    label: "Solo/a, no gente",
    value: "solo/a, no gente alrededor",
  },
  {
    label: "Acompañado, no gente alrededor",
    value: "acompañado, no gente alrededor",
  },
];

const type_options = [
  {
    label: "Abuso sexual",
    value: "abuso sexual",
  },
  {
    label: "Asesinato",
    value: "asesinato",
  },
  {
    label: "Robo",
    value: "robo",
  },
  {
    label: "Hurto",
    value: "hurto",
  },
  {
    label: "Asalto",
    value: "asalto",
  },
];

const hour_options = [
  {
    label: "Mañana",
    value: "mañana",
  },
  {
    label: "Mediodia",
    value: "mediodia",
  },
  {
    label: "tarde",
    value: "tarde",
  },
  {
    label: "noche",
    value: "noche",
  },
]; */

const schema = yup.object({
  type: yup
    .string()
    .transform((e) => e.toLowerCase())
    .oneOf([
      "robo",
      "asesinato",
      "abuso sexual",
      "secuestro",
      "asalto",
      "hurto",
    ])
    .required("Completar la casilla"),
  hour: yup
    .string()
    .transform((e) => e.toLowerCase())
    .oneOf(["mañana", "mediodia", "tarde", "noche"])
    .required("Completar la casilla"),
  date: yup
    .date()
    .min(new Date("01/01/2010"))
    .max(new Date())
    .required("Ingresar una fecha valida"),
  place_description: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf([
      "otro",
      "en el estacionamiento",
      "parada de colectivo",
      "supermercado",
      "propiedad privada",
      "calle",
      "centro comercial",
      "parque",
    ])
    .required("Completar la casilla"),
  accompaniment: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf([
      "solo/a, gente alrededor",
      "acompañado, gente alrededor",
      "solo/a, no gente alrededor",
      "acompañado, no gente alrededor",
    ])
    .required("Completar la casilla"),
});

interface PastCrimeStepOneProps {
  data: any;
  handleNext: (data: any) => void;
}

const PastCrimeStepOne = ({ data, handleNext }: PastCrimeStepOneProps) => {
  const [data_state, set_data] = useState({
    ...data,
    type: "",
    hour: "",
    date: "",
    place_description: "",
    accompaniment: "",

    position: {
      lat: 0,
      lng: 0,
    },
  });

  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) =>
    set_data({ ...data_state, [name]: value });

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) {
      set_error(resp.data);
    }

    handleNext(resp.data);
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
          label={traslate.FORM.THEFTINFO.THEFT}
          //options={type_options}
          value={data_state.type}
          onChange={(e) => HandleChange("type", e.target.value)}
          error={error?.type}
          error_msg={error?.type?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          label={traslate.FORM.THEFTINFO.TIMEFRACTION}
          value={data_state.hour}
          //options={time_options}
          onChange={(e) => HandleChange("hour", e.target.value)}
          error={error?.hour}
          error_msg={error?.hour?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          label={"Fecha"}
          //options={place_options}
          value={data_state.place_description}
          onChange={(e) => HandleChange("place_description", e.target.value)}
          error={error?.place_description}
          error_msg={error?.place_description?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          label={traslate.FORM.THEFTINFO.DATE}
          value={data_state.date}
          onChange={(e) => HandleChange("date", e.target.value)}
          error={error?.date}
          error_msg={error?.date?.msg}
        />
      </Grid>

      <Grid item>
        <Input
          xs={12}
          label={traslate.FORM.THEFTINFO.COMPANY}
          //options={accompaniment_options}
          value={data_state.accompaniment}
          onChange={(e) => HandleChange("accompaniment", e.target.value)}
          error={error?.accompaniment}
          error_msg={error?.accompaniment?.msg}
        />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-top-1 m-bottom-2"
          onClick={OnFoward}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PastCrimeStepOne;
