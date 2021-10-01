import React, { useEffect } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { Settings } from "@material-ui/icons";

const StadisticsPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , history = useHistory()

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin className="m-bottom-4 p-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={6} className="p-left-2 p-top-2">
            <h3>Estadisticas</h3>
        </Grid>
        <Grid item xs={6} container justify="flex-end">
            <IconButton onClick={() => history.push("/admin/statistics/config")}>
                <Settings />
            </IconButton>
        </Grid>
        {
            [
                {
                    title: "Historico",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses filtrados por el tipo de caso",
                    href: "line",
                    img: "line"
                },
                {
                    title: "Distribucion",
                    description: "Como es la evolucion de los tipos de casos en los ultimos 12 meses",
                    href: "bar",
                    img: "bar"
                },
                {
                    title: "Exploracion",
                    description: "Analisis exploratorio de los sospechosos",
                    href: "polar",
                    img: "polar"
                },
                {
                    title: "Resumen",
                    description: "Diversos graficos que muestran un analisis general de toda la informacion",
                    href: "pie",
                    img: "pie"
                }
            ].map((data, index) => <Cards key={index} {...data} />)
        }
    </ScaffoldAdmin>
}

export default StadisticsPage;


const Cards = ({ title, description, href, img }: { title: string, description: string, href: string, img: string }) => {

    const history = useHistory()

    return <Grid item xs={12} sm={6} md={4} className="p-1" >
        <Grid item xs={12} className="m-top-1 m-bottom-1 background-color-white border-small p-2 hover" container onClick={() => history.push(`/admin/statistics/${href}`)} style={{ height: "100%" }} >
            <Grid item xs={12}>
                <h4>{title}</h4>
            </Grid>
            <Grid item xs={12}>
                <p>{description}</p>
            </Grid>
            <Grid item xs={12}>
                <img src={process.env.PUBLIC_URL + "/assets/grafics/" + img + ".png"} style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "6rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }} />
            </Grid>
        </Grid>
    </Grid>
}