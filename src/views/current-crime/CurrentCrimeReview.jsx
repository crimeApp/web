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

const CurrentCrimeReview = ({ data, handleSubmit, handleBack }) => {
  const first_row = [
    createData("Tipo de siniestro", data.attack_type),
    createData("Franja horaria", data.hour),
    createData("Lugar del hecho", data.place_description),
    createData("Entre calle", data.street_1),
    createData("Y calle", data.street_2),
    createData("Asistencia medica", data.victim_help),
    createData("Daño emocional", `${data.emotional_damage}/5`),
    createData("Daño físico", `${data.physical_damage}/5`)

  ];


  const OnSubmit = () =>{
    return handleSubmit(data);
  } 

  const OnBackward = () => {
    return handleBack(data);
  };

  return (
    <Grid container item xs={12} md={10} justify="center" alignContent="center" alignItems="center">
      <Grid item xs={10} className="p-1">
        <Table size="small">
          <TableBody>
            {first_row.map((row) => (
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

      <Grid item  xs={10} md={4} className="m-top-1 m-bottom-2">
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
