import React, { useState } from "react";
import { Grid, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";
import yup from "../../../utils/yup";
import { dniExp, hourExp } from "../../../utils/reg-exp";
import Map from "../../../components/map/Map";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import Input from "../../../components/input/Input";
import { ColorCA } from "../../../style/type-style";
import { attack_type_options, sex_options } from "../../../assets/options";

const schema = yup.object().shape({
  attack_type: yup.mixed().oneOf(attack_type_options).required().default(""),
  hour: yup.string().required().matches(hourExp).default(""),
  date: yup
    .date()
    .max(new Date().toLocaleDateString("en-Latn-US"))
    .required()
    .default(new Date()),
  geopoint: yup
    .object({
      lat: yup.number().min(-90).max(90).required().default(-31.43087168213775),
      lng: yup
        .number()
        .min(-180)
        .max(180)
        .required()
        .default(-64.21910252283733),
    })
    .required(),
  location: yup.string().required().default(""),
  place_description: yup.string().optional().max(50).default(""),
  full_name: yup
    .string()
    .transform((e) => e.toLowerCase())
    .optional()
    .max(15)
    .default(""),
  dni: yup.string().matches(dniExp).required().default(""),
  age: yup.number().max(100).min(12).optional().default(12),
  sex: yup.mixed().optional().default(""),
});

interface StepOneProps {
  data: any;
  children: any;
  handleNext: (data: any) => void;
  handleBack: (data: any) => void;
}

type schemaType = yup.InferType<typeof schema>;

const StepOne = ({ data, children, handleNext, handleBack }: StepOneProps) => {
  const [data_state, set_data] = useState<schemaType>({
    ...schema.getDefault(),
    ...data,
  });

  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) =>
    set_data((prevState: any) => ({ ...prevState, [name]: value }));

  const OnFoward = async () => {
    set_error({});
    console.log(data_state);
    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const InputConstructor = (name: string) => ({
    name,
    xs: 12 as GridSize,
    md: 6 as GridSize,
    //@ts-ignore
    value: data_state[name],
    className: "p-left-3 p-right-3 p-top-2",
    color: "light-gray" as ColorCA,
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
    onChange: (event: any) => HandleChange(name, event.target.value),
  });

  return (
    <Grid
      container
      item
      xs={12}
      md={5}
      direction="row"
      className="p-left-1 p-right-1 background-color-card-background"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      {children}

      <Map
        required
        xs={12}
        md={12}
        showSearch
        placeholder={"Escribe la dirección donde te atacaron"}
        label={traslate.FORM.THEFTINFO.LOCATION}
        onChange={(newValue, label) => {
          HandleChange("geopoint", newValue);
          HandleChange("location", label);
        }}
        error={error?.location?.error}
        error_msg={error?.location?.msg}
      />

      <Select
        {...InputConstructor("attack_type")}
        required
        label={traslate.FORM.THEFTINFO.THEFT}
        options={attack_type_options}
      />

      <Input
        {...InputConstructor("hour")}
        type="time"
        required
        label={traslate.FORM.THEFTINFO.TIME}
      />

      <Input
        {...InputConstructor("date")}
        type="date"
        placeholder="dd-mm-aa"
        required
        label={traslate.FORM.THEFTINFO.DATE}
      />

      <Input
        {...InputConstructor("dni")}
        required
        type="number"
        label={traslate.FORM.PERSONALINFO.DNI}
        value={data_state.dni}
        error_msg={
          error?.dni?.type === "matches"
            ? "El dni ingresado es incorrecto"
            : error?.dni?.msg
        }
      />

      <Input
        {...InputConstructor("full_name")}
        label={traslate.FORM.PERSONALINFO.NAME}
      />

      <Select
        {...InputConstructor("sex")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={sex_options}
      />

      <Input
        {...InputConstructor("age")}
        label={traslate.FORM.PERSONALINFO.AGE}

      />

      <Input
        {...InputConstructor("place_description")}
        label={"Descripción del lugar"}
        multiline
        rows={3}
      />

      <Grid
        container
        item
        md={6}
        xs={10}
        direction="row"
        className='p-top-2'
        justify="space-around"
      >
        <Button
          color="violet"
          xs={6}
          md={4}
          label={traslate.COMMON.BACK}
          className="p-1"
          onClick={handleBack}
        />

        <Button
          color="violet"
          xs={6}
          md={4}
          label={traslate.COMMON.NEXT}
          className="p-1"
          onClick={OnFoward}
        />
      </Grid>
    </Grid>
  );
};

export default StepOne;
