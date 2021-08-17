import React from "react";
import { Button, Grid } from "@material-ui/core";
import traslate from "../../assets/traslate/es.json";

const SubmitStep = () => {
    return (
        <Grid 
            container 
            item 
            xs={10} 
            md={12}
            direction="column" 
            justify="center" 
            alignItems="center" 
            className="p-bottom-2">
                
            <Grid item xs={12} md={10}>
                <h3 className="m-bottom-1 p-left-3">{traslate["CONFIRMATION-DIALOG"]["TITLE"]}</h3>  
            </Grid>

            <Grid item xs={12} md={10}>
                <p className="w500 p-left-3">
                    Todos los datos ya han sido guardados de forma exitosa. 
                </p>
            </Grid>

            <Grid item xs={12} md={10}>
                <p className="w500 p-left-3">
                    Este formulario NO es una denuncia policial, 
                    por lo que es necesario visitar la unidad juridica 
                    para reportar a las autoridades sobre el siniestro.
                </p>
            </Grid>

           
            <Grid item md={10} xs={12}>
                <Button variant="contained" color="primary" href="/">
                    {traslate["CONFIRMATION-DIALOG"]["BUTTON-TEXT"]}
                </Button>
            </Grid>
        </Grid>
    );
};

export default SubmitStep;