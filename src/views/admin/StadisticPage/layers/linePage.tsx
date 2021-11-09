import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { BackButton, BackButtonString } from "../../component/BackButton";
import Button from "../../../../components/button/Button";
import { Line } from 'react-chartjs-2';
import { MockDataCrimeTemp, MockDataCrimeTempHurto, MockDataCrimeTempRobo, MockDataCrimeType } from "../../__data__/stadistics";
import { Grid } from "@material-ui/core";
import Selector from "../../../../components/selector/Selector";
import { uiPrint } from "../../../../utils/ui-print";
import { AdminContext } from "../../../../context/admin-context";
import { DataStructChar, StadisticCharModel, StadisticModel } from "../../../../models/stadistic.model";
import Select from "../../../../components/select/Select";
import { GetTypeCrimeByMonth, StadisticsToChatsFormat } from "../../../../utils/stadistcs-to";
import { attack_type_options } from "../../../../assets/options";

const LinePage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , [dataset, set_dataset] = useState(attack_type_options[0])
        , { admin_state } = useContext(AdminContext)
        , [data, set_data] = useState<DataStructChar | undefined>()
        , [selected, set_selected] = useState<string>('2021')
        , [years, set_years] = useState<string[]>([])
        , handleDataset = (_: any, nv: string | null) => {
            set_dataset(nv as string)
            /* switch (nv) {
                case OPTIONS[0]:
                    return set_data({ ...MockDataCrimeTempRobo, datasets: [{ ...MockDataCrimeTempRobo.datasets[0], ...admin_state.config.statistics }]})
                case OPTIONS[1]:
                    return set_data({ ...MockDataCrimeTempHurto, datasets: [{ ...MockDataCrimeTempHurto.datasets[0], ...admin_state.config.statistics }]})
                default:
                    return set_data({ ...MockDataCrimeTemp, datasets: [{ ...MockDataCrimeTemp.datasets[0], ...admin_state.config.statistics }]})
            } */
        }

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
        ? set_data(GetTypeCrimeByMonth(admin_state.database, selected, dataset))
        : undefined,
        [selected, dataset])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
            <BackButtonString className="m-left-2 p-1" />
            <Grid item xs className="m-left-2">
                <h3 className="p-1">Evolucion de los datos</h3>
            </Grid>
            <Grid item xs={12} className="p-2" container alignContent="flex-start" justify="center">
                <Grid item xs={12} className="p-1">
                    <p>El dataset esta conformado por la evolucion historica de los tipos de casos.</p>
                </Grid>
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
                    label="Dataset"
                    color="light-gray"
                    value={dataset}
                    options={attack_type_options}
                    onChange={(e, _) => set_dataset(e.target.value as string)}
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