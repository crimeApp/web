import React from "react";
import {
  Grid,
  GridSize,
  InputLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";

interface CheckBoxProps {
  id?: string;
  label?: string;
  msg?: string;
  required?: boolean;
  error?: boolean;
  error_msg?: string;
  name?: string | undefined;
  value: string[];
  options?: string[];
  className?: string;
  onChange?: (value: string[]) => void;
  styleHelperText?: React.CSSProperties;
  xs?: undefined | GridSize;
  sm?: undefined | GridSize;
  md?: undefined | GridSize;
  lg?: undefined | GridSize;
  xl?: undefined | GridSize;
}

const MultipleCheckBox = ({
  id,
  label,
  className,
  required,
  options = [],
  error,
  error_msg,
  msg,
  onChange = () => null,
  value = [],
  xs,
  sm,
  md,
  lg,
  xl,
}: CheckBoxProps) => {

  return (
    <Grid
      item
      id={id}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      container
      justify='center'
      className={`p-top-2 p-bottom-2 ${className}`}
    >
      <InputLabel>
        <p
          className={
            "m-top-1 m-bottom-1 font-size-normal w400 " +
            (error ? "color-red" : "color-black")
          }
        >
          {label} {required ? "*" : ""}
        </p>
      </InputLabel>

      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {options.map((opt, index) => (
          <Grid key={index} item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={value.includes(opt)}
                  onChange={() =>
                    value.includes(opt)
                      ? onChange(value.filter((o) => o !== opt))
                      : onChange([...value, opt])
                  }
                />
              }
              label={opt}
            />
          </Grid>
        ))}
      </Grid>

      <FormHelperText
        className={
          "p-left-1 font-size-small " + (error_msg ? "color-red" : "color-gray")
        }
      >
        {error_msg ?? msg}
      </FormHelperText>
    </Grid>
  );
};

export default MultipleCheckBox;
