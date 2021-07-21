import React, { useState } from "react";
import traslate from "../../assets/traslate/es.json";
import axios from "axios";
import {
  Grid,
  Button,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(name, value) {
  return { name, value };
}

const CurrentCrimeReview = ({ data, handleNext, handleBack }) => {
  const first_row = [
    createData("Tipo de siniestro", data.attack_type),
    createData("Franja horaria", data.hour),
    createData(
      "Fecha",
      `${data.date.getDay()}/${data.date.getMonth()}/${data.date.getYear()}`
    ),
    createData("Lugar del hecho", data.place_description),
    createData("Acompañamiento", data.accompaniment),
    createData("Objetos robados", data.stolen_items),
    createData("Dinero robado", data.stolen_cash),
  ];

  const second_row = [
    createData("Nombre", data.victim_name),
    createData("DNI", data.victim_dni),
    createData("Edad", data.victim_age),
    createData("Sexo", data.victim_sex),
    createData("Altura", data.victim_height),
    createData("Vestimenta", data.victim_clothing),
    createData("Contextura fisíca", data.victim_physical),
  ];

  const third_row = [
    createData("Perfil del agresor", data.thief_profile),
    createData("Edad", data.thief_age),
    createData("Sexo", data.thief_sex),
    createData("Altura", data.thief_height),
    createData("Vestimenta", data.thief_clothing),
    createData("Contextura fisíca", data.thief_physical),
    createData("Denuncia", data.thief_complaint),
    createData("Arrestado", data.thief_arrested),
  ];

  console.log(data.thief_arrested);

  const url = "https://us-west2-crimen-app-ucc.cloudfunctions.net/app";

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const OnBackward = () => {
    return handleBack(data);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(data);
      const response = await axios.post(url + "/new-sinister", data.toJSON());
      console.log("Returned data:", response);
      setTimeout(setLoading(false), 3000);
    } catch (e) {
      console.log(`Axios request failed:  ${e}`);

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
    <Grid container justify="center" alignItems="flex-start">
      <Grid item xs={12} md={4} className="p-1">
        <p className="w500 color-black m-top-1">
          {traslate["FORM"]["PERSONALINFO"]["PERSONALINFO"]}
        </p>
        <Table size="small">
          <TableBody>
            {second_row.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={12} md={4} className="p-1">
        <p className="w500 color-black m-top-1">
          {traslate["FORM"]["THEFTINFO"]["THIEFINFO"]}
        </p>
        <Table size="small">
          <TableBody>
            {first_row.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item  xs={12} md={4} className="p-1 ">
      <p className="w500 color-black m-top-1">
          {traslate["FORM"]["THEFTDETAILS"]["THIEFINFO"]}
        </p>
        <Table size="small">
          <TableBody>
            {third_row.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {row.value !== true || false ? (
                  <TableCell align="right">{row.value}</TableCell>
                ) : (
                    <TableCell align="right">{row.value? 'Si' : 'No'}</TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item  xs={12} md={4} className="m-top-2 m-bottom-1">
        {isLoading ? loadingMessage : null}
        {error ? errorMessage : null}
      </Grid>

      <Grid item  xs={8} md={4} className="m-top-1 m-bottom-2">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="m-right-3"
          onClick={OnBackward}
        >
          {traslate.COMMON.BACK}
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className=" m-left-3"
          onClick={handleSubmit}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CurrentCrimeReview;
