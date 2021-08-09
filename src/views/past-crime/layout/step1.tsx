import React, { useState } from "react";
import { Grid, Button, GridSize } from "@material-ui/core";
import Select from "../../../components/select/Select";
import MultipleSelect from "../../../components/multiple-select/multipleSelect";
import DiscreteSlider from "../../../components/slider/Slider";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import { ColorCA } from "../../../style/type-style";
import {
  attack_type_options,
  items_options,
  hour_options,
  place_options,
  accompaniment_options,
} from "../../../assets/options";

const schema = yup.object({
  attack_type: yup.mixed().oneOf(attack_type_options).required(),
  hour: yup.mixed().oneOf(hour_options).required(),
  date: yup.date().max(new Date()).min(new Date("01/01/2010")).required(),
  place_description: yup.mixed().oneOf(place_options).required(),
  accompaniment: yup.mixed().oneOf(accompaniment_options).required(),
  stolen_items: yup.array().required(),
  physical_damage: yup.number().min(1).max(5).required(),
  emotional_damage: yup.number().min(1).max(5).required(),
});

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
    emotional_damage: 1,
    physical_damage: 1,
    stolen_items: undefined,
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
      />

      <Input
        type="date"
        required
        label={traslate.FORM.THEFTINFO.DATE}
        {...InputConstructor("date")}
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

      <Select
        {...InputConstructor("accompaniment")}
        label={traslate.FORM.THEFTINFO.COMPANY}
        options={accompaniment_options}
        required
      />

      <MultipleSelect
        {...InputConstructor("stolen_items")}
        label={traslate.FORM.THEFTINFO["STOLEN-OBJECTS"]}
        options={items_options}
        required
      />

      <DiscreteSlider
        required
        xs={12}
        md={10}
        value={data_state.physical_damage}
        onChange={(event, newValue) =>
          HandleChange("physical_damage", newValue)
        }
        label={traslate.FORM.THEFTINFO["PHYSICAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["PHYSICAL-EXPLANATION"]}
      />

      <DiscreteSlider
        required
        xs={12}
        md={10}
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

export default PastCrimeStepOne;
