import React from "react";
import ptES from "dayjs/locale/es";
import "dayjs/locale/es";
import DayJsUtils from "@date-io/dayjs";
import { Grid, GridSize } from "@material-ui/core";

import { BorderCA, ColorCA } from "../../style/type-style";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  multiline?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  placeholder?: string;
  className?: string;
  type?: "number" | "text" | "password" | "email" | "date";
  color?: ColorCA;
  colorFont?: ColorCA;
  onChange?: React.EventHandler<any>;
  register?: any;
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
  placeholder,
  error,
  error_msg,
  msg,
  type,
  inputProps,
  inputLabelProps,
  color = "white",
  colorFont = "black",
  maxLenght = 20,
  styleHelperText,
  onChange,
  multiline,
  rowsMax,
  rows,
  name,
  border = "big",
  xs,
  sm,
  md,
  lg,
  xl,
}: DateTimeInputProps) => {
  const [value, setValue] = React.useState<Date | null>(null);

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
      <MuiPickersUtilsProvider locale={ptES} utils={DayJsUtils}>
        <KeyboardDatePicker
          clearable
          label={label}
          disableFuture
          value={value}
          placeholder="10/10/2018"
          onChange={(date: any) => setValue(date)}
          className={"text-field-container text-field-group"}
          minDate={new Date()}
          format="dd/mm/yyyy"
          error={error}
          helperText={error ? error_msg : msg}
          FormHelperTextProps={{
            style: {
              color: error ? `var(--red)` : `var(--${colorFont})`,
              marginLeft: "15px",
              marginRight: "15px",
              ...styleHelperText,
            },
          }}
          autoOk
          variant="inline"
          inputVariant="filled"
          InputAdornmentProps={{ position: "end" }}
          InputProps={{
            name: name,
            disableUnderline: true,
            autoComplete: "off",
            style: {
              border: `var(--border-${border})`,
              backgroundColor: `var(--${color})`,
              color: `var(--${colorFont})`,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default DateTimeInput;
