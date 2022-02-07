import React, { useState } from "react";
import traslate from "../../assets/traslate/es.json";
import Scaffold from "../../components/scaffold/scaffold";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import Button from "../../components/button/Button";

import StepOne from "./layout/step1";
import StepTwo from "./layout/step2";
import StepThree from "./layout/step3";
import SubmitStep from "./SubmitStepPage";
import { HandleAPI } from "../../utils/handle-api";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../hooks/useHandlePage";
import { useHistory } from "react-router-dom";

const CrimeFormPage = () => {
    const [form_data, set_form_data] = useState({})
        , [handle_page, set_handle_page] = useHandlePage({})
        , [step, set_step] = useState(0)
        , history = useHistory()

        , HandleNext = (data) => {
            set_form_data({
                ...form_data,
                ...data
            });
            set_step(step + 1);
        }
        , HandleBack = (data) => {
            set_form_data({
                ...form_data,
                ...data
            });
            set_step(step - 1);
        }

        , HandleSubmit = async () => {
            set_handle_page(prev => ({
                ...prev,
                loading: true
            }))
            const data = {
                ...form_data,
                stolen_items: form_data.other_items ? [
                    ...form_data.stolenItems,
                    form_data.other_items
                ] : form_data.stolenItems
            }

            Object.keys(data).forEach((k) => (!data[k] || (typeof data[k] === "string" && data[k].trim() === 0)) && delete data[k]);

            const resp = await HandleAPI({
                method: "post",
                path: "/new-sinister",
                data
            });

            if (!resp)
                return set_handle_page({ 
                    loading: false, 
                    error: true, 
                    notification: true,
                    severity: "error",
                    color: "red",
                    msg: traslate.ERRORS.INTERNAL_SERVER_ERROR 
                })

            switch (resp.status) {
                case 200:
                    return set_handle_page({
                        loading: false,
                        error: false,
                        notification: true,
                        color: "green",
                        severity: "success",
                        msg: traslate.OK.REPORT_COMPLETE,
                        callback: () => history.push(traslate.ROUTES.PUBLIC.HOME)
                    })
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        notification: true,
                        severity: "error",
                        color: "red",
                        msg: traslate.ERRORS.BAD_REQUEST
                    })
                default:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        color: "red",
                        severity: "error",
                        msg: traslate.ERRORS.INTERNAL_SERVER_ERROR
                    })
            }
        }

    return <Scaffold>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        {
            (() => {
                switch (step) {
                    case 0:
                        return (
                            <Grid item md={6} xs={12} className="p-2 border-small background-color-white " container justify="center" alignItems="center" alignContent="center">
                                <Grid item xs={12} className="p-2">
                                    <h2>{traslate["FORM"]["TITLE"]}</h2>
                                    <p className="w500">{traslate.FORM.INTROEXPLANATION1}{traslate.FORM.EXPLANATION1} </p>
                                    <p className="w800">{traslate.FORM.THANKS}</p>
                                </Grid>
                                <Button color="violet" xs={8} md={5} label={traslate.FORM.INTROBUTTON} className="p-1" onClick={() => set_step(1)} />
                            </Grid>
                        );
                    case 1:
                        return (
                            <StepOne data={form_data} handleBack={HandleBack} handleNext={HandleNext}>
                                <Grid item xs={12} className="p-left-2 p-right-2 p-bottom-2">
                                    <h3>Informacion del siniestro</h3>
                                </Grid>
                                <Grid item xs={12} className={"p-bottom-3 p-left-2 p-right-2"}>
                                    <LinearProgress className="border-normal" variant="determinate" value={20} />
                                </Grid>
                            </StepOne>
                        );
                    case 2:
                        return (
                            <StepTwo data={form_data} handleBack={HandleBack} handleNext={HandleNext}>
                                <Grid item xs={12} className="p-left-2 p-right-2 p-bottom-2">
                                    <h3>Información del atacante</h3>
                                </Grid>
                                <Grid item xs={12} className="p-bottom-3 p-left-2 p-right-2">
                                    <LinearProgress className="border-normal" variant="determinate" value={40} />
                                </Grid>
                            </StepTwo>
                        );
                    case 3:
                        return (
                            <StepThree data={form_data} handleBack={HandleBack} handleNext={HandleNext}>
                                <Grid item xs={12} className="p-left-2 p-right-2 p-bottom-2">
                                    <h3>Informacion del siniestro</h3>
                                </Grid>
                                <Grid item xs={12} className="p-bottom-3 p-left-2 p-right-2">
                                    <LinearProgress className="border-normal" variant="determinate" value={60} />
                                </Grid>
                            </StepThree>
                        );
                    case 4:
                        return (
                            <Container className="p-2 background-color-white border-small" maxWidth="sm">
                                <SubmitStep error={handle_page.error} isLoading={handle_page.loading} handleSubmit={HandleSubmit} handleBack={HandleBack} />
                            </Container>
                        );
                    default:
                        return null;
                }
            })()
        } </Scaffold>
};

export default CrimeFormPage;
