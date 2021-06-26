import React, { useState } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import FormWrapper from "../../components/form-wrapper/FormWrapper";

import PastCrimepageOne from "./layout/step1";
import PastCrimepageTwo from "./layout/step2";
import PastCrimepageThree from "./layout/step3";
import PastCrimepageFour from "./layout/step4";
import PastCrimeReview from "./PastCrimeReview";
import PastCrimeSubmit from "./PastCrimeSubmit";

const PastCrimePage = () => {
  const [form_data, set_form_data] = useState({
    type: "",
    hour: "",
    date: "",
    place_description: "",
    accompaniment: "",
    stolen_cash: "",
    stolen_items: "",
    victim_name: "",
    victim_dni: "",
    victim_gender: "",
    victim_age: "",
    victim_skin: "",
    victim_height: "",
    victim_clothing: "",
    victim_pyshical: "",
    thief_profile: "",
    thief_age: "",
    thief_gender: "",
    thief_skin: "",
    thief_height: "",
    thief_clothing: "",
    thief_physical: "",
    thief_complaint: false,
    thief_arrested: false,
    position: [-31.42384796597578, -64.18635948818674],
  });

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
          <Box className="form-background m-top-4">
            <Grid
              className="form-wrap p-top-1"
              direction="column"
              justify="center"
              alignContent="center"
            >
              <Grid item xs={12} className='m-left-3 m-right-3 m-top-1'>
                <h2>{traslate["FORM"]["TITLE-PASTCRIME"]}</h2>
                <p className="form-wrap-subtitle">
                  {traslate["FORM"]["SUBTITLE"]}
                </p>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="m-bottom-3 m-top-3 m-left-3"
                  onClick={HandleNext}
                >
                  Completar formulario
                </Button>
              </Grid>
            </Grid>
          </Box>
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
                handleNext={HandleNext} />
          </FormWrapper>
        </Scaffold>
      );
    case 2:
      return (
        <Scaffold>
          <FormWrapper
            hide_progress={false}
            steptitle={traslate["FORM"]["THEFTDETAILS"]["THIEFINFO"]}
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
            steptitle={traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
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
            steptitle={traslate["FORM"]["PERSONALINFO"]["PERSONALINFO"]}
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
          <FormWrapper
            steptitle={"Revise si los datos son correctos."}
            hide_progress={false}
            loading={100}
          >
            <PastCrimeReview
              data={form_data}
              handleNext={HandleNext}
              handleBack={HandleBack}
            />
          </FormWrapper>
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
