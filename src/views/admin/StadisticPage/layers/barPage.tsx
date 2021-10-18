import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Bar, PolarArea } from 'react-chartjs-2';
import { MockDataCrimeType } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import BackButton from "../../component/BackButton";
import Selector from "../../../../components/selector/Selector";
import Button from "../../../../components/button/Button";
import { uiPrint } from "../../../../utils/ui-print";
import { AdminContext } from "../../../../context/admin-context";

const OPTIONS = ["bar", "polar"]

const BarPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [graphics, set_grapics] = useState(OPTIONS[0])
        , { admin_state } = useContext(AdminContext)
        , [data, set_data] = useState({ ...MockDataCrimeType, datasets: [{ ...MockDataCrimeType.datasets[0], ...admin_state.config.statistics }]})

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container style={{ minHeight: "81vh" }} alignContent="flex-start" justify="center">
            <BackButton xs={1} className="m-left-2" />
            <Grid item xs>
                <h3>Distribucion</h3>
            </Grid>
            <Grid item xs={12} className="p-2" container alignItems="flex-start" alignContent="flex-start">
                <Grid item xs={12}>
                    <p>Distribucion general de los casos en los ultimos 12 meses</p>
                </Grid>
                <Selector
                    xs={12}
                    label="Grafico"
                    value={graphics}
                    options={OPTIONS}
                    onChange={(_, nv) => set_grapics(nv as string)}
                />
            </Grid>
            <Grid id="capture" item xs={12} className="m-top-2" >
                {
                    graphics === "bar"
                        ? <Bar data={data} />
                        : <PolarArea data={data} />
                }
            </Grid>
            <Button
                className="m-top-3"
                xs={12}
                sm={8}
                label="Imprimir"
                onClick={() => uiPrint({ name: "Distribucion" })}
            />
        </Grid>
    </ScaffoldAdmin>
}

export default BarPage;