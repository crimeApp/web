import React, { useState } from "react";
import Map from "../../../components/map/Map";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";

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

const schema = yup.object({
  stolen_items: yup
    .mixed()
    .transform((e) => e.toLowerCase())
    .oneOf(items_options.map(e => e.toLowerCase()))
    .required("Completar la casilla"),
  stolen_cash: yup
    .number()
    .min(1)
    .max(99999999)
    .required("Completar la casilla"),
});

const PastCrimeStepFour = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    stolen_cash: "",
    stolen_items: "",
    position: {
      lat: 0,
      lng: 0,
    },
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
    handleBack(data);
  };

  return (
    <Grid
      container
      className="p-3"
      justify="center"
      alignItems="center">

      <Input
        xs={12}
        color="light-gray"
        type="number"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTINFO["STOLEN-CAPITAL"]}
        value={data_state.stolen_cash}
        onChange={(e) => HandleChange("stolen_cash", e.target.value)}
        error={error?.stolen_cash?.error}
        error_msg={error?.stolen_cash?.msg}
      />

      <Select
        xs={12}
        color="light-gray"
        className="p-top-1 p-bottom-1"
        label={traslate.FORM.THEFTINFO["STOLEN-OBJECTS"]}
        options={items_options}
        value={data_state.stolen_items}
        onChange={(e) => HandleChange("stolen_items", e.target.value)}
        error={error?.stolen_items?.error}
        error_msg={error?.stolen_items?.msg}
      />

      <Map
        xs={12}
        className="p-right-3 p-bottom-2"
        label={traslate.FORM.THEFTINFO.LOCATION}
        position={data_state.position}
        onChange={(newValue) => HandleChange("position", newValue)}
      />

      <Grid item className="m-top-2 m-bottom-2">
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

export default PastCrimeStepFour;



