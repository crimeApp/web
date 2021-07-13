import React from "react";
import { FormHelperText, Grid, GridSize, InputLabel, MenuItem, Select as SelectMUI } from "@material-ui/core";

const Select = ({
    options,
    label,
    value,
    onChange,
    className,
    color = "white",
    colorFont = "black",
    xs,
    sm,
    md,
    lg,
    xl,
    error,
    error_msg,
    helper,
}: {
    value: string,
    options?: string[],
    label: string,
    color?: string,
    colorFont?: string,
    className?: string,
    onChange?: ((event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, child: React.ReactNode) => void),
    xs?: GridSize,
    sm?: GridSize,
    md?: GridSize,
    lg?: GridSize,
    xl?: GridSize,
    error?: boolean,
    error_msg?: string,
    helper?: string,
}) => {

    return <Grid item className={`select ${className} m-bottom-2`} xs={xs} md={md} sm={sm} lg={lg} xl={xl} >
        <InputLabel>
            <p className="first-letter-cap color-black w800">{label}</p>
        </InputLabel>
        <SelectMUI
            style={{
                width: "100%",
                marginTop: "7px",
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
        {
            helper || error ? <FormHelperText>
                {error ? <p style={{
                    fontSize: "var(--font-size-small)",
                    paddingLeft: "10px",
                    color: "var(--red)",
                    margin: "0px"
                }}>{error_msg}</p> :
                    <p style={{
                        fontSize: "var(--font-size-small)",
                        paddingLeft: "10px",
                        margin: "0px"
                    }}>{helper}</p>}
            </FormHelperText>
                : null
        }
    </Grid>
}

export default Select;

/*
<Select
        xs={12}
        color="light-gray"
        className="m-top-1 m-bottom-1"
        label={traslate.FORM.THEFTINFO.THEFT}
        value={data_state.attack_type}
        onChange={(event) => HandleChange("attack_type", event.target.value)}
        options={attack_type_options}
        helper="halooo"
        error={error?.attack_type?.error}
        error_msg={error?.attack_type?.msg}
      />
*/