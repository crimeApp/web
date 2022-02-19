import React from "react";
import { createContext } from "react";
import { StadisticModel } from "../models/stadistic.model";
import { parseJwt } from "../utils/token";
const storejs = require("store-js");

export type ActionAdmin = {
    type: "LOGIN" | "LOGOUT" | "CHANGE_CONFIG" | "CHANGE_DB",
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
    role?: string,
    name?: string,
    database?: StadisticModel,
    cuit?: string,
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
                ...getData(action.payload.token)
            }
        case "LOGOUT":
            storejs.remove("token_ca");
            storejs.remove("config_admin_ca");
            storejs.remove("database_ca")
            return {
                ...state,
                login: false,
                admin: false
            }
        case "CHANGE_DB":
            storejs.set("database_ca", action.payload)
            return {
                ...state,
                database: action.payload
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

const getData = (token) => {
    const parse = parseJwt(token);
    if(!parse) return {}
    return {
        name: parse.full_name,
        cuit: parse.uid,
        role: parse.role,
        admin: parse.role === "admin"
    }
}

//@ts-ignore
const InitAdminState: StateAdmin = {
    login: storejs.get("token_ca") ? true : false,
    token: storejs.get("token_ca") as string | undefined,
    ...(() => {
        const token = storejs.get("token_ca");
        if (!token) return {}
        return getData(token)
    })(),
    database: storejs.get("database_ca") as StadisticModel | undefined,
    config: !!storejs.get("config_admin_ca") ? storejs.get("config_admin_ca") : {
        dataset: "last",
        statistics: {
            backgroundColor: ["#e77c8d", "#c69255", "#98a255", "#56ad74", "#5aa9a2", "#5ea5c5"],
            borderColor: ['#fff'],
            borderWidth: 2,
            label: "data"
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