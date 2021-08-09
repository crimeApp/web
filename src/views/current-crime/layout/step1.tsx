import React, { useState } from "react";
import { Grid, Button, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import DiscreteSlider from "../../../components/slider/Slider";
import { ColorCA } from "../../../style/type-style";
import {
  attack_type_options,
  hour_options,
  place_options,
} from "../../../assets/options";

const schema = yup.object({
  attack_type: yup.mixed().oneOf(attack_type_options).required(),
  hour: yup.mixed().oneOf(hour_options).required(),
  place_description: yup.mixed().oneOf(place_options).required(),
  physical_damage: yup.number().max(5).optional(),
  emotional_damage: yup.number().max(5).optional(),
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
    physical_damage: 1,
    emotional_damage: 1,
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
    xs: 12 as GridSize,
    md: 10 as GridSize,
    //@ts-ignore
    value: data_state[name],
    color: "light-gray" as ColorCA,
    className: "m-top-1",
    onChange: (event: any) => HandleChange(name, event.target.value),
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
  });

  return (
    <Grid
      item
      xs={12}
      container
      className="p-1"
      justify="center"
      alignItems="center"
    >
      <Select
        {...InputConstructor("attack_type")}
        required
        label={traslate.FORM.THEFTINFO.THEFT}
        options={attack_type_options}
        msg='Robo: apropiación violenta de un bien ajeno. 
        Hurto: apropiación NO violenta.'
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
