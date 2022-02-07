import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import yup from "../../../utils/yup";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";
import traslate from "../../../assets/traslate/es.json";
import Validator from "../../../utils/validator";
import Input from "../../../components/input/Input";
import MultipleCheckBox from "../../../components/checkbox/Checkbox";
import DiscreteSlider from "../../../components/slider/Slider";
import { accompaniment_options, items_options } from "../../../assets/options";

const schema = yup.object({
  thief_agressiveness: yup.number().optional().default(1),
  victim_company: yup.mixed().optional().default(''),
  stolen_items: yup.array().of(yup.string().optional().default('')),
  other_items: yup.string().optional().default(''),
  physical_damage: yup.number().optional().default(1),
  emotional_damage: yup.number().optional().default(1),
  comment: yup.string().optional().default('').max(250)
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
    xs: 12,
    //@ts-ignore
    value: data_state[name],
    className: "p-left-1 p-right-1 p-top-2",
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
      className="p-left-2 p-right-2 background-color-white"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      {children}
      <MultipleCheckBox
        {...InputConstructor("stolenItems")}
        label={'¿Qué te robaron?'}
        onChange={(newValue) => HandleChange("stolenItems", newValue)}
        options={items_options} />
      <Input
        {...InputConstructor("other_items")}
        label={'¿No está en la lista? Agregalo acá'}
      />
      <Select
        {...InputConstructor("victim_company")}
        label={'¿Estabas sólo o acompañado?'}
        options={accompaniment_options}
        required
      />
      <DiscreteSlider
        required
        {...InputConstructor("physical_damage")}
        onChange={(event, newValue) =>
          HandleChange("physical_damage", newValue)
        }
        label={traslate.FORM.THEFTINFO["PHYSICAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["PHYSICAL-EXPLANATION"]}
      />
      <DiscreteSlider
        required
        {...InputConstructor("emotional_damage")}
        label={traslate.FORM.THEFTINFO["EMOTIONAL-DAMAGE"]}
        msg={traslate.FORM.THEFTINFO["EMOTIONAL-EXPLANATION"]}
        onChange={(event, newValue) =>
          HandleChange("emotional_damage", newValue)
        }
      />
      <DiscreteSlider
        required
        {...InputConstructor("thief_agressiveness")}
        onChange={(event, newValue) =>
          HandleChange("thief_agressiveness", newValue)
        }
        label={'¿Qué tan agresivo fue el atacante?'}
        msg={'1- Inofensivo. 5- Muy agresivo'}
      />
      <Input
        {...InputConstructor("comment")}
        type="string"
        multiline
        rows={3}
        maxlenght={250}
        label={'¿Algo que quieras agregar sobre el ataque?'}
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

export default StepThree;
