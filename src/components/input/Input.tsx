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
    type?: "number" | "text" | "password" | "email" | "date";
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
    iconLeft,
    iconRight,
    inputProps,
    inputLabelProps,
    color = "white",
    colorFont = "black",
    maxlenght = 20,
    styleHelperText,
    onChange,
    value,
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
}: InputProps) => {
    return (
        <Grid
            item
            id={id}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={`p-top-1 p-bottom-1 ${className}`}
        >
            <InputLabel>
                <p className={"first-letter-cap p-left-2 m-top-1 m-bottom-1 font-size-small w400 " + (error ? "color-red" : "color-black")}>{label}</p>
            </InputLabel>

            <TextField
                value={value}
                multiline={multiline}
                rowsMax={rowsMax}
                rows={rows}
                type={type}
                fullWidth
                helperText={error ? error_msg : msg}
                error={error}
                FormHelperTextProps={{
                    style: {
                        color: error ? `color-red` : `var(--${colorFont})`,
                        marginLeft: "15px",
                        marginRight: "15px",
                        fontSize: "var(--font-size-little)",
                        ...styleHelperText
                    }
                }}
                placeholder={placeholder}
                onChange={onChange}
                focused={placeholder ? true : false}
                className={`text-field-container text-field-group`}
                required
                variant="standard"
                InputLabelProps={{ ...inputLabelProps }}
                InputProps={{
                    name: name,
                    disableUnderline: true,
                    autoComplete: "off",
                    maxlenght: maxlenght,
                    style: {
                        border: `var(--border-${border})`,
                        backgroundColor: `var(--${color})`,
                        color: `var(--${colorFont})`
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <div className="text-field-icon-start">
                                {iconLeft}
                            </div>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <div className="text-field-icon-end">
                                {iconRight}
                            </div>
                        </InputAdornment>
                    ),
                    ...inputProps,
                }}
            />
        </Grid>
    );
};
export default Input;