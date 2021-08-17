import React, { useState } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import { Container, Grid, LinearProgress } from "@material-ui/core";

import Button from "../../components/button/Button";

import StepOne from "./layout/step1";
import StepTwo from "./layout/step2";
import StepThree from "./layout/step3";
import SubmitStep from "./SubmitStepPage";

const CrimeFormPage = () => {
  const [form_data, set_form_data] = useState({});
  const [step, set_step] = useState(0);
  // Internal Functions with UpperCase
  const HandleNext = (data) => {
    set_form_data({ ...form_data, ...data });
    set_step(step + 1);
  };

  const HandleBack = (data) => {
    set_form_data({ ...form_data, ...data });
    set_step(step - 1);
  };

  const url = "https://us-west2-crimen-app-ucc.cloudfunctions.net/app";
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function HandleSubmit(event) {
    setLoading(true);

    try {
      const response = await axios.post(url + "/new-sinister", form_data);
      if (response) {
        set_step(step + 1);
        setLoading(false);
      }
    } catch (e) {
      setTimeout(() => {
        setError(true);
        setLoading(false);
      }, 3000);
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const loadingMessage = <Alert>{traslate["COMMON"]["LOADING"]}</Alert>;

  const errorMessage = (
    <Alert severity="error">{traslate["COMMON"]["ERROR"]}</Alert>
  );

  switch (step) {
    case 0:
      return (
        <Scaffold>
          <Container className="p-1" maxWidth="sm">
            <Grid
              container
              item
              xs={12}
              md={10}
              className="m-top-3 p-1 background-color-card-background"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={10}>
                <h2 className="m-bottom-1">{traslate["FORM"]["TITLE"]}</h2>
              </Grid>

              <Grid item xs={10}>
                <p className="w500">
                  Toda la información solicitada permanece completamente anónima
                  para otros.
                </p>
                <p className="w500">
                  El propósito de este formulario es registrar ciertas
                  tendencias criminales en Córdoba y contribuir a la seguridad
                  ciudadana.
                </p>
                <p className="w800">¡Agradecemos tu contribución!</p>
              </Grid>

              <Button
                  color="violet"
                  xs={6}
                  md={5}
                  label={'Hacer denuncia'}
                  className="p-1"
                  onClick={() => {
                    set_step(1);
                  }}
                />
            </Grid>
          </Container>
        </Scaffold>
      );

    case 1:
      return (
        <Scaffold>
          <StepOne
            data={form_data}
            handleBack={HandleBack}
            handleNext={HandleNext}
          >
            <LinearProgress
              className="border-normal width-400"
              variant="determinate"
              value={20}
            />
          </StepOne>
        </Scaffold>
      );
    case 2:
      return (
        <Scaffold>
          <Grid
            item
            xs={12}
            md={8}
            container
            className="background-color-card-background"
            justify="center"
            alignItems="center"
          >
            <StepTwo
              data={form_data}
              handleBack={HandleBack}
              handleNext={HandleNext}>
                <LinearProgress
                className="border-normal width-400"
                variant="determinate"
                value={40}
              />
                </StepTwo>
          </Grid>
        </Scaffold>
      );
     
    case 3:
      return (
        <Scaffold>
          <Grid
            item
            xs={12}
            md={8}
            container
            className="p-3 background-color-card-background"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <h2>Hola xd</h2>
            </Grid>
            <Grid item className="m-top-3 m-bottom-2">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className=" m-left-3"
                onClick={() => {
                  set_step(5);
                }}
              >
                {traslate.COMMON.CANCEL}
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="m-right-3"
                onClick={() => {
                  set_step(step + 1);
                }}
              >
                {traslate.COMMON.CONFIRM}
              </Button>
            </Grid>
          </Grid>
        </Scaffold>
      );

    case 4:
      return (
        <Scaffold>
          <Grid
            item
            xs={12}
            container
            className="p-3 background-color-card-background"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <LinearProgress
                className="m-2 border-normal"
                variant="determinate"
                value={60}
              />
            </Grid>

            <StepThree
              data={form_data}
              handleBack={HandleBack}
              handleNext={HandleNext}
            />
          </Grid>
        </Scaffold>
      );
    case 5:
      return (
        <Scaffold>
          <Container
            className="p-3 m-top-2 background-color-card-background"
            maxWidth="sm"
          >
            <SubmitStep
              error={error}
              data={form_data}
              isLoading={isLoading}
              errorMessage={errorMessage}
              handleSubmit={HandleSubmit}
              loadingMessage={loadingMessage}
            />
          </Container>
        </Scaffold>
      );
    default:
      break;
  }
};

export default CrimeFormPage;
