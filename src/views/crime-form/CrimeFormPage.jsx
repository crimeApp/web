import React, {useState} from "react";
import axios from "axios";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import {Container, Grid, LinearProgress} from "@material-ui/core";
import useWindows from "../../hooks/useWindows";
import Button from "../../components/button/Button";

import StepOne from "./layout/step1";
import StepTwo from "./layout/step2";
import StepThree from "./layout/step3";
import SubmitStep from "./SubmitStepPage";

const CrimeFormPage = () => {
    const [form_data, set_form_data] = useState({});
    const {xs} = useWindows();
    const [step, set_step] = useState(0);

    // Internal Functions with UpperCase
    const HandleNext = (data) => {
        set_form_data({
            ...form_data,
            ...data
        });
        set_step(step + 1);
    };

    const HandleBack = (data) => {
        set_form_data({
            ...form_data,
            ...data
        });
        set_step(step - 1);
    };

    const url = "https://us-west2-crimen-app-ucc.cloudfunctions.net/app";
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function HandleSubmit(event) {
        setLoading(true);

        try {
            const response = await axios.post(url + "/new-sinister", {
                ...form_data,
                stolen_items: form_data.other_items ? [
                    ...form_data.stolenItems,
                    form_data.other_items
                ] : form_data.stolenItems
            });
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

    switch (step) {
        case 0:
            return (
                <Scaffold>
                    <Grid item md={6} xs={12} className="p-2 border-normal background-color-white " container justify="center" alignItems="center" alignContent="center">
                        <Grid item xs={12} className="p-2">
                            <h2>{traslate["FORM"]["TITLE"]}</h2>
                            <p className="w500">
                                {traslate.FORM.INTROEXPLANATION1}
                                {traslate.FORM.EXPLANATION1} 
                                </p>
                            <p className="w800">{traslate.FORM.THANKS}</p>
                        </Grid>
                        <Button color="violet"
                            xs={8}
                            md={5}
                            label={traslate.FORM.INTROBUTTON}
                            className="p-1"
                            onClick={() => set_step(1)}/>
                    </Grid>
            </Scaffold>
            );

        case 1:
            return (
                <Scaffold>
                    <StepOne data={form_data} handleBack={HandleBack} handleNext={HandleNext}>
                        <Grid item xs={12} className={"p-top-2 p-left-2 p-right-2"}>
                            <h3>Informacion del siniestro</h3>
                        </Grid>
                        <Grid item xs={12} className={"p-bottom-3 p-left-2 p-right-2"}>
                            <LinearProgress className="border-normal" variant="determinate"
                                value={20}/>
                        </Grid>
                    </StepOne>
                </Scaffold>
            );
        case 2:
            return (
                <Scaffold>
                    <StepTwo data={form_data}
                        handleBack={HandleBack}
                        handleNext={HandleNext}>
                        <Grid item
                            xs={12}
                            md={10}
                            className={
                                `${
                                    xs ? "p-left-4 p-right-4 p-top-2 p-bottom-2 " : "p-top-3 p-bottom-2 p-left-4 p-right-4"
                                }`
                        }>
                            <LinearProgress className="border-normal" variant="determinate"
                                value={40}/>
                        </Grid>
                    </StepTwo>
                </Scaffold>
            );

        case 3:
            return (
                <Scaffold>
                    <StepThree data={form_data}
                        handleBack={HandleBack}
                        handleNext={HandleNext}>
                        <Grid item
                            xs={12}
                            md={6}
                            className={
                                `${
                                    xs ? "p-left-4 p-right-4 p-top-2 p-bottom-2 " : "p-top-3 p-bottom-2 "
                                }`
                        }>
                            <LinearProgress className="border-normal" variant="determinate"
                                value={60}/>
                        </Grid>
                    </StepThree>
                </Scaffold>
            );

        case 4:
            return (
                <Scaffold>
                    <Container className="p-3 m-top-2 background-color-light-gray" maxWidth="sm">
                        <SubmitStep error={error}
                            isLoading={isLoading}
                            handleSubmit={HandleSubmit}
                            handleBack={HandleBack}/>
                    </Container>
                </Scaffold>
            );

        default:
            return null;
    }
};

export default CrimeFormPage;
