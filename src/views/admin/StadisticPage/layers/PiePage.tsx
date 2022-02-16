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
import Heatmap from "../../../../components/heatmap/Heatmap";
import { StadisticsToChatsFormat } from "../../../../utils/stadistcs-to";
import { StadisticCharModel } from "../../../../models/stadistic.model";
import Translate from "../../../../assets/traslate";

const PiePage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , TRANSLATE = Translate['ES']
        , { admin_state } = useContext(AdminContext)
        , [data, set_data] = useState<StadisticCharModel | undefined>()

    useEffect(() => {
        if (!!admin_state.database) {
            set_data(StadisticsToChatsFormat(admin_state.database)["all"]["struct"]);
        }
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
            <Grid id="capture" item xs={12} container justify="center" >
                <BackButtonString className="m-left-2" />
                <Grid item xs className="m-left-2">
                    <h3>
                        {TRANSLATE.STADISTICS.TITLES.SUMMARY}
                    </h3>
                </Grid>
                <Grid item xs={12} className="p-2">
                    <p>
                    {TRANSLATE.STADISTICS.TITLES.SUMMARY_HINT}
                    </p>
                </Grid>
                {
                    data ?
                        <>
                            {
                                [
                                    {
                                        label: TRANSLATE.STADISTICS.LABELS.CRIME_TYPE,
                                        type: "Bar",
                                        error: !data.crimeType,
                                        data: { ...data.crimeType, datasets: [{ ...data.crimeType?.datasets[0], ...admin_state.config.statistics }] },
                                    },
                                    {
                                        label: TRANSLATE.STADISTICS.LABELS.CRIME_TIME,
                                        type: "Line",
                                        error: !data.crimeTime,
                                        data: { ...data.crimeTime, datasets: [{ ...data.crimeTime?.datasets[0], ...admin_state.config.statistics }] },
                                    },
                                    {
                                        label: TRANSLATE.STADISTICS.LABELS.VICTIM_PHYSICAL,
                                        type: "Bar",
                                        error: !data.victimPhysical,
                                        data: { ...data.victimPhysical, datasets: [{ ...data.victimPhysical?.datasets[0], ...admin_state.config.statistics }] },
                                    },
                                    {
                                        label: TRANSLATE.STADISTICS.LABELS.VICTIM_EMOTIONAL,
                                        type: "Bar",
                                        error: !data.victimEmotional,
                                        data: { ...data.victimEmotional, datasets: [{ ...data.victimEmotional?.datasets[0], ...admin_state.config.statistics }] },
                                    },
                                    {
                                        label: TRANSLATE.STADISTICS.LABELS.VICTIME_AGRESIVE,
                                        type: "Bar",
                                        error: !data.victimAgresive,
                                        data: { ...data.victimAgresive, datasets: [{ ...data.victimAgresive?.datasets[0], ...admin_state.config.statistics }] },
                                    },
                                ].map((v, index) => <MakeChart key={index} {...v} />)
                            }
                            <Grid item xs={12}>
                                <Heatmap label={TRANSLATE.STADISTICS.LABELS.HEAT_MAP} className="p-2" data={data.crimePoints.datasets[0].data.map(e => ([e.lat, e.lng, e.int]))} />
                            </Grid>
                        </>
                        : <NotFoundData />
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