import React from "react";
import {
    Grid,
    GridJustification,
    GridSize,
    GridWrap,
    InputAdornment,
    TextField,
    /*InputLabel,
    FormControl,
    FormHelperText,
    MenuItem,
    Select
     */
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    options: Array<string | undefined>;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    colorFont?: ColorCA;
    color?: ColorCA;
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
    disabled,
    color = "white",
    colorFont = "black",
    value,
    wrap,
    justify = "center",
    border = "big",
    freeSolo,
    xs,
    sm,
    md,
    lg,
    xl
}: SelectProps) => {
    return (
        <Grid
            item
            container
            id={id}
            wrap={wrap}
            justify={justify}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={`m-top-3 m-bottom-3 ${className}`} >
            <Autocomplete
                className={`text-field-container text-field-group`}
                options={options}
                disableClearable
                freeSolo={freeSolo}
                fullWidth
                disablePortal
                disabled={disabled}
                autoSelect
                value={value}
                onChange={onChange}
                onInputChange={onChange}
                renderInput={(params) => (
                    <TextField
                        label={label}
                        placeholder={placeholder}
                        helperText={error ? error_msg : msg}
                        FormHelperTextProps={{
                            style: {
                                color: error ? "var(--red)" : `var(--${colorFont})`,
                                paddingLeft: "20px"
                            }
                        }}
                        className={`text-field-group`}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            className: `border-${border}`,
                            style: {
                                border: `var(--border-${border})`,
                                backgroundColor: `var(--${color})`,
                                color: `var(--${colorFont})`
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

            {/* <FormControl
                variant="outlined"
                error={error}
                className={`text-field-container `}
            >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    autoWidth
                    onChange={onChange}
                >
                    {options?.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </Select>
                {error ? (
                    <FormHelperText>{error_msg}</FormHelperText>
                ) : (
                        <FormHelperText>{msg}</FormHelperText>
                    )}
            </FormControl> */}
        </Grid>
    );
};

export default Selector;

/*
EXAMPLE
  <Selector
    label="Categoria"
    icon={"fas fa-search"}
    options={top100Films}
    value={category}
    className="m-top-3 m-bottom-3"
    msg="La categoria te permitira ser conocido por la comunidad"
    error={errors?.category.error}
    error_msg={errors?.category?.msg}
    onChange={(event, newValue) => set_category(newValue)}
  />
*/
