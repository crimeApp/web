import React from "react";
import "./FormWrapper.css";
import { Box, Grid, LinearProgress } from "@material-ui/core";

export default function FormWrapper({
  steptitle,
  hide_progress,
  children,
  loading,
}) {
  return (
    <Box className="form-wrap-background">
      <Grid
        container
        direction="column"
        className="form-wrap"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <h3 className="form-wrap-subtitle">{steptitle}</h3>
        </Grid>

        <Grid item xs={10}>
          {hide_progress ? (
            <></>
          ) : (
              <LinearProgress className="form-wrap-progress" variant="determinate" value={loading} />
            )}
        </Grid>

        <Grid item xs={12} className="m-top-2">
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}
