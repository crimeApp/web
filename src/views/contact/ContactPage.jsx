import React from "react";
import Grid from "@material-ui/core/Grid";
import Scaffold from "../../components/scaffold/scaffold";
import { BackButtonString } from "../admin/component/BackButton";

const ContactPage = () => {

  return (
    <Scaffold>
      <Grid
        item
        xs={12}
        container
        className="p-1"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item xs={12} md={10} className='background-color-white border-small p-2'>
          <BackButtonString className="p-left-2" />
          <h3 className="p-left-2 p-right-2">¿Quiénes somos y de qué se trata el proyecto?</h3>
          <p className="home-subtitle p-2">
            Somos estudiantes de ingeniería de la UCC que busca crear un
            espacio de comunicación sobre siniestros
            ocurridos en la ciudad de Córdoba.
            </p>
          <p className="p-2">
            <b>Te invitamos a
            compartir información clave sobre algún robo o hurto del que hayas sido víctima
               para crear un mapa de crímenes util para todos.</b>
          </p>
          <p className="p-2">
            Ante cualquier tipo de problema contactarse al siguiente mail: santiago.agustin.merlo@gmail.com
          </p>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default ContactPage;