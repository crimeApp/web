import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, Button } from "@material-ui/core";
import Scaffold from "../../components/scaffold/scaffold";
import traslate from "../../assets/traslate/es.json";
import FormWrapper from "../../components/form-wrapper/FormWrapper";
import MuiAlert from "@material-ui/lab/Alert";
import CurrentCrimeStepOne from "./layout/step1";
import CurrentCrimeStepTwo from "./layout/step2";
import CurrentCrimeStepThree from "./layout/step3";
import CurrentCrimeStepFour from "./layout/step4";
import CurrentCrimeReview from "./CurrentCrimeReview";
import CurrentCrimeSubmit from "./CurrentCrimeSubmit";
import "./CurrentCrimePage.css";


const CurrentCrimeStep = () => {
  const [form_data, set_form_data] = useState({});
  const [step, set_step] = useState(0);

  console.log(form_data);

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
      console.log(form_data);
      const response = await axios.post(url + "/new-sinister", form_data);
      console.log("Returned data:", response);
      setTimeout(setLoading(false), 3000);
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
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
          <Container className="p-2 m-top-2" maxWidth="sm">
            <Grid
              container
              item
              xs={12}
              className="form-wrap"
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

              <Grid item xs={5}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="m-bottom-3 m-top-1"
                  onClick={() => set_step(step + 1)}
                >
                  {traslate["FORM"]["INIT-FORM"]}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Scaffold>
      );
    case 1:
      return (
        <Scaffold>
          <FormWrapper
            hide_progress={false}
            steptitle={traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
            loading={20}
          >
            <CurrentCrimeStepOne
              data={form_data}
              handleBack={HandleBack}
              handleNext={HandleNext}
            />
          </FormWrapper>
        </Scaffold>
      );
    case 2:
      return (
        <Scaffold>
          <FormWrapper
            hide_progress={false}
            steptitle={traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
            loading={40}
          >
            <CurrentCrimeStepTwo
              data={form_data}
              handleNext={HandleNext}
              handleBack={HandleBack}
            />
          </FormWrapper>
        </Scaffold>
      );
    case 3:
      return (
        <Scaffold>
          <FormWrapper
            hide_progress={false}
            steptitle={traslate["FORM"]["PERSONALINFO"]["PERSONALINFO"]}
            loading={60}
          >
            <CurrentCrimeStepThree
              data={form_data}
              handleNext={HandleNext}
              handleBack={HandleBack}
            />
          </FormWrapper>
        </Scaffold>
      );
    case 4:
      return (
        <Scaffold>
          <FormWrapper
            hide_progress={false}
            steptitle={traslate["FORM"]["THEFTDETAILS"]["THIEFINFO"]}
            loading={80}
          >
            <CurrentCrimeStepFour
              data={form_data}
              handleNext={HandleNext}
              handleBack={HandleBack}
            />
          </FormWrapper>
        </Scaffold>
      );
    case 5:
      return (
        <Scaffold>
          <Container
            className="m-top-2 background-color-card-background"
            maxWidth="lg"
          >
            <Grid
              container
              justify="center"
              alignItems="flex-start"
              alignContent="center"
            >
              <Grid item xs={6}>
                <h3 className="m-bottom-1 m-top-1 color-gray">Revise sus datos</h3>
              </Grid>

              <Grid item xs={12}>
                <CurrentCrimeReview
                  data={form_data}
                  error={error}
                  isLoading={isLoading}
                  handleSubmit={HandleSubmit}
                  handleBack={HandleBack}
                />
              </Grid>

              <Grid item xs={12} md={4} className="m-top-2 m-bottom-1">
                {isLoading ? loadingMessage : null}
                {error ? errorMessage : null}
              </Grid>
              
            </Grid>
          </Container>
        </Scaffold>
      );
    case 6:
      return (
        <Scaffold>
          <FormWrapper
            title={traslate["CONFIRMATION-DIALOG"]["TITLE"]}
            subtitle={traslate["CONFIRMATION-DIALOG"]["TEXT"]}
            hide_progress={true}
            hide_subtitle={true}
          >
            <CurrentCrimeSubmit />
          </FormWrapper>
        </Scaffold>
      );
    default:
      break;
  }
};

export default CurrentCrimeStep;
