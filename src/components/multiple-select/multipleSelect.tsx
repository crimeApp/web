import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormHelperText,
  MenuItem,
  Chip,
  Select,
  Grid,
  Input,
  GridSize,
  InputLabel,
} from "@material-ui/core";
import { BorderCA, ColorCA } from "../../style/type-style";

interface MultipleSelectProps {
  id?: string;
  label?: string;
  options?: string[] | any;
  msg?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: boolean;
  required?: boolean;
  error_msg?: string;
  name?: string | undefined;
  value?: string[];
  multiline?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  placeholder?: string;
  className?: string;
  color?: ColorCA;
  colorFont?: ColorCA;
  onChange?: React.EventHandler<any>;
  register?: any;
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
  multiple?: boolean;
  /* onChange?: ((event: React.ChangeEvent<{
    name?: string | Array<string> | undefined;
    value: unknown;
  }>, child: React.ReactNode) => void) */
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({
  id,
  value,
  label,
  required,
  options,
  className,
  placeholder,
  error,
  color,
  error_msg,
  msg,
  colorFont = "black",
  onChange,
  xs,
  sm,
  md,
  lg,
  xl,
}: MultipleSelectProps) => {
  const classes = useStyles();  
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
            <p className={"first-letter-cap p-left-2 m-top-1 m-bottom-1 font-size-small w400 " + (error ? "color-red" : "color-black")}>
                {label} {required ? "*" : ""}
            </p>
        </InputLabel>

      <Select
        multiple
        value={value ? value : []}
        onChange={onChange}
        style={{
          width: "100%",
          marginTop: "5px",
          height: "var(--height-medium)",
        }}
        disableUnderline={true}
        className={`color-${colorFont} background-color-${color} border-normal`}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option: any) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText
        className={
          "p-left-1 font-size-little " +
          (error_msg ? "color-red" : "color-gray")
        }
      >
        {error_msg ?? msg}
      </FormHelperText>
    </Grid>
  );
};

export default MultipleSelect;
