import React from "react";
import {
  FormHelperText,
  Grid,
  GridSize,
  InputLabel,
  Slider,
} from "@material-ui/core";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

const DiscreteSlider = ({
  label,
  value,
  required,
  className,
  onChange,
  error,
  error_msg,
  msg,
  xs,
  sm,
  md,
  lg,
  xl,
}: {
  value?: number;
  error?: boolean;
  error_msg?: string;
  msg?: string;
  label: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
  color?: string;
  colorFont?: string;
  onChange?: (event: any, value: number | number[]) => void,
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}) => {

  return (
    <Grid
      item
      className={`select m-bottom-2 ${className}`}
      xs={xs}
      md={md}
      sm={sm}
      lg={lg}
      xl={xl}
    >
      <InputLabel>
        <p
          className={
            "first-letter-cap p-left-2 m-top-1 m-bottom-1 font-size-small w500 " +
            (error ? "color-red" : "color-black")
          }
        >
          {label} {required ? "*" : ""}
        </p>
      </InputLabel>
      <Slider
        onChange={onChange}
        getAriaValueText={valuetext}
        value={value}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="off"
        step={1}
        marks={marks}
        min={1}
        max={5}
      />
      <FormHelperText className={"p-left-1 font-size-normal" + (error_msg ? "color-red" : "color-gray")}>
            {error_msg ?? msg}
        </FormHelperText>
    </Grid>
  );
};

export default DiscreteSlider;
