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
}

const AdminReducer = (state: StateAdmin, action: ActionAdmin): StateAdmin => {
    switch (action.type) {
        case "LOGIN":
            storejs.set("token", action.payload.token)
            return {
                token: action.payload.token,
                login: true
            }
        case "LOGOUT":
            return {
                login: false
            }
        default:
            return state;
    }
}

const InitAdminState: StateAdmin = {
    login: false,
    token: storejs.get("token") as string | undefined,
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