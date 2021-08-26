import React, { useState } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import useWindows from "../../hooks/useWindows";
import Button from "../../components/button/Button";

import StepOne from "./layout/step1";
import StepTwo from "./layout/step2";
import StepThree from "./layout/step3";
import AgreeStep from './AgreeStepPage';
import SubmitStep from "./SubmitStepPage";

const CrimeFormPage = () => {
  const [form_data, set_form_data] = useState({});
  const { xs } = useWindows();
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

  switch (step) {
    case 3:
      return (
        <Scaffold>
          <Grid
            container
            item
            md={6}
            xs={12}
            className="m-top-2 p-2 border-normal
             background-color-card-background "
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={12} className="p-2">
              <h2>{traslate["FORM"]["TITLE"]}</h2>
              <p className="w500">{traslate.FORM.INTROEXPLANATION1}
                {traslate.FORM.EXPLANATION1}</p>
              <p className="w800">{traslate.FORM.THANKS}</p>
            </Grid>

            <Button
              color="violet"
              xs={8}
              md={5}
              label={traslate.FORM.INTROBUTTON}
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
            <Grid
              item
              xs={12}
              md={10}
              className={`${xs
                ? "p-left-4 p-right-4 p-top-2 p-bottom-2 "
                : "p-top-3 p-bottom-2 p-left-4 p-right-4"
                }`}
            >
              <LinearProgress
                className="border-normal"
                variant="determinate"
                value={20}
              />
            </Grid>
          </StepOne>
        </Scaffold>
      );
    case 2:
      return (
        <Scaffold>
          <StepTwo
            data={form_data}
            handleBack={HandleBack}
            handleNext={HandleNext}
          >
            <Grid
              item
              xs={12}
              md={10}
              className={`${xs
                ? "p-left-4 p-right-4 p-top-2 p-bottom-2 "
                : "p-top-3 p-bottom-2 p-left-4 p-right-4"
                }`}
            >
              <LinearProgress
                className="border-normal"
                variant="determinate"
                value={40}
              />
            </Grid>
          </StepTwo>
        </Scaffold>
      );

    case 5:
      return (
        <Scaffold>
          <AgreeStep
              error={error}
              Alert={Alert()}
              isLoading={isLoading}
              handleSubmit={HandleSubmit}
              handleBack={HandleBack}
            />
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
            <Grid
              item
              xs={12}
              md={6}
              className={`${xs
                ? "p-left-4 p-right-4 p-top-2 p-bottom-2 "
                : "p-top-3 p-bottom-2 "
                }`}
            >
              <LinearProgress
                className="border-normal"
                variant="determinate"
                value={60}
              />
            </Grid>
          </StepThree>
        </Scaffold>
      );
    case 0:
      return (
        <Scaffold>
          <Container
            className="p-3 m-top-2 background-color-card-background"
            maxWidth="sm"
          >
            <SubmitStep
              error={error}
              Alert={Alert()}
              isLoading={isLoading}
              handleSubmit={HandleSubmit}
              handleBack={HandleBack}
            />
          </Container>
        </Scaffold>
      );
    default:
      break;
  }
};

export default CrimeFormPage;
