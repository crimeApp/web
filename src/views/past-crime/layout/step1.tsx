import React, { useState } from "react";
import { Grid, Button, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import MultipleSelect from "../../../components/multiple-select/multipleSelect";
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
  accompaniment: yup
    .mixed()
    .oneOf(accompaniment_options) 
    .required(),
  stolen_items: yup
    .mixed()
    .required(),
  stolen_cash: yup
    .number()
    .min(1)
    .max(99999999)
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
      alignItems="center">

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
        {...InputConstructor("place_description")}
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
      />

      <Select
        {...InputConstructor("accompaniment")}
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
      />

     <MultipleSelect
        {...InputConstructor("stolen_items")}
        label={traslate.FORM.THEFTINFO["STOLEN-OBJECTS"]}
        options={items_options}
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
    </Grid>
  );
};

export default PastCrimeStepOne;
