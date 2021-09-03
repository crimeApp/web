import React from "react";
import { createContext } from "react";
const storejs = require("store-js");

export type ActionAdmin = {
    type: "LOGIN" | "LOGOUT",
    payload: any,
}

type StateAdmin = {
    login: boolean,
    token?: string,
    admin: boolean,
}

const AdminReducer = (state: StateAdmin, action: ActionAdmin): StateAdmin => {
    switch (action.type) {
        case "LOGIN":
            storejs.set("token_ca", action.payload.token)
            return {
                token: action.payload.token,
                login: true,
                admin: action.payload.admin
            }
        case "LOGOUT":
            storejs.remove("token_ca")
            return {
                login: false,
                admin: false
            }
        default:
            return state;
    }
}

const InitAdminState: StateAdmin = {
    login: storejs.get("token_ca") ? true : false,
    token: storejs.get("token_ca") as string | undefined,
    admin: false // DEUDA
}

const AdminContext = createContext<{
    admin_state: StateAdmin,
    admin_dispatch: React.Dispatch<ActionAdmin>,
}>({
    admin_state: InitAdminState,
    admin_dispatch: () => undefined,
});

export {
    AdminReducer,
    InitAdminState,
    AdminContext
}