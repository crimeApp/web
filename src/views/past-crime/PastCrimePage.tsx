import React from "react";
import { useState } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import PastCrimeStepOne from "./layout/step1";

const PastCrimePage = () => {

    const [form_data, set_form_data ] = useState({
        name: "juan",
        surname: "lopez",
        position: undefined
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