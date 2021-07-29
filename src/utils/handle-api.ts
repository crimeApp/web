import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const ENDPOINT = "https://us-west2-crimen-app-ucc.cloudfunctions.net/app"

const CONFIG_ADMIN = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const HandleAPI = async (method: "get" | "post" | "put" | "delete", path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        if (method === "get" || method === "delete") {
            return await axios[method](ENDPOINT + path, config);
        }
        return await axios[method](ENDPOINT + path, data, config);
    } catch (error) {
        return error.response
    }
}

export const HandleAPIRestrict = async (method: "get" | "post" | "put" | "delete", path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        if (method === "get" || method === "delete") {
            return await axios[method](ENDPOINT + path, { ...CONFIG_ADMIN, ...config });
        }
        return await axios[method](ENDPOINT + path, data, { ...CONFIG_ADMIN, ...config });
    } catch (error) {
        return error.response
    }
}