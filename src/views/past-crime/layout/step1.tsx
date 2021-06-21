import React, { useState } from "react";
import Map from "../../../components/map/Map";
import { Grid } from "@material-ui/core";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import { Menu } from "@material-ui/icons";

const schema = yup.object({
    name: yup.string().required().transform( (e:string) => e.toLowerCase() )
});

interface PastCrimeStepOneProps {
    data: any,
    handleNext: (data:any) => void
}

const PastCrimeStepOne = ({ data, handleNext }: PastCrimeStepOneProps) => {

    const [data_state, set_data] = useState({
        ...data,
        name: "",
        surname: "",
        position: {
            lat: 0,
            lng: 0
        }
    });

    const [error, set_error] = useState<any>();

    const HandleChange = (name: string, value: any) => set_data({ ...data_state, [name]: value })

    const OnSubmit = async () => {

        set_error({});

        const resp = await Validator(data_state, schema)

        if(resp.err) {
            set_error(resp.data);
        }

        handleNext(resp.data)
    }


    return <Grid item xs={8} container justify="center">
        <Input 
            xs={12} 
            iconLeft={<Menu />}
            label={"Nombre"} 
            value={data_state.name} 
            onChange={(e) => HandleChange("name", e.target.value)} 
            error={error?.name} 
            error_msg={error?.name?.msg}
            />
        <Grid item xs={12}>
            <h3>{data_state.surname}</h3>
        </Grid>
        <Map label="Ubicacion" xs={12} position={data_state.position} onChange={(newValue) => HandleChange("position", newValue)} />
        <button onClick={OnSubmit} > SIGUIENTE </button>
    </Grid>
}

export default PastCrimeStepOne;