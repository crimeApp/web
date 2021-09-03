import React, { useEffect } from "react";
import HandlePetitions from "../../components/handle-peticion/HandlePetions";
import useHandlePage from "../../hooks/useHandlePage";
import { UserModel } from "../../models/user.models";
import ScaffoldAdmin from "./component/ScaffoldAdmin";

const HomeAdminPage = () => {

    const [handle_page, set_handle_page] = useHandlePage({ loading: true })

    useEffect(() => {
        set_handle_page(prev => ({ ...prev, loading: false }))
    }, [])

    return <ScaffoldAdmin>
        <HandlePetitions
            handlePage={handle_page}
            setHandlePage={set_handle_page}
        />
        <h3>halo</h3>
    </ScaffoldAdmin>
}

export default HomeAdminPage;