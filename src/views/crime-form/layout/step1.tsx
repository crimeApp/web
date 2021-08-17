import React, { useState } from "react";
import { Grid, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";
import yup from "../../../utils/yup";
import { dniExp } from "../../../utils/reg-exp";
import Map from "../../../components/map/Map";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import Input from "../../../components/input/Input";
import { ColorCA } from "../../../style/type-style";
import { attack_type_options, sex_options } from "../../../assets/options";

const schema = yup.object().shape({
  attack_type: yup.mixed().oneOf(attack_type_options).required().default(""),
  date_hour: yup
    .date()
    .min(new Date("01/01/2010"))
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
  //location: yup.string().min(3).max(100).required().default(""),
  victim_victim_full_name: yup
    .string()
    .transform((e) => e.toLowerCase())
    .optional()
    .default(""),
  victim_dni: yup.string().matches(dniExp).required().default(""),
  victim_age: yup.number().max(100).min(12).optional().default(12),
  victim_sex: yup.mixed().optional().default(""),
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
    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const InputConstructor = (name: string) => ({
    name,
    xs: 10 as GridSize,
    md: 8 as GridSize,
    //@ts-ignore
    value: data_state[name],
    className: "p-1",
    color: "light-gray" as ColorCA,
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
    onChange: (event: any) => HandleChange(name, event.target.value),
  });

  return (
    <Grid
      item
      xs={12}
      md={6}
      container
      className="background-color-card-background"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={10} md={6} className='p-3'>
        {children}
      </Grid>

      <Map
        required
        xs={10}
        md={8}
        size="big"
        showSearch
        justify="center"
        label={traslate.FORM.THEFTINFO.LOCATION}
        onChange={(newValue, label) => {
          HandleChange("geopoint", newValue);
          HandleChange("location", label);
        }}
        error={error?.geopoint?.error}
        error_msg={error?.geopoint?.msg}
      />

      <Select
        {...InputConstructor("attack_type")}
        required
        label={traslate.FORM.THEFTINFO.THEFT}
        options={attack_type_options}
        /* msg="Robo: apropiación violenta de un bien ajeno. 
    Hurto: apropiación NO violenta." */
      />

      <Input
        {...InputConstructor("date_hour")}
        type="date"
        required
        label={traslate.FORM.THEFTINFO.DATE}
      />

      <Input
        {...InputConstructor("victim_dni")}
        required
        type="number"
        label={traslate.FORM.PERSONALINFO.DNI}
        value={data_state.victim_dni}
        error_msg={
          error?.victim_dni?.type === "matches"
            ? "El dni ingresado es incorrecto"
            : error?.victim_dni?.msg
        }
      />

      <Input
        label={traslate.FORM.PERSONALINFO.NAME}
        {...InputConstructor("victim_full_name")}
      />

      <Select
        {...InputConstructor("victim_sex")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={sex_options}
      />

      <Input
        label={traslate.FORM.PERSONALINFO.AGE}
        {...InputConstructor("victim_age")}
      />

      <Grid container md={6} xs={10} direction="row" justify="space-around">
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
