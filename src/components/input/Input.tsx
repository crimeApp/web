import {
  Grid,
  GridSize,
  InputAdornment,
  TextField,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import { BorderCA, ColorCA } from "../../style/type-style";
import "./text-field.css";

interface InputProps {
  id?: string;
  label?: string;
  msg?: string;
  iconLeft?: React.ReactNode;
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
  type?: "number" | "text" | "password" | "email" | "date" | "time" | "color";
  color?: ColorCA;
  colorFont?: ColorCA;
  onChange?: React.EventHandler<any>;
  password?: boolean;
  register?: any;
  disabled?: boolean;
  maxlenght?: number;
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

const Input = ({
  id,
  label,
  className,
  placeholder,
  error,
  error_msg,
  msg,
  type,
  disabled,
  required,
  iconLeft,
  iconRight,
  inputProps,
  inputLabelProps,
  password,
  color = "white",
  colorFont = "black",
  maxlenght = 40,
  styleHelperText,
  onChange = () => null,
  value,
  multiline,
  rowsMax,
  rows,
  name,
  border = "small",
  xs,
  sm,
  md,
  lg,
  xl,
}: InputProps) => {

  const [visible, setVisibility] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState(value)
    , refInput = React.useRef<any>({ target: { name, value } })

  React.useEffect(() => {
    if (inputValue === value) return
    const delayDebounceFn = setTimeout(() => onChange(refInput.current), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

  React.useEffect(() => (inputValue === value) ? undefined : setInputValue(value), [value])

  return (
    <Grid
      item
      id={id}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={`p-top-2 p-bottom-1 ${className}`}
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

      <TextField
        value={inputValue}
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        disabled={disabled}
        type={
          password ?
            (visible ? type : "password")
            : type
        }
        fullWidth
        helperText={error ? error_msg : msg}
        error={error}
        FormHelperTextProps={{
          style: {
            color: error ? `color-red` : `var(--${colorFont})`,
            marginLeft: "15px",
            marginRight: "15px",
            fontSize: "var(--font-size-small)",
            ...styleHelperText,
          },
        }}
        placeholder={placeholder}
        onChange={(e) => {
          refInput.current = e;
          return e.target.value.length < maxlenght ? setInputValue(e.target.value) : null
        }}
        focused={placeholder ? true : false}
        className={`text-field-container text-field-group border-${border}`}
        required
        variant="standard"
        InputLabelProps={{ ...inputLabelProps }}
        InputProps={{
          name: name,
          disableUnderline: true,
          autoComplete: "off",
          maxlenght: maxlenght,
          className: `border-${border}`,
          style: {
            backgroundColor: `var(--${color})`,
            color: `var(--${colorFont})`,
          },
          startAdornment: (
            <InputAdornment position="start">
              <div className="text-field-icon-start">{iconLeft}</div>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <div className="text-field-icon-end">{iconRight}</div>
            </InputAdornment>
          ),
          ...inputProps,
        }}
      />
    </Grid>
  );
};
export default Input;
