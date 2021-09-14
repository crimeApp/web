import React, { useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import { UserModel } from "../../../../models/user.models";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import { MockData } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import BackButton from "../../component/BackButton";
import Selector from "../../../../components/selector/Selector";

const OPTIONS = ["bar", "polar"]

const BarPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [graphics, set_grapics] = useState(OPTIONS[0])

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white" container style={{ minHeight: "81vh"}} alignContent="flex-start">
            <BackButton />
            <Grid item xs={12} className="p-2">
                <h3>Cantidad de siniestros</h3>
            </Grid>
            <Grid item xs={12} sm={6} className="p-2" container alignItems="flex-start" alignContent="flex-start">
                <Grid item xs={12}>
                    <p>Descripcion total de bla bla bla</p>
                </Grid>
                <Selector
                    xs={12}
                    label="Grafico"
                    value={graphics}
                    options={OPTIONS}
                    onChange={(_, nv) => set_grapics(nv as string)}
                />
            </Grid>
            <Grid item xs={12} sm={6} >
                {graphics === "bar" ? <Bar data={MockData} /> : <PolarArea data={MockData} />}
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default BarPage;