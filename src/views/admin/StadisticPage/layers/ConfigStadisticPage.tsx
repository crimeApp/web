import { Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import HandlePetitions from "../../../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../../../hooks/useHandlePage";
import ScaffoldAdmin from "../../component/ScaffoldAdmin";
import BackButton from "../../component/BackButton";
import { AdminContext } from "../../../../context/admin-context";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";

const ConfigStadisticPage = () => {
    const [handle_page, set_handle_page] = useHandlePage({})
        , { admin_state, admin_dispatch } = useContext(AdminContext)
        , [state, set_state] = useState({
            ...admin_state.config.statistics
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
                msg: "Cambios guardados correctamente", 
                severity: "success"
            }))
        }
    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <Grid item xs={12} sm={8} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <BackButton/>
                <Grid item xs>
                    <h4>Configuracion de Estadisticas</h4>
                </Grid>
                <Grid item xs={12} className="m-top-2 m-bottom-2" container justify="center">
                    <Grid item xs={12} className="p-left-2">
                        <h5 className="w500">Ajustes Visuales</h5>
                    </Grid>
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
        <Grid item xs={12} sm={4} className="p-2">
            <Grid item xs={12} className="background-color-white border-small p-2" container>
                <Grid item xs={12}>
                    <h4>Ultimas Modificaciones</h4>
                </Grid>
                <Grid item xs={12}>
                    <p></p>
                </Grid>
            </Grid>
        </Grid>
    </ScaffoldAdmin>
}

export default ConfigStadisticPage;