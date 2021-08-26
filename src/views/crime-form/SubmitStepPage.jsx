import React from "react";
import { Grid, Link } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import Button from "../../components/button/Button";
import traslate from "../../assets/traslate/es.json";

const SubmitStep = ({ data, error, isLoading, handleSubmit, handleBack }) => {
  const OnBackward = () => {
    return handleBack(data);
  };

  const OnSubmit = (error, isLoading) => {
    return handleSubmit(data);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Grid
      container
      item
      xs={12}
      md={12}
      direction="column"
      justify="center"
      alignItems="center"
      className="p-bottom-2"
    >
      <Grid item xs={12} md={10}>
        <h3 className="m-bottom-1 p-left-3">
          ¿Estás listo/a para enviar los datos?
        </h3>
      </Grid>

      <Grid item xs={12} md={10}>
        <p className="w500 p-left-3">
          Este formulario NO es una denuncia policial, por lo que es necesario
          visitar la unidad jurídica para reportar a las autoridades sobre el
          siniestro.
        </p>
      </Grid>

      <Grid
        container
        item
        md={12}
        xs={12}
        direction="row"
        className="p-top-2"
        justify="space-around"
      >
        <Grid item xs={5} md={5}>
          <Button
            color="violet"
            label={traslate.COMMON.BACK}
            onClick={OnBackward}
          />
        </Grid>

        <Grid item xs={5} md={5}>
          <Button
            color="violet"
            label={traslate.COMMON.CONFIRM}
            onClick={OnSubmit}
          ></Button>
        </Grid>
      </Grid>

      <Grid item xs={8} className="m-top-2 m-bottom-2">
        {error && !isLoading && (
          <Alert severity="error">
            {traslate["COMMON"]["ERROR"]}
            <Link className="color-black p-1" href={"/"}>
              Volver al inicio.
            </Link>
          </Alert>
        )}
        {isLoading && <Alert>{traslate["COMMON"]["LOADING"]}</Alert>}
        {!error && !isLoading && (
          <Alert severity="success">
            Todos los datos ya han sido guardados de forma exitosa.
            <Link className="color-white" href={"/"}>
              Volver al inicio.
            </Link>
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default SubmitStep;
