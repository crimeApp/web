import { Grid, GridSize } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Bar, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import { useHistory } from "react-router";
import Button from "../../../../components/button/Button";

const MakeChart = ({ xs=12, sm=12, md=12, xl=12, label, data, type, error }: { xs?: GridSize, sm?: GridSize, md?: GridSize, xl?: GridSize, error?: boolean, label?: string, data?: any, type?: "PolarArea" | "Pie" | "Bar" | "Radar" | "Line" | string }) => {

    if (error)
        return <Grid item xs={xs} sm={sm} md={md} xl={xl} container justify="center">
            <Grid item xs={12} className="m-top-3" container justify="center">
                <h4>{label}</h4>
            </Grid>
            <Grid>
                <Alert severity="error">
                    No hay suficientes datos para mostrar el grafico
                </Alert>
            </Grid>
        </Grid>

    const opt = {
        plugins: {
            datalabels: {
                display: false
            }
        },
    }
    const Struct = () => {
        switch (type) {
            case "PolarArea":
                return <PolarArea data={data} options={opt} />
            case "Bar":
                return <Bar data={data} options={opt} />
            case "Pie":
                return <Pie data={data} options={opt} />
            case "Radar":
                return <Radar data={data} options={opt} />
            case "Line":
                return <Line data={data} options={opt} />
            default:
                return null
        }
    }

    return <Grid item xs={xs} sm={sm} md={md} xl={xl} container justify="center">
        <Grid item xs={12} className="m-top-2 m-bottom-2" container justify="center">
            <h5>{label}</h5>
        </Grid>
        <Struct />
    </Grid>
}

export default MakeChart;

export const NotFoundData = () => {
    const history = useHistory()
    return <Grid item xs={12} container justify="center" alignItems="center">
        <p className="w500 p-2">No se encontraron datos, haga click en el siguiente boton para seleccionar una base de datos</p>
        <Button xs={8} label="Seleccionar dataset" onClick={() => history.push("/admin/statistics/config")} />
    </Grid>
}