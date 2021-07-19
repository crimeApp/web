import React from "react";
import { FormHelperText, Grid, GridSize, InputLabel, MenuItem, Select as SelectMUI } from "@material-ui/core";

const Select = ({
    options,
    label,
    value,
    color = "white",
    colorFont = "black",
    onChange,
    className,
    error,
    error_msg,
    msg,
    xs,
    sm,
    md,
    lg,
    xl
}: {
    value?: string,
    options?: string[],
    error?: boolean,
    error_msg?: string,
    msg?: string,
    label: string,
    className?: string,
    color?: string,
    colorFont?: string,
    onChange?: ((event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, child: React.ReactNode) => void),
    xs?: GridSize,
    sm?: GridSize,
    md?: GridSize,
    lg?: GridSize,
    xl?: GridSize,
}) => {

    return <Grid item className={`select m-bottom-2 ${className}`} xs={xs} md={md} sm={sm} lg={lg} xl={xl} >
        <InputLabel>
            <p className={"first-letter-cap  color-black w800 " + (error ? "color-red" : "")}>{label}</p>
        </InputLabel>
        <SelectMUI
            style={{
                width: "100%",
                marginTop: "5px",
                height: "var(--height-normal-size)"
            }}
            disableUnderline={true}
            className={ `color-${colorFont} background-color-${color} border-normal`}
            value={value}
            onChange={onChange}
           MenuProps={{
                PaperProps: {
                    style: {
                        backgroundColor: `var(--color-${color})`
                    }
                }
            }}
        >
            {
                options?.map(opt => <MenuItem
                    key={opt}
                    value={opt}
                    className={`background-color-${color}`}
                >
                    <p className={`p-left-3 color-${colorFont}`}>{opt}</p>
                </MenuItem>)
            }
        </SelectMUI>
        <FormHelperText className={"p-left-1 font-size-little " + (error_msg ? "color-red" : "color-gray")}>
            {error_msg ?? msg}
        </FormHelperText>
    </Grid>
}

export default Select;
