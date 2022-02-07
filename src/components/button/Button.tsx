import React from "react";
import { FormHelperText, Grid, GridSize } from "@material-ui/core";
import { BorderCA, ColorCA } from "../../style/type-style";

interface ButtonProps {
  label?: string;
  msg?: string;
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
  required?: boolean;
  iconRight?: React.ReactNode;
  error?: boolean;
  error_msg?: string;
  name?: string | undefined;
  value?: Date | string | number | undefined;
  multiline?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  placeholder?: string;
  className?: string;
  color?: ColorCA;
  colorFont?: ColorCA;
  disabled?: boolean;
  onClick?: React.EventHandler<any>;
  xs?: undefined | GridSize;
  sm?: undefined | GridSize;
  md?: undefined | GridSize;
  lg?: undefined | GridSize;
  xl?: undefined | GridSize;
  borderRadius?: BorderCA | undefined;
}

const Button = ({
  xs,
  sm,
  md,
  lg,
  xl,
  label,
  msg,
  error,
  error_msg,
  className,
  disabled,
  borderRadius = "small",
  children,
  color = "violet",
  colorFont = "white",
  onClick,
}: ButtonProps) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    className={`p-top-1 p-bottom-1  ${className}`}
  >
    <button
      disabled={disabled}
      style={{
        width: "100%",
        opacity: (disabled || error ) ? '0.7' : '1',
        borderRadius: `var(--border-${borderRadius})`,
        border: "0px"
      }}
      className={`background-color-${color} ${ disabled ? '' : 'hover'}`}
      onClick={onClick}
    >
      {label ? (
        <p className={`color-${colorFont} m-1 w500`}>{label}</p>
      ) : (
        children
      )}
    </button>
    <FormHelperText
        className={
          "p-left-1 font-size-small " + (error_msg ? "color-red" : "color-gray")
        }
      >
        {error_msg ?? msg}
      </FormHelperText>
  </Grid>
);

export default Button;
