import React from "react";
import { Grid, GridSize} from "@material-ui/core";
import { BorderCA, ColorCA } from "../../style/type-style";

interface AlertProps {
  label?: string;
  msg?: string;
  color?: ColorCA;
  className?: string;
  colorFont?: ColorCA;
  name?: string | undefined;
  value?: string | number | undefined;
  onClick?: React.EventHandler<any>;
  xs?: undefined | GridSize;
  sm?: undefined | GridSize;
  md?: undefined | GridSize;
  lg?: undefined | GridSize;
  xl?: undefined | GridSize;
  borderRadius?: BorderCA | undefined;
  border?: boolean;
}

const Alert = ({
  xs,
  sm,
  md,
  lg,
  xl,
  label,
  className,
  border = false,
  borderRadius = "small",
  color = "violet",
  colorFont = "white",
  onClick,
}: AlertProps) => (
  <Grid
    item
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    className={`p-top-1 p-bottom-1  ${className}`}
  >
    
  </Grid>
);

export default Alert;
