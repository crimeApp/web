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
import { HandleAPI, HandleAPIRestrict } from "../../../../utils/handle-api";
import Translate from "../../../../assets/traslate";

const ConfigStadisticPage = () => {
    const [handle_page, set_handle_page] = useHandlePage({ loading: true })
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , TRANSLATE = Translate["ES"]
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
            if (!admin_state.token)
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

    useEffect(() => {
        (async () => {
            const request = await HandleAPI({
                method: "get",
                path: "/admin/staditistics",
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
                msg: TRANSLATE.ERRORS.INTERNAL_SERVER_ERROR
            })

            switch(request.status) {
                case 200: 
                    return 
            }

            set_handle_page(prev => ({ ...prev, loading: false }))
            set_data({
                date: 1633470422350,
                user_id: "20418863235"
            })
        })();
    }, [])
    return <ScaffoldAdmin className="p-bottom-4 m-bottom-4">
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={6} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <BackButton />
                <Grid item xs>
                    <h4>Ajustes visuales</h4>
                </Grid>
                <Grid item xs={12} className="m-top-2 m-bottom-2" container justify="center">
                    <Input
                        xs={12}
                        label="Espesor de los graficos"
                        color="light-gray"
                        value={state.borderWidth}
                        onChange={(e) => set_state(prev => ({ ...prev, borderWidth: e.target.value }))}
                    />
                    <Input
                        xs={12}
                        label="Color de contorno"
                        type="color"
                        value={state.borderColor[0]}
                        onChange={(e) => set_state(prev => ({ ...prev, borderColor: [e.target.value] }))}
                    />
                    <Grid item xs={12} className="p-2">
                        <h5>Colores de fondo</h5>
                    </Grid>
                    <PaletaCard
                        value={state.backgroundColor}
                        label="Seaborn Palette"
                        onClick={(colors) => set_state(prev => ({ ...prev, backgroundColor: colors }))}
                        colors={["#e77c8d", "#c69255", "#98a255", "#56ad74", "#5aa9a2", "#5ea5c5"]}
                    />
                    <PaletaCard
                        value={state.backgroundColor}
                        label="Saturation Palette"
                        onClick={(colors) => set_state(prev => ({ ...prev, backgroundColor: colors }))}
                        colors={["#8c8c8c", "#828996", "#79869f", "#6f83a9", "#6581b3", "#5b7ebd"]}
                    />
                    <PaletaCard
                        value={state.backgroundColor}
                        label="Dark Palette"
                        onClick={(colors) => set_state(prev => ({ ...prev, backgroundColor: colors }))}
                        colors={["#1a1a1a", "#27344d", "#345082", "#416ab6", "#618ad5", "#91acdf"]}
                    />
                    <PaletaCard
                        value={state.backgroundColor}
                        label="Hls Palette"
                        onClick={(colors) => set_state(prev => ({ ...prev, backgroundColor: colors }))}
                        colors={["#db5f57", "#dbc257", "#91db57", "#57db80", "#57d3db", "#5770db"]}
                    />
                    <PaletaCard
                        value={state.backgroundColor}
                        label="Rocket Palette"
                        onClick={(colors) => set_state(prev => ({ ...prev, backgroundColor: colors }))}
                        colors={["#35193e", "#701f57", "#ad1759", "#e13342", "#f37651", "#f6b48f"]}
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


export const PaletaCard = ({ label, value, colors, onClick }: { value: string[], label: string, colors: string[], onClick: (value: string[]) => void }) => <Grid item xs={12} className="p-2" container>
    <Grid item xs={12} className="p-left-2 p-right-2">
        <p>{label}</p>
    </Grid>
    <Grid onClick={() => onClick(colors)} item xs={12} className="bakground-color-white border-small shadow p-2 hover" container justify="center" style={{
        borderLeft: value[0] === colors[0]
            ? "10px solid var(--violet)"
            : "10px solid transparent"
    }}>
        {
            colors.map((el, index) => <Grid id={`${index.toString()}-color-pallete`} style={{ border: "2px solid #fff", backgroundColor: el, height: "30px" }} item xs={3} />)
        }
    </Grid>
</Grid>