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
      item
      xs={12}
      container
      justify="center"
      alignItems="center"
      className="p-bottom-2"
    >
      <Grid item xs={12} >
        <h3 className="p-1">
          ¿Estás listo/a para enviar los datos?
        </h3>
      </Grid>
      <Grid item xs={12}>
        <p className="w500 p-1">
          Este formulario NO es una denuncia policial, por lo que es necesario
          visitar la unidad jurídica para reportar a las autoridades sobre el
          siniestro.
        </p>
      </Grid>
      <Button
        xs={6}
        className="p-1"
        color="violet"
        label={traslate.COMMON.BACK}
        onClick={OnBackward}
      />
      <Button
        xs={6}
        className="p-1"
        color="violet"
        label={traslate.COMMON.CONFIRM}
        onClick={OnSubmit}
      />
    </Grid>
  );
};

export default SubmitStep;
