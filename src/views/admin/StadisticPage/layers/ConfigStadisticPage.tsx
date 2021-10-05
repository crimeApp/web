import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import BackButton from "../../component/BackButton";
import { AdminContext } from "../../../../context/admin-context";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { UnixToDate, UnixToDay } from "../../../../utils/time";
import { parseJwt } from "../../../../utils/token";
import { useHistory } from "react-router";

const ConfigStadisticPage = () => {
    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , [state, set_state] = useState({
            ...admin_state.config.statistics
        })
        , history = useHistory()
        , [data, set_data] = useState({
            date: 0,
            user_id: ""
        })
        , SubmitConfig = () => {
            admin_dispatch({
                type: "CHANGE_CONFIG",
                payload: {
                    statistics: state
                }
            })
            set_handle_page(prev => ({
                ...prev,
                notification: true,
                loading: false,
                msg: "Cambios guardados correctamente",
                severity: "success"
            }))
        }
        , updateStadistics = () => {
            set_handle_page(prev => ({
                ...prev,
                loading: true
            }))
            if(!admin_state.token)
                return history.push("/admin/login")
            // API ENDPOINT 
            console.log(parseJwt(admin_state.token))
            //set_data({ date: new Date().getTime(), user: admin_state.admin. })
            set_handle_page(prev => ({
                ...prev,
                notification: true,
                loading: false,
                msg: "Cambios guardados correctamente",
                severity: "success"
            }))
        }

    console.log(admin_state)
    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
        set_data({
            date: 1633470422350,
            user_id: "20418863235"
        })
    }, [])
    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={6} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <BackButton />
                <Grid item xs>
                    <h4>Ajustes Visuales</h4>
                </Grid>
                <Grid item xs={12} className="m-top-2 m-bottom-2" container justify="center">
                    <Input
                        xs={12}
                        label="Espesor de los graficos"
                        color="grey"
                        value={state.borderWidth}
                        onChange={(e) => set_state(prev => ({ ...prev, borderWidth: e.target.value }))}
                    />
                    <Input
                        xs={12}
                        label="Color de fondo"
                        type="color"
                        value={state.backgroundColor[0]}
                        onChange={(e) => set_state(prev => ({ ...prev, backgroundColor: [e.target.value] }))}
                    />
                    <Input
                        xs={12}
                        label="Color de contorno"
                        type="color"
                        value={state.borderColor[0]}
                        onChange={(e) => set_state(prev => ({ ...prev, borderColor: [e.target.value] }))}
                    />
                    <Button xs={12} md={6} label="Guardar" onClick={SubmitConfig} />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <Grid item xs={12} className="m-bottom-3">
                    <h4>Informacion de Datos</h4>
                </Grid>
                <Grid item xs={6}>
                    <p className="w500">Ultima Actualizacion:</p>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                    <p>{UnixToDate(data.date)}</p>
                </Grid>
                <Grid item xs={6}>
                    <p className="w500">Actualizado por:</p>
                </Grid>
                <Grid item xs={6} container justify="flex-end" onClick={() => history.push(`/admin/user/${data.user_id}`)}>
                    <p className="hover">{data.user_id}</p>
                </Grid>
                <Button
                    className="m-top-3"
                    xs={12}
                    label="Actualizar"
                    onClick={updateStadistics}
                />
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default ConfigStadisticPage;