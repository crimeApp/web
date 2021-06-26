import React, { useState } from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const RadioButtons = ({ label, options, className, xs, sm, md, lg, xl }) => {
  const [value, setValue] = useState(options[0].value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={`${className}`}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={label}
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio color="default" />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>

  );
}

export default RadioButtons;
