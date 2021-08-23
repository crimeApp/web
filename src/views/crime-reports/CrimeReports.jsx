import React, { useState } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import { Grid, Card } from "@material-ui/core";
import yup from "../../utils/yup";

//import axios from "axios";

import traslate from "../../assets/traslate/es.json";
import Validator from "../../utils/validator";
import { time_options } from "../../assets/options";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Switches from "../../components/switch/Switch";
import Select from "../../components/select/Select";
import DiscreteSlider from "../../components/slider/Slider";

/*
Because the app could not work properly on Firefox with ChartJS, 
("ReferenceError: "ResizeObserver is not defined"), we had to install @juggle/resize-observer. 
For more details: https://github.com/juggle/resize-observer
*/
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";

//For charts
import { Bar, Doughnut, Line } from "react-chartjs-2";

if (typeof window !== "undefined") {
  window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
}

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const schema = yup.object({
  time_fraction: yup.mixed().oneOf(time_options).default(""),
  date: yup.date().optional().default(""),
  location: yup.string().optional().default(""),
  armed: yup.boolean().optional().default(false),
  agressiveness: yup.number().optional().default(1),
});

const CrimeReports = () => {
  const [form_data, set_data] = useState({
    ...schema.getDefault(),
  });

  const [error, setError] = useState();

  const HandleChange = (name, value) =>
    set_data((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  async function HandleSubmit(event) {
    setError({});

    const resp = await Validator(form_data, schema);

    if (resp.err) return setError(resp.data);

    /*  try {
                                   const response = await axios.post(url + "/new-sinister", form_data);
                                   if (response) {
                                     setLoading(false);
                                   }
                                 } catch (e) {
                                   setTimeout(() => {
                                     setError(true);
                                     setLoading(false);
                                   }, 3000);
                                 } */
  }

  const InputConstructor = (name) => ({
    name,
    xs: 12,
    md: 8,
    //@ts-ignore
    value: form_data[name],
    className: "p-1",
    color: "light-gray",
    error: error?.[name]?.error,
    error_msg: error?.[name]?.msg,
    onChange: (event) => HandleChange(name, event.target.value),
  });

  return (
    <Scaffold>
      <Grid
        item
        xs={12}
        container
        direction="row"
        className="background-color-card-background"
        alignItems="center"
        alignContent="center"
        justify="center"
      >
        <Grid item xs={12} md={12} className="p-left-1">
          <h2>Algunos informes de nuestra ciudad</h2>
          <p className="home-subtitle">
            {traslate["CRIME-MAP"]["DESCRIPTION"]}
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          className="background-color-light-gray p-left-3 p-top-2 p-bottom-2"
        >
          <h3>Reportes estáticos</h3>
        </Grid>
        <Grid
          item
          xs={12}
          container
          className="p-1"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={2}>
            <h4 className="p-left-2">Title Bar</h4>
            <Doughnut data={data} />
          </Grid>

          <Grid item xs={12} md={4}>
            <h4 className="p-left-2">Title Bar</h4>
            <Bar data={data} />
          </Grid>
          <Grid item xs={12} md={4}>
            <h4 className="p-left-2">Title Bar</h4>
            <Line data={data} />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          className="p-left-3 p-top-2 p-bottom-2 background-color-light-gray"
        >
          <h3>Reportes dinámicos</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          container
          justify="center"
          alignItems="flex-start"
          alignContent="center"
        >
          <Grid
            item
            xs={12}
            md={4}
            container
            className="m-top-2 border-medium border-normal"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Input
              {...InputConstructor("date")}
              type="date"
              label={traslate.FORM.THEFTINFO.DATE}
            />

            <Input
              {...InputConstructor("location")}
              type="text"
              label={traslate.FORM.THEFTINFO.LOCATION}
            />

            <Select
              {...InputConstructor("time_fraction")}
              label={traslate.FORM.THEFTINFO.TIMEFRACTION}
              options={time_options}
            />

            <Button
              color="violet"
              md={5}
              xs={8}
              className="p-1"
              label={"Consultar"}
              onClick={HandleSubmit}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            className="p-1"
            justify="space-around"
            alignItems="flex-start"
            alignContent="center"
          >
            <Grid item xs={12} md={2}>
              <h4 className="p-left-2">Title Bar</h4>
              <Doughnut data={data} />
            </Grid>

            <Grid item xs={12} md={4}>
              <h4 className="p-left-2">Title Bar</h4>
              <Bar data={data} />
            </Grid>

            <Grid item xs={12} md={4}>
              <h4 className="p-left-2">Title Bar</h4>
              <Line data={data} />
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} md={12}>
          
        </Grid> */}
      </Grid>
    </Scaffold>
  );
};

export default CrimeReports;
