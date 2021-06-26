import React from "react";
import "./FormWrapper.css";
import { Grid, LinearProgress } from "@material-ui/core";

export default function FormWrapper({
  title,
  subtitle,
  steptitle,
  hide_subtitle,
  hide_progress,
  children,
  loading,
}) {
  return (
    <Grid
      container
      direction="column"
      className="form-wrap m-top-3"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10} >
        <h2>{title}</h2>
        {hide_subtitle ? <div></div> : <p className="form-wrap-subtitle">{subtitle}</p>}
      </Grid>

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
      
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
}
