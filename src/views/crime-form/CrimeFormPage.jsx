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
          <Grid
            container
            item
            md={6}
            xs={12}
            className="p-2 background-color-card-background"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={12} className="p-2">
              <h2>{traslate["FORM"]["TITLE"]}</h2>
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
              className="border-normal"
              variant="determinate"
              value={20}
            />
          </StepOne>
        </Scaffold>
      );
    case 2:
      return (
        <Scaffold>
          <StepTwo
            data={form_data}
            handleBack={HandleBack}
            handleNext={HandleNext}>
            <LinearProgress
              className="border-normal"
              variant="determinate"
              value={40}
            />
          </StepTwo>
        </Scaffold>
      );

    case 3:
      return (
        <Scaffold>
          <Grid
            container
            item
            md={6}
            xs={12}
            className="p-2 background-color-card-background"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={10}>
              <h2>{traslate["FORM"]["INTRO"]}</h2>
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

            <Grid
              container
              item
              md={6}
              xs={10}
              direction="row"
              className='p-top-1'
              justify="space-around"
            >
              <Button
                color="violet"
                xs={6}
                md={4}
                label={traslate.COMMON.CANCEL}
                className="p-1"
                onClick={() => {
                  set_step(5);
                }}
              />

              <Button
                color="violet"
                xs={6}
                md={4}
                label={traslate.COMMON.NEXT}
                className="p-1"
                onClick={() => {
                  set_step(step + 1);
                }}
              />
            </Grid>
          </Grid>
        </Scaffold>
      );

    case 4:
      return (
        <Scaffold>
          <StepThree
            data={form_data}
            handleBack={HandleBack}
            handleNext={HandleNext}
          >
            <LinearProgress
              className="m-2 border-normal"
              variant="determinate"
              value={60}
            />
          </StepThree>
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
