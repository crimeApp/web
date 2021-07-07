import React from "react";/* 
import ptES from "dayjs/locale/es";
import "dayjs/locale/es"; */
import { Grid, GridSize } from "@material-ui/core";
import { BorderCA, ColorCA } from "../../style/type-style";
/*
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import es from 'date-fns/locale/es'
 */


interface DateTimeInputProps {
  id?: string;
  label?: string;
  msg?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: boolean;
  error_msg?: string;
  name?: string | undefined;
  value?: Date | number | null;
  placeholder?: string;
  className?: string;
  color?: ColorCA;
  colorFont?: ColorCA;
  onChange?: React.EventHandler<any>;
  maxLenght?: number;
  styleHelperText?: React.CSSProperties;
  xs?: undefined | GridSize;
  sm?: undefined | GridSize;
  md?: undefined | GridSize;
  lg?: undefined | GridSize;
  xl?: undefined | GridSize;
  border?: BorderCA | undefined;
  inputProps?: any;
  inputLabelProps?: any;
}

const DateTimeInput = ({
  id,
  label,
  className,
  value,
  placeholder,
  error,
  error_msg,
  msg,
  color = "white",
  colorFont = "black",
  onChange,
  name,
  inputProps,
  inputLabelProps,
  maxLenght = 20,
  border = "big",
  xs,
  sm,
  md,
  lg,
  xl,
}: DateTimeInputProps) => {

  return (
    <Grid
      item
      id={id}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={`m-top-2 m-bottom-2 ${className}`}
    >
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}  locale={es}>
        <KeyboardDatePicker
          disableFuture
          id="date-picker-dialog"
          label={label}
          format="dd/MM/yyyy"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          helperText={error ? error_msg : msg}
          FormHelperTextProps={{
            style: {
              color: error ? "var(--red)" : `var(--${colorFont})`,
              paddingLeft: "20px"
            }
          }}
          className={"text-field-container text-field-group"}
          InputLabelProps={{ ...inputLabelProps }}
          InputProps={{
            name: name,
            disableUnderline: true,
            autoComplete: "off",
            maxLenght: maxLenght,
            style: {
              border: `var(--border-${border})`,
              backgroundColor: `var(--${color})`,
              color: `var(--${colorFont})`
            },
            ...inputProps,
          }}
        />
      </MuiPickersUtilsProvider> */}
    </Grid>
  );
};

export default DateTimeInput;
