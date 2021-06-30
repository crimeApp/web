import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Selector from "../../../components/selector/Selector";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

const place_options = ["Parque",
  "Calle",
  "Parada de colectivo",
  "centro comercial", "propiedad privada",
  "supermercado",
  "Estacionamiento",
  "Otro"
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

const hour_options = [
  "Mañana",
  "Mediodia",
  "Tarde",
  "Noche"
];

const schema = yup.object({
  attack_type: yup
    .string()
    .transform((e) => e.toLowerCase())
    .oneOf(attack_type_options.map(e => e.toLowerCase()))
    .required("Completar la casilla"),
  hour: yup
    .string()
    .transform((e) => e.toLowerCase())
    .oneOf(hour_options.map(e => e.toLowerCase()))
    .required("Completar la casilla"),
  /* date: yup
    .date()
    .min(new Date("01/01/2010"))
    .max(new Date())
    .required("Ingresar una fecha valida"), */
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
    .required("Completar la casilla")
});

interface PastCrimeStepOneProps {
  data: any;
  handleNext: (data: any) => void;
  handleBack: (data: any) => void;
}

type schemaType = yup.InferType<typeof schema>;

const PastCrimeStepOne = ({ data, handleNext, handleBack }: PastCrimeStepOneProps) => {
  const [data_state, set_data] = useState<schemaType>({
    attack_type: "",
    hour: "",
    date: "2021-06-30T13:26:00.000Z",
    place_description: "",
    accompaniment: "",
    position: {
      lat: 0,
      lng: 0,
    },
    ...data,
  });

  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) => set_data((prevState: any) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);
    console.log(resp.data);
    return handleNext(resp.data);
  };

  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center"
    >

      <Selector
        xs={12}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.THEFTINFO.THEFT}
        value={data_state.attack_type}
        onChange={(event, newValue) => HandleChange("attack_type", newValue)}
        options={attack_type_options}
        error={error?.attack_type?.error}
        error_msg={error?.attack_type?.msg}
      />

      <Selector
        xs={12}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.THEFTINFO.TIMEFRACTION}
        value={data_state.hour}
        onChange={(event, newValue) => HandleChange("hour", newValue)}
        options={hour_options}
        error={error?.hour?.error}
        error_msg={error?.hour?.msg}
      />

      <Selector
        xs={12}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
        value={data_state.place_description}
        error={error?.place_description?.error}
        onChange={(event, newValue) => HandleChange("place_description", newValue)}
        error_msg={error?.place_description?.msg}
      />

      <Selector
        xs={12}
        color='light-gray'
        className='m-top-1 m-bottom-1'
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
        value={data_state.accompaniment}
        onChange={(event, newValue) => HandleChange("accompaniment", newValue)}
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
