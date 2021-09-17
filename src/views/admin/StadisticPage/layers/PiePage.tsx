import React, { useEffect } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Bar, Pie, PolarArea } from 'react-chartjs-2';
import { MockDataCrimePlace, MockDataCrimeTemp, MockDataCrimeType } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import BackButton from "../../component/BackButton";
import Button from "../../../../components/button/Button";
import { uiPrint } from "../../../../utils/ui-print";
import MakeChart from "./commond";

const PiePage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white" container justify="center">
            <BackButton />
            <Grid id="capture" item xs={12} container justify="center" >
                <Grid item xs={12} className="p-2">
                    <h3>Resumen</h3>
                </Grid>
                <Grid item xs={12} className="p-2">
                    <p>Analisis con diferentes perspectiva de los casos</p>
                </Grid>
                {
                    [
                        {
                            label: "Tipo de robo",
                            type: "Bar",
                            data: MockDataCrimeType,
                        },
                        {
                            label: "Lugar",
                            type: "Radar",
                            data: MockDataCrimePlace,
                        },
                    ].map(v => <MakeChart {...v} />)
                }
            </Grid>
            <Button
                className="m-top-3"
                xs={12}
                sm={8}
                label="Imprimir"
                onClick={() => uiPrint({})}
            />
        </Grid>
    </ScaffoldAdmin >
}

export default PiePage;