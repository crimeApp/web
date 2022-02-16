import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import { Grid, GridSize } from "@material-ui/core";
import { BackButtonString } from "../../component/BackButton";
import Input from "../../../../components/input/Input";
import Switches from "../../../../components/switch/Switch";
import Map from "../../../../components/map/Map";
import Button from "../../../../components/button/Button";
import Translate from "../../../../assets/traslate";
import GeoHash from "../../../../utils/hashing";
import { HandleAPI } from "../../../../utils/handle-api";
import { AdminContext } from "../../../../context/admin-context";
import { useHistory } from "react-router-dom";
import { ColorCA } from "../../../../style/type-style";
import yup from "../../../../utils/yup";
import Validator from "../../../../utils/validator";
import Tags from "../../../../components/tags/Tags";

const schema = yup.object().shape({
    name: yup.string().max(50).required(),
    description: yup.string().max(150).required(),
    start: yup.date(),
    end: yup.date(),
    tags: yup.array().of(yup.string())
})

const NewStadisticPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({})
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , [map, set_map] = useState(false)
        , [map_value, set_map_value] = useState<any>()
        , TRANSLATE = Translate['ES']
        , history = useHistory()
        , [form, set_form] = useState<any>({
            name: "",
            description: "",
            hash: "",
            tags: []
        })
        , [errors, set_errors] = useState<any>()
        , inputConstructor = (name: string) => ({
            name,
            xs: 12 as GridSize,
            value: form[name],
            color: "light-gray" as ColorCA,
            label: TRANSLATE.LABELS[name.toUpperCase()],
            // @ts-ignore
            onChange: (e) => set_form(prev => ({ ...prev, [e.target.name]: e.target.value })),
            error: errors?.[name]?.error,
            error_msg: errors?.[name]?.msg
        })
        , handleSummit = async () => {
            set_handle_page( prev => ({
                ...prev,
                loading: true,
            }))
            set_errors({})

            const { data, err } = await Validator(form, schema)
            if(err) {
                set_errors(data)
                return  set_handle_page( prev => ({ ...prev, loading: false }))
            }

            if(form.start && form.end && form.start > form.end) {
                set_handle_page( prev => ({ ...prev, loading: false }))
                return set_errors({
                    end: {
                        error: true,
                        msg: TRANSLATE.ERRORS.TO_DATE_ERROR
                    }
                });
            }

            let hash;

            if (map && map_value) {
                hash = GeoHash(map_value.lat, map_value.lng)
            }

            const request = await HandleAPI({
                method: "post",
                path: '/admin/stadistic',
                data: {
                    ...form,
                    hash: hash
                },
                config: {
                    headers: {
                        Authorization: `Bearer ${admin_state.token}`
                    }
                }
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
                    admin_dispatch({ type: "CHANGE_DB", payload: request.data })
                    return set_handle_page(prev => ({
                        ...prev,
                        loading: false,
                        notification: true,
                        msg: TRANSLATE.OK.SAVE,
                        severity: "success",
                        color: "green",
                        callback: () => history.goBack()
                    }))
                case 400:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
                        callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                    })
                case 401:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.UNAUTH,
                        callback: () => history.push(TRANSLATE.ROUTES.ADMIN.LOGIN)
                    })
                case 403:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.NOT_ADMIN,
                        callback: () => history.goBack()
                    })
                case 404:
                    return set_handle_page({
                        loading: false,
                        error: true,
                        severity: "error",
                        color: "red",
                        msg: TRANSLATE.ERRORS.BAD_REQUEST,
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
        }

    return <ScaffoldAdmin className="m-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} md={6} className="p-top-2 p-left-2 p-right-2 p-bottom-4 border-small background-color-white shadow" container alignContent="flex-start" justify="center">
            <BackButtonString className="p-left-2" />
            <Grid item xs className="p-left-2">
                <h3>{TRANSLATE.DATASETS.NEW_DATASET}</h3>
            </Grid>
            <Grid item xs={12} className="p-left-2 p-right-2 m-bottom-2">
                <p>{TRANSLATE.DATASETS.NEW_DATASET_SUBTITLE}</p>
            </Grid>
            <Input { ...inputConstructor('name') } />
            <Input { ...inputConstructor('description') } />
            <Input { ...inputConstructor('start') } label={TRANSLATE.LABELS.START_DATE} type="date" />
            <Input { ...inputConstructor('end') } label={TRANSLATE.LABELS.END_DATE} type="date" />
            <Tags 
                tags={form.tags} 
                label="Etiquetas para el informe"
                onChange={(_, tags) => set_form(prev => ({ ...prev, tags }))}
                maxTags={10}
                maxLenght={40}
                msg="Precione Enter para guardar la etiqueta"
                buttonLabel={TRANSLATE.COMMON.SELECT} />
            <Switches label={TRANSLATE.LABELS.FIND_BY_AREA} value={map} onChange={() => set_map(!map)} />
            {
                map && <Map position={map_value} onChange={(nv, _) => set_map_value(nv)} />
            }
            <Button className="m-top-3" xs={12} sm={6} label={TRANSLATE.COMMON.SAVE} onClick={handleSummit} />
        </Grid>
    </ScaffoldAdmin>
}

export default NewStadisticPage;