import React from "react";
import { useState } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import PastCrimeStepOne from "./layout/step1";

const PastCrimePage = () => {

    const [form_data, set_form_data ] = useState({
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
        victim_height: "",
        victim_clothing: "",
        victim_pyshical: "",
        thief_profile: "",
        thief_age: "",
        thief_height: "",
        thief_clothing: "",
        thief_physical: "",
        thief_complaint: false,
        thief_arrested: false,
        geopoint: [52.52437, 13.41053]

    });

    const [page, set_page] = useState(0);

    // Internal Functions with UpperCase
    const HandleNext = (data:any) => {
        set_form_data({ ...form_data, ...data })
        set_page(page + 1);
    }

    return <Scaffold>
        <PastCrimeStepOne data={form_data} handleNext={HandleNext} />
    </Scaffold>
}

export default PastCrimePage;