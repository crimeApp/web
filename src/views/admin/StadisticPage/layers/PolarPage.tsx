import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Grid } from "@material-ui/core";
import { BackButtonString } from "../../component/BackButton";
import Button from "../../../../components/button/Button";
import { uiPrint } from "../../../../utils/ui-print";
import MakeChart, { NotFoundData } from "./commond";
import { AdminContext } from "../../../../context/admin-context";
import { StadisticsToChatsFormat } from "../../../../utils/stadistcs-to";
import { StadisticCharModel } from "../../../../models/stadistic.model";

const PolarPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state } = useContext(AdminContext)
        // @ts-ignore
        , [data, set_data] = useState<StadisticCharModel | undefined>(StadisticsToChatsFormat(admin_state.database)["all"]["struct"])

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
            <Grid id="capture" item xs={12} container >
                <BackButtonString className="p-left-2"/>
                <Grid item xs className="p-left-2" >
                    <h3>Exploracion</h3>
                </Grid>
                <Grid item xs={12} className="p-2">
                    <p>Analisis exploratorio de las caracteristicas de los sospechosos</p>
                </Grid>
                {
                    data ?
                        [
                            data.crimeHeight ? {
                                label: "Altura",
                                type: "Bar",
                                data: { ...data.crimeHeight, datasets: [{ ...data.crimeHeight.datasets[0], ...admin_state.config.statistics }] },
                            } : {},
                            data.crimeAge ? {
                                label: "Franja Etaria",
                                type: "Radar",
                                data: { ...data?.crimeAge, datasets: [{ ...data?.crimeAge.datasets[0], ...admin_state.config.statistics }] },
                            } : {},
                            data.crimeHair ? {
                                label: "Color de pelo",
                                type: "Bar",
                                data: { ...data?.crimeHair, datasets: [{ ...data?.crimeHair.datasets[0], ...admin_state.config.statistics }] },
                            } : {},
                            data.crimeSkin ? {
                                label: "Color de piel",
                                type: "Pie",
                                data: { ...data?.crimeSkin, datasets: [{ ...data?.crimeSkin.datasets[0], ...admin_state.config.statistics }] },
                            } : {},
                            data.crimeSex ? {
                                label: "Sexo",
                                type: "Pie",
                                data: { ...data?.crimeSex, datasets: [{ ...data?.crimeSex.datasets[0], ...admin_state.config.statistics }] },
                            } : {},
                            data.crimeAccompaniment ? {
                                label: "Cantidad de sospechosos extra",
                                type: "Bar",
                                data: {
                                    ...data?.crimeAccompaniment, datasets: [{ ...data?.crimeAccompaniment.datasets[0], ...admin_state.config.statistics }]
                                }
                            } : {}
                        ].map(v => <MakeChart {...v} />)
                        : <NotFoundData />
                }
            </Grid>
            {
                data && <Button
                    className="m-top-3"
                    xs={12}
                    sm={8}
                    label="Imprimir"
                    onClick={() => uiPrint({ name: "Exploracion" })}
                />
            }

        </Grid>
    </ScaffoldAdmin>
}

export default PolarPage;