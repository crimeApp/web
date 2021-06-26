import React from "react";
import { useState } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import CurrentCrimeStepOne from "./layout/step1";
import CurrentCrimeStepTwo from "./layout/step2";
import CurrentCrimeStepThree from "./layout/step3";
import CurrentCrimeStepFour from "./layout/step4";
import CurrentCrimeReview from "./CurrentCrimeReview";
import CurrentCrimeSubmit from "./CurrentCrimeSubmit";

const CurrentCrimePage = () => {
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

    const [page, set_page] = useState(0);

    // Internal Functions with UpperCase
    const HandleNext = (data) => {
        set_form_data({ ...form_data, ...data });
        set_page(page + 1);
    };

    const HandleBack = (data) => {
        set_form_data({ ...form_data, ...data });
        set_page(page - 1);
    };

    return (
        <Scaffold>
            <CurrentCrimeStepOne data={form_data} handleNext={HandleNext} />
            <CurrentCrimeStepTwo data={form_data} handleNext={HandleNext} handleBack={HandleBack} />
            <CurrentCrimeStepThree data={form_data} handleNext={HandleNext} handleBack={HandleBack} />
            <CurrentCrimeStepFour data={form_data} handleNext={HandleNext} handleBack={HandleBack} />
            <CurrentCrimeReview data={form_data} handleNext={HandleNext} handleBack={HandleBack} />
            <CurrentCrimeSubmit/>
        </Scaffold>
    );
};

export default CurrentCrimePage;
