import React from "react";
import {
  FormHelperText,
  Grid,
  GridSize,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
} from "@material-ui/core";
import { BorderCA } from "../../style/type-style";

const Select = ({
  options,
  label,
  value,
  color = "white",
  colorFont = "black",
  required,
  onChange,
  className,
  error,
  border = "small",
  error_msg,
  msg,
  xs,
  sm,
  md,
  lg,
  xl,
}: {
  value?: string;
  options?: string[];
  error?: boolean;
  error_msg?: string;
  msg?: string;
  label: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
  color?: string;
  border?: BorderCA;
  colorFont?: string;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}) => {
  return (
    <Grid
      item
      className={`p-top-1 p-bottom-1 ${className}`}
      xs={xs}
      md={md}
      sm={sm}
      lg={lg}
      xl={xl}
    >
      <InputLabel>
        <p
          className={
            "first-letter-cap p-left-2 font-size-small w400 " +
            (error ? "color-red" : "color-black")
          }
        >
          {label} {required ? "*" : ""}
        </p>
      </InputLabel>
      <SelectMUI
        required
        style={{
          width: "100%",
          marginTop: "5px",
          height: "var(--height-normal-size)",
        }}
        disableUnderline={true}
        className={`color-${colorFont} background-color-${color} border-${border}`}
        value={value}
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: `var(--color-${color})`,
            },
          },
        }}
      >
        {options?.map((opt) => (
          <MenuItem
            key={opt}
            value={opt}
            className={`background-color-${color}`}
          >
            <p className={`p-left-3 color-${colorFont} first-letter-cap`}>
              {opt}
            </p>
          </MenuItem>
        ))}
      </SelectMUI>
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

export default Select;
