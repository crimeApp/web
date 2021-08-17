import React from "react";
import Grid from "@material-ui/core/Grid";
import Scaffold from "../../components/scaffold/scaffold";

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
        <Grid item xs={12} md={10} className='p-1'>
          <h3>¿Quiénes somos y de qué se trata el proyecto?</h3>
          <p className="home-subtitle">
            Somos estudiantes de ingeniería de la UCC que busca crear un
            espacio de comunicación sobre siniestros
            ocurridos en la ciudad de Córdoba.
            </p>
          <p>
            <b>Te invitamos a
            compartir información clave sobre algún robo o hurto del que hayas sido víctima
               para crear un mapa de crímenes util para todos.</b>
          </p>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

export default ContactPage;