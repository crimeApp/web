import React from "react";
import { Grid, Link } from "@material-ui/core";
import Button from "../../components/button/Button";
import traslate from "../../assets/traslate/es.json";

const SubmitStep = ({ data, error, isLoading, handleSubmit, handleBack, Alert }) => {
    const OnBackward = () => {
        return handleBack(data);
    };

    const OnSubmit = () => {
        return handleSubmit(data);
    }

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
                <p className="w500 p-left-3">
                    Este formulario NO es una denuncia policial,
                    por lo que es necesario visitar la unidad jurídica
                    para reportar a las autoridades sobre el siniestro.
                </p>
            </Grid>

            <Grid
                container
                item
                md={12}
                xs={10}
                direction="row"
                className='p-top-2'
                justify="space-around"
            >
                <Button
                    color="violet"
                    xs={6}
                    md={4}
                    label={traslate.COMMON.BACK}
                    className="p-1"
                    onClick={OnBackward}
                />

                <Grid item xs={6} md={4}>
                  <Link underline="none" href={"/"}>
                    <Button color="violet"  label={traslate.COMMON.NEXT} onClick={OnSubmit}></Button>
                  </Link>
                </Grid>
            </Grid>

           {/*  <Grid item xs={8} className='m-top-2 m-bottom-2'>
              {error && <Alert severity="error">{traslate["COMMON"]["ERROR"]}</Alert>}
              {isLoading && <Alert>{traslate["COMMON"]["LOADING"]}</Alert>}
            </Grid> */}
        </Grid>
    );
};

export default SubmitStep;