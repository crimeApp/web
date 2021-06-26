import React, { useState } from "react";
import traslate from "../../assets/traslate/es.json";
import axios from "axios";
import {
  Grid,
  Button,
  Divider,
  Accordion,
  List,
  ListItem,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CurrentCrimeReview = ({ data, handleNext, handleBack }) => {
  const {
    type,
    hour,
    date,
    place_description,
    accompaniment,
    stolen_cash,
    stolen_items,
    victim_height,
    victim_clothing,
    victim_pyshical,
    victim_name,
    victim_dni,
    victim_gender,
    victim_age,
    thief_profile,
    thief_age,
    thief_height,
    thief_clothing,
    thief_physical,
  } = data;

  const url = "https://us-west2-crimen-app-ucc.cloudfunctions.net/app"

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(url + "/old-sinister", data );
      console.log("Returned data:", response);
      setTimeout(setLoading(false), 3000);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);

      setTimeout(() => {
        setError(true);
        setLoading(false);
      }, 3000);
    }
  }

  const loadingMessage = <Alert>{traslate["COMMON"]["LOADING"]}</Alert>;

  const errorMessage = (
    <Alert severity="error">{traslate["COMMON"]["ERROR"]}</Alert>
  );

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="review-content"
    >
      <Grid item>
        <Divider />
      </Grid>
      <Grid item className="review-content">
        <Accordion
          className="review-item"
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItem button className="list-item m-top-1">
              <h3>{traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}</h3>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Tipo de siniestro: ${type}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Franja horaria: ${hour}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Fecha: ${date}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Lugar del hecho: ${place_description}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Acompañamiento: ${accompaniment}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Dinero robado: ${stolen_cash}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Objetos robados: ${stolen_items}`} />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="review-item"
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <ListItem button className="list-ite">
              <h3>{traslate["FORM"]["PERSONALINFO"]["PERSONALINFO"]}</h3>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Altura: ${victim_height}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Vestimenta: ${victim_clothing}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Género: ${victim_gender}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Nombre: ${victim_name}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Contextura física: ${victim_pyshical}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`DNI: ${victim_dni}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Edad: ${victim_age}`} />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className="review-item"
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <ListItem button className="list-ite">
              <h3>{traslate["FORM"]["THEFTDETAILS"]["THIEFINFO"]}</h3>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Perfil del agresor: ${thief_profile}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Edad aproximada: ${thief_age}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Altura: ${thief_height}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Vestimenta: ${thief_clothing}`} />
              </ListItem>

              <ListItem button className="list-item m-top-1">
                <ListItemText primary={`Fisico: ${thief_physical}`} />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item className="m-top-2">
        {isLoading ? loadingMessage : null}
        {error ? errorMessage : null}
      </Grid>

      <Grid item className="m-top-1">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleBack}>
              {traslate["COMMON"]["BACK"]}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              {traslate.COMMON.NEXT}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurrentCrimeReview;