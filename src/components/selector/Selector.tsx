import React from "react";
import {
    Grid,
    GridJustification,
    GridSize,
    GridWrap,
    InputAdornment,
    TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./selector.css";
import { BorderCA, ColorCA } from "../../style/type-style";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface SelectProps {
    id?: string;
    label?: string;
    msg?: string;
    icon?: React.ReactNode;
    error?: boolean;
    error_msg?: string;
    value?: string | undefined;
    inputValue?: string;
    options: Array<string | undefined>;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    required?: boolean;
    colorFont?: ColorCA;
    color?: ColorCA;
    onInputChange?: (
        event: React.ChangeEvent<{}>,
        value: string,
        reason: any
    ) => void;
    onChange?: (event: any, newValue: string | null) => void;
    freeSolo?: boolean;
    xs?: undefined | GridSize;
    sm?: undefined | GridSize;
    md?: undefined | GridSize;
    lg?: undefined | GridSize;
    xl?: undefined | GridSize;
    border?: BorderCA | undefined;
    justify?: GridJustification;
    wrap?: GridWrap;
}

const Selector = ({
    id,
    label,
    className,
    placeholder,
    error,
    error_msg,
    msg,
    icon,
    options,
    onChange,
    onInputChange,
    disabled,
    color = "light-gray",
    colorFont = "black",
    required,
    value,
    inputValue,
    wrap,
    justify = "center",
    border = "small",
    freeSolo,
    xs,
    sm,
    md,
    lg,
    xl,
}: SelectProps) => {
    return (
        <Grid
            container
            item
            id={id}
            wrap={wrap}
            justify={justify}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={`p-1 ${className}`}>
            <Autocomplete
                className={`text-field-container`}
                options={options}
                disableClearable
                freeSolo={freeSolo}
                fullWidth
                disabled={disabled}
                inputValue={inputValue}
                autoComplete
                value={value}
                onChange={onChange}
                onInputChange={onInputChange}
                renderInput={(params) => (
                    <TextField
                        label={label ? (label + (required ? "*" : "")) : undefined}
                        placeholder={placeholder}
                        helperText={error ? error_msg : msg}
                        FormHelperTextProps={{
                            className: (error ? "color-red" : `color-${colorFont}`) + " font-size-normal p-left-1",
                        }}
                        className={`text-field-container`}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            className: `border-${border}`,
                            style: {
                                border: `var(--border-${border})`,
                                backgroundColor: `var(--${color})`,
                                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                color: `var(--${colorFont})`,
                                textTransform: "capitalize"
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <div className="text-field-icon-start">
                                        {icon}
                                    </div>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <div className="text-field-icon-end">
                                        <ArrowDropDownIcon />
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />

        </Grid>
    );
};

export default Selector;

