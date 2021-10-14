import { Grid } from "@material-ui/core";
import React from "react";
import { Bar, Line, Pie, PolarArea, Radar } from "react-chartjs-2";

const MakeChart = ({ label, data, type }: { label: string, data: any, type: "PolarArea" | "Pie" | "Bar" | "Radar" | "Line" | string}) => {

    const Struct = () => {
        switch (type) {
            case "PolarArea":
                return <PolarArea data={data}/>
            case "Bar":
                return <Bar data={data} />
            case "Pie":
                return <Pie data={data} />
            case "Radar":
                return <Radar data={data} />
            case "Line":
                return <Line data={data} />
            default:
                return null
        }
    }

    return <Grid item xs={12} container justify="center">
        <Grid item xs={12} className="m-top-3 m-bottom-3" container justify="center">
            <h4>{label}</h4>
        </Grid>
        <Struct />
    </Grid>
}

export default MakeChart;