import React from "react";
import { useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import Scaffold from "../../components/scaffold/scaffold";
import traslate from "../../assets/traslate/es.json";
import FormWrapper from "../../components/form-wrapper/FormWrapper";
import "./CurrentCrimePage.css";

import CurrentCrimeStepOne from "./layout/step1";
import CurrentCrimeStepTwo from "./layout/step2";
import CurrentCrimeStepThree from "./layout/step3";
import CurrentCrimeStepFour from "./layout/step4";
import CurrentCrimeReview from "./CurrentCrimeReview";
import CurrentCrimeSubmit from "./CurrentCrimeSubmit";

const CurrentCrimeStep = () => {
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
                    <Container maxWidth="md" className="p-4" >
                        <Grid
                            container
                            item
                            xs={10}
                            className="form-wrap"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={10}>
                                <h2>{traslate["FORM"]["TITLE"]}</h2>
                                <p className="w500">
                                Toda la información solicitada permanece completamente anónima para otros. 
                                </p>
                                <p className="w500">El propósito de este formulario es registrar ciertas tendencias criminales en Córdoba 
                                    y contribuir a la seguridad ciudadana.</p>
                                <p className="w800">¡Agradecemos tu contribución!</p>
                            </Grid>

                            <Grid item xs={4}>
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
                        <CurrentCrimeStepOne
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
                    <FormWrapper
                        steptitle={"Revise si los datos son correctos."}
                        hide_progress={false}
                        loading={100}
                    >
                        <CurrentCrimeReview
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
                        <CurrentCrimeSubmit />
                    </FormWrapper>
                </Scaffold>
            );
        default:
            break;
    }
};

export default CurrentCrimeStep;


