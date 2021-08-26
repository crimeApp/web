import React from "react";
import { Grid } from "@material-ui/core";
import Button from "../../components/button/Button";
import traslate from "../../assets/traslate/es.json";

const AgreeStep = ({
  data,
  error,
  isLoading,
  handleSubmit,
  handleNext,
  handleBack
}) => {

  const OnAgree = (data) => {
    return handleNext(data);
  };

  const OnDisagree = () => {
    handleSubmit(data);
    handleBack(data);
  };

  return (
    <Grid
      container
      item
      md={6}
      xs={12}
      className="p-2 m-top-2 border-normal background-color-card-background"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={10}>
        <h2>{traslate["FORM"]["INTRO"]}</h2>
        <p className="w500">{traslate.FORM.EXPLANATION1}</p>
        <p className="w500">{traslate.FORM.EXPLANATION2}</p>
        <p className="w800">{traslate.FORM.THANKS}</p>
      </Grid>

      <Grid
        container
        item
        md={6}
        xs={10}
        direction="row"
        className="p-top-1"
        justify="space-around"
      >
        <Button
          color="violet"
          xs={6}
          md={4}
          label={traslate.COMMON.CANCEL}
          className="p-1"
          onClick={OnDisagree}
        />

        <Button
          color="violet"
          xs={6}
          md={4}
          label={traslate.COMMON.NEXT}
          className="p-1"
          onClick={OnAgree}
        />
      </Grid>

     {/*  <Grid item xs={8} className="m-top-2 m-bottom-2">
        {error && <Alert severity="error">{traslate["COMMON"]["ERROR"]}</Alert>}
        {isLoading && (
          <Alert>
            Aguarda por favor un segundo mientras procesamos los datos que
            completaste anteriormente.
          </Alert>
        )}
      </Grid> */}
    </Grid>
  );
};

export default AgreeStep;
