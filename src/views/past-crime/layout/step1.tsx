import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Input from "../../../components/input/Input";
import yup from "../../../utils/yup";
import Validator from "../../../utils/validator";
import { Menu } from "@material-ui/icons";

const schema = yup.object({
    type: yup.string()
      .transform((e) => e.toLowerCase())
      .oneOf([
        "robo",
        "asesinato",
        "abuso sexual",
        "secuestro",
        "asalto",
        "hurto",
      ])
      .required("Completar la casilla"),
    hour: yup.string()
      .transform((e) => e.toLowerCase())
      .oneOf(["mañana", "mediodia", "tarde", "noche"])
      .required("Completar la casilla"),
    date: yup.date()
      .min(new Date("01/01/2010"))
      .max(new Date())
      .required("Ingresar una fecha valida"),
    place_description: yup.mixed()
      .transform((e) => e.toLowerCase())
      .oneOf([
        "otro",
        "en el estacionamiento",
        "parada de colectivo",
        "supermercado",
        "propiedad privada",
        "calle",
        "centro comercial",
        "parque",
      ])
      .required("Completar la casilla"),
    accompaniment: yup.mixed()
      .transform((e) => e.toLowerCase())
      .oneOf([
        "solo/a, gente alrededor",
        "acompañado, gente alrededor",
        "solo/a, no gente alrededor",
        "acompañado, no gente alrededor",
      ])
      .required("Completar la casilla"),
  });
  

interface PastCrimeStepOneProps {
    data: any,
    handleNext: (data:any) => void
}

const PastCrimeStepOne = ({ data, handleNext }: PastCrimeStepOneProps) => {

    const [data_state, set_data] = useState({
        ...data,
        type: "",
        hour: "", 
        date: "",
        place_description: "",
        accompaniment: "",
       
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


    return <Grid item xs={8} container justify="center" className="form-content">
        <Input 
            xs={12} 
            iconLeft={<Menu />}
            label={"Fecha"} 
            value={data_state.date} 
            onChange={(e) => HandleChange("date", e.target.value)} 
            error={error?.date} 
            error_msg={error?.date?.msg}
        />
        
        <button onClick={OnSubmit}> SIGUIENTE </button>
    </Grid>
}

export default PastCrimeStepOne;