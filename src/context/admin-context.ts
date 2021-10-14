import React from "react";
import { createContext } from "react";
const storejs = require("store-js");

export type ActionAdmin = {
    type: "LOGIN" | "LOGOUT" | "CHANGE_CONFIG",
    payload: any,
}

export type StateAdminConfig = {
    statistics: {
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number,
    }
}

type StateAdmin = {
    login: boolean,
    token?: string,
    admin: boolean,
    config: StateAdminConfig
}

const AdminReducer = (state: StateAdmin, action: ActionAdmin): StateAdmin => {
    switch (action.type) {
        case "LOGIN":
            storejs.set("token_ca", action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                login: true,
                admin: action.payload.admin
            }
        case "LOGOUT":
            storejs.remove("token_ca");
            storejs.remove("config_admin_ca");
            return {
                ...state,
                login: false,
                admin: false
            }
        case "CHANGE_CONFIG":
            storejs.set("config_admin_ca", action.payload)
            return {
                ...state,
                config: action.payload
            }
        default:
            return state;
    }
}

const InitAdminState: StateAdmin = {
    login: storejs.get("token_ca") ? true : false,
    token: storejs.get("token_ca") as string | undefined,
    admin: false, // DEUDA
    config: !!storejs.get("config_admin_ca") ? storejs.get("config_admin_ca") : {
        dataset: "last",
        statistics: {
            backgroundColor: ["#e77c8d", "#c69255", "#98a255", "#56ad74", "#5aa9a2", "#5ea5c5"],
            borderColor: ['#fff'],
            borderWidth: 2,
        }
    }
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