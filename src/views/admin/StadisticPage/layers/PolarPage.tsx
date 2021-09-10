import React, { useEffect } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { PolarArea } from 'react-chartjs-2';
import { MockDataCrimeTemp } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import BackButton from "../../component/BackButton";

const PolarPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])


    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white" container>
            <BackButton />
            <Grid item xs={12} className="p-2">
                <h3>Cantidad de siniestros</h3>
            </Grid>
            <Grid item xs={12} sm={4} className="p-2">
                <p>Descripcion total de bla bla bla</p>
            </Grid>
            <Grid item xs={12} sm={8} >
                <PolarArea data={MockDataCrimeTemp} />
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default PolarPage;