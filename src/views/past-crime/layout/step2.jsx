import React, { useState } from "react";
import Map from "../../../components/map/Map";
import { Grid } from "@material-ui/core";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";

const schema = yup.object({
    name: yup.string().required().transform( (e) => e.toLowerCase() )
});


const PastCrimeStepTwo = ({ data, handleNext }) => {

    const [data_state, set_data] = useState({
        name: "",
        surname: "",
        position: {
            lat: 0,
            lng: 0
        }
    });

    const [error, set_error] = useState();

    const HandleChange = (name, value) => set_data({ ...data_state, [name]: value })

    const OnSubmit = async () => {

        set_error({});

        const resp = await Validator(data_state, schema)

        if(resp.err) {
            set_error(resp.data);
        }

        console.log(resp.data)
    }


    return <Grid item xs={8} container justify="center">
        <Grid item xs={12}>
            <input value={data_state.name} onChange={(e) => HandleChange("name", e.target.value)} />
            { error?.name ? <h6>{error.name?.msg }</h6> : null }
        </Grid>
        <Grid item xs={12}>
            <h3>{data_state.surname}</h3>
        </Grid>
        <Map label="Ubicacion" xs={12} position={data_state.position} onChange={(newValue) => HandleChange("position", newValue)} />
        <button onClick={OnSubmit} > SIGUIENTE </button>
    </Grid>
}

export default PastCrimeStepTwo;