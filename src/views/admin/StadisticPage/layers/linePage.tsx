import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import BackButton from "../../component/BackButton";
import Button from "../../../../components/button/Button";
import { Line } from 'react-chartjs-2';
import { MockDataCrimeTemp, MockDataCrimeTempHurto, MockDataCrimeTempRobo, MockDataCrimeType } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import Selector from "../../../../components/selector/Selector";
import { uiPrint } from "../../../../utils/ui-print";
import { AdminContext } from "../../../../context/admin-context";

const OPTIONS = ["Robo a mano armada", "Hurto", "Robo con arma blanca"]

const LinePage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [dataset, set_dataset] = useState(OPTIONS[0])
        , { admin_state } = useContext(AdminContext)
        , [data, set_data] = useState({ ...MockDataCrimeType, datasets: [{ ...MockDataCrimeType.datasets[0], ...admin_state.config.statistics }]})
        , handleDataset = (_: any, nv: string | null) => {
            set_dataset(nv as string)
            switch (nv) {
                case OPTIONS[0]:
                    return set_data({ ...MockDataCrimeTempRobo, datasets: [{ ...MockDataCrimeTempRobo.datasets[0], ...admin_state.config.statistics }]})
                case OPTIONS[1]:
                    return set_data({ ...MockDataCrimeTempHurto, datasets: [{ ...MockDataCrimeTempHurto.datasets[0], ...admin_state.config.statistics }]})
                default:
                    return set_data({ ...MockDataCrimeTemp, datasets: [{ ...MockDataCrimeTemp.datasets[0], ...admin_state.config.statistics }]})
            }
        }

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
            <BackButton xs={1} className="m-left-2" />
            <Grid item xs>
                <h3>Evolucion de los datos</h3>
            </Grid>
            <Grid item xs={12} className="p-2" container alignContent="flex-start" justify="center">
                <Grid item xs={12}>
                    <p>El dataset esta conformado por la evolucion historica de los tipos de casos.</p>
                </Grid>
                <Selector
                    xs={12}
                    label="Dataset"
                    value={dataset}
                    options={OPTIONS}
                    onChange={handleDataset}
                />
            </Grid>
            <Grid id="capture" item xs={12} className="m-top-2" >
                <Line data={data} />
            </Grid>
            <Button
                className="m-top-3"
                xs={12}
                sm={8}
                label="Imprimir"
                onClick={() => uiPrint({ name: "Evolucion" })}
            />
        </Grid>
    </ScaffoldAdmin>
}

export default LinePage;