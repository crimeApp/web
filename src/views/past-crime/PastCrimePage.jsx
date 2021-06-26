import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
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
        position: [52.52437, 13.41053],
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
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        subtitle={traslate["FORM"]["SUBTITLE"]}
                        hide_progress={true}
                        hide_subtitle={false}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="m-left-3 m-bottom-3 "
                            onClick={HandleNext}>
                            Completar formulario
                        </Button>

                    </FormWrapper>
                </Scaffold>
            );
        case 1:
            return (
                <Scaffold>
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        subtitle={traslate["FORM"]["SUBTITLE"]}
                        hide_progress={false}
                        hide_subtitle={true}
                        steptitle={traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
                        loading={20}
                    >
                        <PastCrimepageOne
                            data={form_data}
                            handleNext={HandleNext} />
                    </FormWrapper>

                </Scaffold>
            );
        case 2:
            return (
                <Scaffold>
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        hide_progress={false}
                        hide_subtitle={true}
                        steptitle={traslate["FORM"]["THEFTDETAILS"]["THIEFINFO"]}
                        loading={40}
                    >
                        <PastCrimepageTwo
                            data={form_data}
                            handleNext={HandleNext}
                            handleBack={HandleBack} />
                    </FormWrapper>

                </Scaffold>
            );
        case 3:
            return (
                <Scaffold>
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        hide_progress={false}
                        hide_subtitle={true}
                        steptitle={traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
                        loading={60}
                    >
                        <PastCrimepageThree
                            data={form_data}
                            handleNext={HandleNext} handleBack={HandleBack} />
                    </FormWrapper>

                </Scaffold>

            );
        case 4:
            return (
                <Scaffold>
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        hide_progress={false}
                        hide_subtitle={true}
                        steptitle={traslate["FORM"]["PERSONALINFO"]["PERSONALINFO"]}
                        loading={80}
                    >
                        <PastCrimepageFour
                            data={form_data}
                            handleNext={HandleNext}
                            handleBack={HandleBack} />
                    </FormWrapper>

                </Scaffold>
            );
        case 5:
            return (
                <Scaffold>
                    <FormWrapper
                        title={traslate["FORM"]["TITLE-PASTCRIME"]}
                        subtitle={"Revise si los datos son correctos."}
                        hide_progress={false}
                        hide_subtitle={true}
                        loading={100}
                    >
                        <PastCrimeReview data={form_data} handleNext={HandleNext} handleBack={HandleBack} />
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
