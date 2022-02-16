import React, { useContext, useEffect } from "react";
import HandlePetitions from "../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../hooks/useHandlePage";
import ScaffoldAdmin from "../component/ScaffoldAdmin";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { Settings } from "@material-ui/icons";
import { BackButtonString } from "../component/BackButton";
import { AdminContext } from "../../../context/admin-context";
import Translate from "../../../assets/traslate";

const StadisticsPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        , history = useHistory()
        , TRANSLATE = Translate['ES']

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin className="m-bottom-4 p-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <BackButtonString className="p-left-2 p-top-2"/>
        <Grid item xs={6} className="p-left-2">
            <h3>{TRANSLATE.REPORTS.TITLE}</h3>
        </Grid>
        <Grid item xs={6} container justify="flex-end">
            <IconButton onClick={() => history.push("/admin/statistics/config")}>
                <Settings />
            </IconButton>
        </Grid>
        <Grid item xs={12} className="p-left-2">
            <p>{TRANSLATE.REPORTS.TITLE_HINT}</p>
        </Grid>
        {
            [
                {
                    title: "Historico",
                    description: "Evolucion de los casos en la ciudad de cordoba en el pasar de los meses filtrados por el tipo de caso",
                    href: "statistics/line",
                    img: "line"
                },
                {
                    title: "Distribucion",
                    description: "Como es la evolucion de los tipos de casos en los ultimos 12 meses",
                    href: "statistics/bar",
                    img: "bar"
                },
                {
                    title: "Exploracion",
                    description: "Analisis exploratorio de los sospechosos",
                    href: "statistics/polar",
                    img: "polar"
                },
                {
                    title: "Resumen",
                    description: "Diversos graficos que muestran un analisis general de toda la informacion",
                    href: "statistics/pie",
                    img: "pie"
                },
                {
                    title: "Nuevo",
                    description: "Crea un nuevo dataset de la informacion recolectada",
                    href: "statistics/new",
                    show: admin_state.admin,
                    img: "new"
                },
                {
                    title: "Informes",
                    description: "Visualiza todos los informes disponibles",
                    href: "datasets",
                    show: admin_state.admin,
                    img: "pie"
                }
            ].map((data, index) => <Cards key={index} {...data} />)
        }
    </ScaffoldAdmin>
}

export default StadisticsPage;


const Cards = ({ title, description, href, img, show = true }: { show?: boolean, title: string, description: string, href: string, img: string }) => {

    const history = useHistory()

    if(!show) return null;

    return <Grid item xs={12} sm={6} md={4} className="p-1" >
        <Grid item xs={12} className="m-top-1 m-bottom-1 background-color-white border-small p-2 hover" container onClick={() => history.push(`/admin/${href}`)} style={{ height: "100%" }} >
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