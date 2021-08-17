import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "../../../components/button/Button";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import Input from "../../../components/input/Input";
import Switches from "../../../components/switch/Switch";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import DiscreteSlider from "../../../components/slider/Slider";
import {
  age_options,
  sex_options,
  skin_options,
  height_options,
  hair_options,
} from "../../../assets/options";

const schema = yup.object({
  thief_age: yup.mixed().optional().default(''),
  thief_height: yup.mixed().optional().default(''),
  thief_sex: yup.mixed().optional().default(''),
  thief_skin: yup.mixed().optional().default(''),
  thief_hair: yup.mixed().optional().default(''),
  agressiveness: yup.number().optional().default(1),
  armed: yup.boolean().optional().default(false),
  company: yup.number().optional().default(1),
  description: yup.string().optional().default('')
});

const StepTwo = ({ data, children, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({
    ...schema.getDefault(),
    ...data,
  });

  const [error, set_error] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({
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

  const InputConstructor = (name) => ({
    name,
    xs: 10,
    md: 8,
    value: data_state[name],
    color: "light-gray",
    className: "p-1",
    onChange: (event) => HandleChange(name, event.target.value),
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
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
        type="number"
        label={traslate.FORM.THEFTINFO.DATE}
        {...InputConstructor("company")}
      />

      <Select
        {...InputConstructor("thief_height")}
        label={traslate.FORM.THEFTDETAILS.HEIGHT}
        options={height_options}
      />

      <Select
        {...InputConstructor("thief_hair")}
        label={traslate.FORM.THEFTDETAILS.CLOTHING}
        options={hair_options}
      />

      <Select
        {...InputConstructor("thief_skin")}
        label={traslate.FORM.THEFTDETAILS.SKIN}
        options={skin_options}
      />

      <DiscreteSlider
        required
        xs={10}
        md={8}
        value={data_state.agressiveness}
        onChange={(event, newValue) =>
          HandleChange("agressiveness", newValue)
        }
        label={traslate.FORM.THEFTINFO["PHYSICAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["PHYSICAL-EXPLANATION"]}
      />

      <Switches
        xs={10}
        md={8}
        className="p-top-1 p-bottom-1"
        label={traslate.FORM.THEFTDETAILS.COMPLAINT}
        value={data_state.armed}
        onChange={(event) => HandleChange("armed", event.target.checked)}
        error={error?.armed?.error}
        error_msg={error?.armed?.msg}
      />

      <Grid container md={8} xs={10} direction="row" justify="space-around">
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

export default StepTwo;
