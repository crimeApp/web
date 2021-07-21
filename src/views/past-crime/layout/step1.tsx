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

const items_options = [
  "celular",
  "billetera",
  "documentacion",
  "dinero",
  "auto",
  "computadora",
  "notebook",
  "herramientas",
  "mochila",
  "cartera",
  "llaves",
  "motocicleta",
  "ropa",
  "objetos recien comprados",
  "alimento",
  "accesorios",
  "tarjetas debito/credito",
  "electrodomesticos",
  "muebles",
  "dolares",
  "joyeria",
  "objetos de valor personal",
  "reliquias",
  "maquinaria",
  "mascotas",
  "otros",
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
    .required(),
  place_description: yup
    .mixed()
    .oneOf(place_options)
    .required(),
  accompaniment: yup
    .mixed()
    .oneOf(accompaniment_options)
    .required(),
  stolen_items: yup
    .mixed()
    .oneOf(items_options)
    .required(),
  stolen_cash: yup
    .number()
    .min(1)
    .max(99999999)
    .required(),
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
    date: new Date(),
    place_description: "",
    accompaniment: "",
    stolen_cash: "",
    stolen_items: "",
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
      item
      xs={12} 
      container 
      className="p-1" 
      justify="center" 
      alignItems="center">

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

      <Input
        xs={12}
        md={10}
        type='date'
        value={data_state.date}
        label={traslate.FORM.THEFTINFO.DATE}
        onChange={(e) => HandleChange("date", e.target.value)}
        color="light-gray"
        className="m-top-1"
        error={error?.date?.error}
        error_msg={error?.date?.msg} />

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

      <Select
        xs={12}
        md={10}
        color="light-gray"
        className="m-top-1"
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
        value={data_state.accompaniment}
        onChange={(event) => HandleChange("accompaniment", event.target.value)}
        error={error?.accompaniment?.error}
        error_msg={error?.accompaniment?.msg}
      />

      <Select
        xs={12}
        md={10}
        color="light-gray"
        className="p-top-1"
        label={traslate.FORM.THEFTINFO["STOLEN-OBJECTS"]}
        options={items_options}
        value={data_state.stolen_items}
        onChange={(event) => HandleChange("stolen_items", event.target.value)}
        error={error?.stolen_items?.error}
        error_msg={error?.stolen_items?.msg}
      />

      <Input
        xs={12}
        md={10}
        color="light-gray"
        type="number"
        className="p-top-1"
        label={traslate.FORM.THEFTINFO["STOLEN-CAPITAL"]}
        value={data_state.stolen_cash}
        onChange={(e) => HandleChange("stolen_cash", e.target.value)}
        error={error?.stolen_cash?.error}
        error_msg={error?.stolen_cash?.msg}
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
