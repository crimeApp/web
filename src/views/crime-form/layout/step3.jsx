import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import yup from "../../../utils/yup";
import Select from "../../../components/select/Select";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import DiscreteSlider from "../../../components/slider/Slider";
import { accompaniment_options, place_options } from "../../../assets/options";

const schema = yup.object({
  place_description: yup.mixed().default(''),
  accompaniment:  yup.mixed().default(''),
  physical_damage: yup.number().optional().default(1),
  emotional_damage: yup.number().optional().default(1),
});

const StepThree = ({ data, handleNext, handleBack }) => {
  const [data_state, set_data] = useState({

    ...data,
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
    xs: 12,
    md: 10,
    value: data_state[name],
    color: "light-gray",
    className: "m-top-1",
    onChange: (event) => HandleChange(name, event.target.value),
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
  });

  return (
    <>
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

      <Grid item className="m-top-1 m-bottom-2">
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
    </>
  );
};

export default StepThree;
