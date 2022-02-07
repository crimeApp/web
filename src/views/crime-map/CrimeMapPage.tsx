import React, { useState, useEffect } from "react";
import Scaffold from "../../components/scaffold/scaffold";
import { Grid } from "@material-ui/core";
import { StadisticCharModel, StadisticModel } from "../../models/stadistic.model";
import useHandlePage from "../../hooks/useHandlePage";
import { HandleAPI } from "../../utils/handle-api";
import Translate from "../../assets/traslate";
import { useHistory } from "react-router-dom";
import { StadisticsToChatsFormat } from "../../utils/stadistcs-to";
import Button from "../../components/button/Button";
import Heatmap from "../../components/heatmap/Heatmap";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import { BackButtonString } from "../admin/component/BackButton";
import MakeChart from "../admin/StadisticPage/layers/commond";


const CrimeMapPage = () => {

  const [data, set_data] = useState<StadisticCharModel>()
  const [handle_page, set_handle_page] = useHandlePage({ loading: true })
  const TRANSLATE = Translate['ES'];
  const history = useHistory();
  const [dataset, set_dataset] = useState<StadisticModel>();
  const colorDataChars = {
    backgroundColor: ["#e77c8d", "#c69255", "#98a255", "#56ad74", "#5aa9a2", "#5ea5c5"],
    borderColor: ['#fff'],
    borderWidth: 2,
  };

  useEffect(() => {
    (async () => {
      const request = await HandleAPI({
        method: "get",
        path: '/admin/stadistic',
      })

      if (!request) return set_handle_page({
        loading: false,
        error: true,
        notification: true,
        severity: "error",
        color: "red",
        msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
      })

      switch (request.status) {
        case 200:
          set_dataset(request.data)
          set_data(StadisticsToChatsFormat(request.data)["all"]["struct"]);
          return set_handle_page(prev => ({
            ...prev,
            loading: false
          }))
        case 404:
          return set_handle_page({
            loading: false,
            error: true,
            severity: "error",
            color: "red",
            msg: TRANSLATE.ERRORS.NOT_FOUND_DATA,
            callback: () => history.goBack()
          })
        default:
          return set_handle_page({
            loading: false,
            error: true,
            notification: true,
            color: "red",
            severity: "error",
            msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
          })
      }
    })();
  }, [])
  return (
    <Scaffold>
      <HandlePetitions
        handlePage={handle_page}
        setHandlePage={set_handle_page}
      />
      <Grid item xs={12} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container justify="center">
        <Grid id="capture" item xs={12} container justify="center" >
          <BackButtonString className="m-left-2" />
          <Grid item xs className="m-left-2">
            <h3>
              {TRANSLATE.STADISTICS.TITLES.PUBLIC}
            </h3>
          </Grid>
          <Grid item xs={12} className="p-left-2">
            <p>
            {TRANSLATE.STADISTICS.TITLES.PUBLIC_HINT}
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
                      data: { ...data.crimeType, datasets: [{ ...data.crimeType.datasets[0], ...colorDataChars }] },
                    },
                    {
                      label: TRANSLATE.STADISTICS.LABELS.CRIME_TIME,
                      type: "Line",
                      data: { ...data.crimeTime, datasets: [{ ...data.crimeTime.datasets[0], ...colorDataChars }] },
                    },
                    {
                      label: TRANSLATE.STADISTICS.LABELS.VICTIM_PHYSICAL,
                      type: "Bar",
                      data: { ...data.victimPhysical, datasets: [{ ...data.victimPhysical.datasets[0], ...colorDataChars }] },
                    },
                    {
                      label: TRANSLATE.STADISTICS.LABELS.VICTIM_EMOTIONAL,
                      type: "Bar",
                      data: { ...data.victimEmotional, datasets: [{ ...data.victimEmotional.datasets[0], ...colorDataChars }] },
                    },
                    {
                      label: TRANSLATE.STADISTICS.LABELS.VICTIME_AGRESIVE,
                      type: "Bar",
                      data: { ...data.victimAgresive, datasets: [{ ...data.victimAgresive.datasets[0], ...colorDataChars }] },
                    },
                  ].map(v => <MakeChart {...v} />)
                }
                <Grid item xs={12}>
                  <Heatmap label={TRANSLATE.STADISTICS.LABELS.HEAT_MAP} className="p-2" data={data.crimePoints.datasets[0].data.map(e => ([e.lat, e.lng, e.int]))} />
                </Grid>
              </>
              : null
          }
        </Grid>
      </Grid>
    </Scaffold>
  );
};

export default CrimeMapPage;
