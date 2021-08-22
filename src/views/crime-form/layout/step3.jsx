import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import yup from "../../../utils/yup";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import DiscreteSlider from "../../../components/slider/Slider";
import { accompaniment_options, place_options } from "../../../assets/options";

const schema = yup.object({
  place_description: yup.mixed().default(''),
  accompaniment: yup.mixed().default(''),
  physical_damage: yup.number().optional().default(1),
  emotional_damage: yup.number().optional().default(1),
});

const StepThree = ({ data, children, handleNext, handleBack }) => {
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
    //@ts-ignore
    value: data_state[name],
    className: "p-3",
    color: "light-gray",
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
    onChange: (event) => HandleChange(name, event.target.value),
  });

  return (
    <Grid
      container
      item
      xs={12}
      md={5}
      direction="row"
      className="p-1 background-color-card-background"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={12} md={6} className="p-2">
        {children}
      </Grid>

      <Select
        {...InputConstructor("place_description")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={place_options}
      />

      <Select
        {...InputConstructor("accompaniment")}
        label={traslate.FORM.PERSONALINFO.SEX}
        options={accompaniment_options}
        required
      />

      <DiscreteSlider
        required
        value={data_state.physical_damage}
        onChange={(event, newValue) =>
          HandleChange("physical_damage", newValue)
        }
        label={traslate.FORM.THEFTINFO["PHYSICAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["PHYSICAL-EXPLANATION"]}
      />

      <DiscreteSlider
        required
        value={data_state.emotional_damage}
        label={traslate.FORM.THEFTINFO["EMOTIONAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["EMOTIONAL-EXPLANATION"]}
        onChange={(event, newValue) =>
          HandleChange("emotional_damage", newValue)
        }
      /> 

      <Grid
        container
        item
        md={6}
        xs={10}
        direction="row"
        className='p-top-1'
        justify="space-around"
      >
        <Button
          color="violet"
          xs={6}
          md={4}
          label={traslate.COMMON.BACK}
          className="p-1"
          onClick={OnBackward}
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

export default StepThree;
