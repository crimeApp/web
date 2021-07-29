import React, { useState } from "react";
import { Grid, Button, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import MultipleSelect from "../../../components/selector/Selector";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import { ColorCA } from "../../../style/type-style";

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
    .required(),
  hour: yup
    .mixed()
    .required(),
  date: yup
    .date()
    .min(new Date('01/01/2010')),
  place_description: yup
    .mixed(),
  accompaniment: yup
    .mixed(),
  stolen_items: yup
    .mixed()
    .required(),
  stolen_cash: yup
    .number()
    .required(),
});

/*
yup.object().shape({ 
    comment: yup.string(),
})
 */

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
    stolen_items: [],
    ...data,
  });

  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) => set_data((prevState: any) => ({ ...prevState, [name]: value }));



  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const InputConstructor = (name: string) => ({
    name,
    xs: 12 as GridSize,
    md: 10 as GridSize,
    //@ts-ignore
    value: data_state[name],
    color: "light-gray" as ColorCA,
    className: "m-top-1",
    onChange: (event: any) => HandleChange(name, event.target.value),
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg
  })

  return (
    <Grid
      item
      xs={12}
      container
      className="p-1"
      justify="center"
      alignItems="center" >
      <Select
        {...InputConstructor("attack_type")}
        required
        label={traslate.FORM.THEFTINFO.THEFT}
        options={attack_type_options}
      />
      <Input
        type='date'
        required
        label={traslate.FORM.THEFTINFO.DATE}
        {...InputConstructor("date")}
      />
      <Select
        {...InputConstructor("hour")}
        label={traslate.FORM.THEFTINFO.TIMEFRACTION}
        options={hour_options}
      />
      <Select
        {...InputConstructor("place_options")}
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
      />
      <Select
        {...InputConstructor("accompaniment")}
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
      />

      <MultipleSelect
        options={items_options}
        xs={12}
        md={10}
        onChange={(event) => HandleChange("stolen_items", event.target.value)}
        placeholder={'Ingrese los items robados'}
        color="light-gray"
        className="p-top-1"
        label={traslate.FORM.THEFTINFO["STOLEN-OBJECTS"]}
        value={data_state.stolen_items}
        error={error?.stolen_items?.error}
        error_msg={error?.stolen_items?.msg}
      />
      <Input
        {...InputConstructor("stolen_cash")}
        type="number"
        required
        label={traslate.FORM.THEFTINFO["STOLEN-CAPITAL"]}
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
    </Grid >
  );
};

export default PastCrimeStepOne;
