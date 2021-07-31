import React, { useState } from "react";
import { Grid, Button, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
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
  place_description: yup
    .mixed()
    .oneOf(place_options)
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
    place_description: "",
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

      <Select
        {...InputConstructor("hour")}
        label={traslate.FORM.THEFTINFO.TIMEFRACTION}
        options={hour_options}
        required
      />
      
      <Select
        {...InputConstructor("place_description")}
        label={traslate.FORM.THEFTINFO["PLACE-DESCRIPTION"]}
        options={place_options}
        required
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

export default CurrentCrimeStepOne;
