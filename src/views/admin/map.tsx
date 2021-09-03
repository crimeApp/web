import React, { useEffect } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../hooks/useHandlePage";
import { UserModel } from "../../models/user.models";
import ScaffoldAdmin from "./component/ScaffoldAdmin";

const MapAdminPage = () => {

    const User: UserModel[] = [
        {
            name: "string",
            surname: "string",
            cuit: "string",
            phone: "string",
            mail: "string",
            role: "policia",
            password: "string",
            place: "A11",
            createdAt: 1272552245,
        }
    ]
        , [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <h3>Mapa</h3>
    </ScaffoldAdmin>
}

export default MapAdminPage;