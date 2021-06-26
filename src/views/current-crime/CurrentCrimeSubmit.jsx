import React from "react";
import { Button, Grid } from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";

const CurrentCrimeSubmit = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Button variant="contained" color="primary" href="/">
          {traslate["CONFIRMATION-DIALOG"]["BUTTON-TEXT"]}
        </Button>
      </Grid>
      <img alt="CurrentCrimeSubmit" src={process.env.PUBLIC_URL + "/assets/logos/SubmitImage.png"} />
    </Grid>
  );
};

export default CurrentCrimeSubmit;