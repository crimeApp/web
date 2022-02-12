import React, { useState } from "react";
import { Grid, GridSize } from "@material-ui/core";
import Button from "../../../components/button/Button";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import Input from "../../../components/input/Input";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";

import {
  age_options,
  sex_options,
  skin_options,
  height_options,
  hair_options,
} from "../../../assets/options";
import { ColorCA } from "../../../style/type-style";

const schema = yup.object({
  thief_age: yup.mixed().optional().default(''),
  thief_hair_color: yup.mixed().optional().default(''),
  thief_sex: yup.mixed().optional().default(''),
  thief_skin: yup.mixed().optional().default(''),
  thief_height: yup.mixed().optional().default(''),
  thief_company: yup.number().optional().default(0).max(10),
  thief_armed: yup.boolean().optional().default(false),
  thief_description: yup.string().optional().default('').max(50)
});

interface StepTwoProps {
  data: any;
  children: any;
  handleNext: (data: any) => void;
  handleBack: (data: any) => void;
}

const StepTwo = ({ data, children, handleNext, handleBack }: StepTwoProps) => {
  const [data_state, set_data] = useState({
    ...schema.getDefault(),
    ...data,
  });

  const [error, set_error] = useState<any>();

  const HandleChange = (name: string, value: any) =>
    set_data((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

  const OnFoward = async () => {
    set_error({});

    const resp = await Validator(data_state, schema);

    if (resp.err) return set_error(resp.data);

    return handleNext(resp.data);
  };

  const OnBackward = () => {
    return handleBack(data_state);
  };

  const InputConstructor = (name: string) => ({
    name,
    xs: 12 as GridSize,
    //@ts-ignore
    value: data_state[name],
    className: "p-left-1 p-right-1 p-top-2",
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
      className="p-2 background-color-white"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      {children}
      <Select
        {...InputConstructor("thief_age")}
        label={traslate.FORM.THEFTDETAILS.AGE}
        options={age_options}
      />
      <Select
        {...InputConstructor("thief_sex")}
        label={traslate.FORM.THEFTDETAILS.SEX}
        options={sex_options}
      />
      <Input
        {...InputConstructor("thief_company")}
        type="number"
        label={'Cantidad de cómplices y/o atacantes'}
        placeholder='0 (si estaba solo/a)'
      />
      <Select
        {...InputConstructor("thief_height")}
        label={traslate.FORM.THEFTDETAILS.HEIGHT}
        options={height_options}
      />
      <Select
        {...InputConstructor("thief_hair_color")}
        label={traslate.FORM.THEFTDETAILS.HAIR}
        options={hair_options}
      />
      <Select
        {...InputConstructor("thief_skin")}
        label={traslate.FORM.THEFTDETAILS.SKIN}
        options={skin_options}
      />
      <Input
        {...InputConstructor("thief_description")}
        multiline
        rows={'2'}
        maxlenght={50}
        label={'Descripción del atacante'}
      />
      <Switches
        xs={10}
        md={8}
        className="p-top-2 p-bottom-1"
        label={traslate.FORM.THEFTDETAILS.ARMED}
        value={data_state.thief_armed}
        onChange={(event: any) => HandleChange("thief_armed", event.target.checked)}
        error={error?.thief_armed?.error}
        error_msg={error?.thief_armed?.msg}
      />
      <Button
        color="violet"
        xs={6}
        label={traslate.COMMON.BACK}
        className="p-1"
        onClick={OnBackward}
      />

      <Button
        color="violet"
        xs={6}
        label={traslate.COMMON.NEXT}
        className="p-1"
        onClick={OnFoward}
      />
    </Grid>
  );
};

export default StepTwo;
