import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, Button } from "@material-ui/core";
import Scaffold from "../../components/scaffold/scaffold";
import traslate from "../../assets/traslate/es.json";
import FormWrapper from "../../components/form-wrapper/FormWrapper";
import MuiAlert from "@material-ui/lab/Alert";
import PastCrimeStepOne from "./layout/step1";
import PastCrimeStepTwo from "./layout/step2";
import PastCrimeStepThree from "./layout/step3";
import PastCrimeStepFour from "./layout/step4";
import PastCrimeReview from "./PastCrimeReview";
import SubmitStep from "../SubmitStepPage";

const PastCrimeStep = () => {
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
      const response = await axios.post(url + "/old-sinister", form_data);
      if(response){
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
                <h2 className="m-bottom-1">{traslate["FORM"]["TITLE-PASTCRIME"]}</h2>
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
            <PastCrimeStepOne
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
            <PastCrimeStepTwo
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
            <PastCrimeStepThree
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
            <PastCrimeStepFour
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
                <PastCrimeReview
                  data={form_data}
                  error={error}
                  isLoading={isLoading}
                  handleSubmit={HandleSubmit}
                  handleBack={HandleBack}
                  handleNext={HandleNext}
                />
              </Grid>

              <Grid item xs={12} md={4} className="m-top-2 m-bottom-1">
                {isLoading ? loadingMessage : (error ? errorMessage : null)}
              </Grid>
              
            </Grid>
          </Container>
        </Scaffold>
      );
    case 6:
      return (
        <Scaffold>
          <Container className="p-2 m-top-3 background-color-card-background" maxWidth="sm">
            <SubmitStep/>
          </Container>
        </Scaffold>
      );
    default:
      break;
  }
};

export default PastCrimeStep;
