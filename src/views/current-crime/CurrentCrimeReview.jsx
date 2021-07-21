import React from "react";
import traslate from "../../assets/traslate/es.json";
import {
  Grid,
  Button,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";

function createData(name, value) {
  return { name, value };
}

const CurrentCrimeReview = ({ data, isLoading, error, handleSubmit, handleBack }) => {
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

  const OnSubmit = () =>{
    return handleSubmit(data);
  }

  const OnBackward = () => {
    return handleBack(data);
  };

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
                {typeof row.value !==  'boolean'? (
                  <TableCell align="right">{row.value}</TableCell>
                ) : (
                    <TableCell align="right">{row.value? 'Si' : 'No'}</TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          onClick={OnSubmit}
        >
          {traslate.COMMON.NEXT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CurrentCrimeReview;
