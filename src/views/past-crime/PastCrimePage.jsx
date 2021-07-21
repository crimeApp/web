import React, { useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import FormWrapper from "../../components/form-wrapper/FormWrapper";
import "./PastCrimePage.css";

import PastCrimepageOne from "./layout/step1";
import PastCrimepageTwo from "./layout/step2";
import PastCrimepageThree from "./layout/step3";
import PastCrimepageFour from "./layout/step4";
import PastCrimeReview from "./PastCrimeReview";
import PastCrimeSubmit from "./PastCrimeSubmit";

const PastCrimePage = () => {
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
                <h2 className="m-bottom-1">
                  {traslate["FORM"]["TITLE-PASTCRIME"]}
                </h2>
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
                  onClick={HandleNext}
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
            <PastCrimepageOne
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
            <PastCrimepageTwo
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
            <PastCrimepageThree
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
            <PastCrimepageFour
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
              handleNext={HandleNext}
              handleBack={HandleBack}
            />
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
            <PastCrimeSubmit />
          </FormWrapper>
        </Scaffold>
      );
    default:
      break;
  }
};

export default PastCrimePage;
