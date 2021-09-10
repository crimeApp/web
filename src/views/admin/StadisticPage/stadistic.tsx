import React, { useEffect } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router";

const StadisticsPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin className="m-bottom-4 p-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} className="p-left-2 p-top-2">
            <h3>Estadisticas</h3>
        </Grid>
        {
            [
                {
                    title: "Cantidad de siniestros",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses",
                    href: "line",
                    img: "line"
                },
                {
                    title: "Conformacion de los casos en el ultimo mes",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses",
                    href: "bar",
                    img: "bar"
                },
                {
                    title: "Exploracion de involucrados",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses",
                    href: "polar",
                    img: "polar"
                },
                {
                    title: "C",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses",
                    href: "pie",
                    img: "pie"
                }
            ].map((data, index) => <Cards key={index} {...data} />)
        }
    </ScaffoldAdmin>
}

export default StadisticsPage;


const Cards = ({ title, description, href, img}: { title: string, description: string, href: string, img: string }) => {

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