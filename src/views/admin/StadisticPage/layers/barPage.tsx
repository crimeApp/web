import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import { MockDataCrimeType } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import { BackButton, BackButtonString } from "../../component/BackButton";
import Selector from "../../../../components/selector/Selector";
import Button from "../../../../components/button/Button";
import { uiPrint } from "../../../../utils/ui-print";
import { AdminContext } from "../../../../context/admin-context";
import { GetTotalByMonth, StadisticsToChatsFormat } from "../../../../utils/stadistcs-to";
import { StadisticCharModel, StadisticModel } from "../../../../models/stadistic.model";
import { NotFoundData } from "./commond";
import Select from "../../../../components/select/Select";

const OPTIONS = ["bar", "polar", "line"]

const BarPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [graphics, set_grapics] = useState(OPTIONS[0])
        , { admin_state } = useContext(AdminContext)
        , [data, set_data] = useState<any>()
        , [years, set_years] = useState<string[]>([])
        , [selected, set_selected] = useState<string>()

    useEffect(() => {
        if (!!admin_state.database) {
            const model = StadisticsToChatsFormat(admin_state.database) as StadisticModel
                , years_temp = Object.keys(model).filter(str => !isNaN(parseFloat(str)))
            set_years(years_temp)
            set_selected(years_temp[0])
        }
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    useEffect(() => (!!admin_state.database && selected)
        ? set_data(GetTotalByMonth(admin_state.database, selected))
        : undefined,
        [selected])


    return <ScaffoldAdmin className="m-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container alignContent="flex-start" justify="center">
            <BackButtonString className="p-left-2" />
            <Grid item xs className="p-left-2">
                <h3>Distribucion</h3>
            </Grid>
            <Grid item xs={12} className="p-2" container alignItems="flex-start" alignContent="flex-start">
                <Grid item xs={12}>
                    <p>Distribucion general de los casos en los ultimos 12 meses</p>
                </Grid>
            </Grid>
            {
                data && selected ? <>
                    <Select
                        xs={12}
                        label="Año"
                        value={selected}
                        color="light-gray"
                        options={years}
                        onChange={(e, _) => set_selected(e.target.value as string)}
                    />
                    <Select
                        xs={12}
                        label="Tipo de grafico"
                        color="light-gray"
                        value={graphics}
                        options={OPTIONS}
                        onChange={(e, _) => set_grapics(e.target.value as string)}
                    />
                    <Grid id="capture" item xs={12} className="m-top-2" >
                        {
                            graphics === "bar"
                                ? <Bar data={{ ...data, datasets: [{ ...data.datasets[0], ...admin_state.config.statistics }] }} />
                                : graphics === "line" ? <Line data={{ ...data, datasets: [{ ...data.datasets[0], ...admin_state.config.statistics }] }} />
                                    : <PolarArea data={{ ...data, datasets: [{ ...data.datasets[0], ...admin_state.config.statistics }] }} />
                        }
                    </Grid>
                    <Button
                        className="m-top-3"
                        xs={12}
                        sm={8}
                        label="Imprimir"
                        onClick={() => uiPrint({ name: "Distribucion" })}
                    />
                </> : <NotFoundData />
            }

        </Grid>
    </ScaffoldAdmin>
}

export default BarPage;