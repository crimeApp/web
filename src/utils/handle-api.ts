import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const CONFIG_ADMIN = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

const DEV = false; // process.env.REACT_APP_ENV ??

export const HandleAPI = async ({ method, path, data, config }: { method: "get" | "post" | "put" | "delete", path: string, data?: any, config?: AxiosRequestConfig }): Promise<AxiosResponse<any>> => {
    try {
        const resp = (method === "get" || method === "delete")
            ? await axios[method](process.env.REACT_APP_API_GATEWAY + path, config)
            : await axios[method](process.env.REACT_APP_API_GATEWAY + path, data, config)
        if (DEV)
            console.log(resp)
        return resp
    } catch (error) {
        if (DEV) {
            //@ts-ignore
            console.log(error.response)
        }
        //@ts-ignore
        return error.response
    }
}

export const HandleAPIRestrict = async (method: "get" | "post" | "put" | "delete", path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        const resp = (method === "get" || method === "delete")
            ? await axios[method](process.env.REACT_APP_API_GATEWAY + path, { ...CONFIG_ADMIN, ...config })
            : await axios[method](process.env.REACT_APP_API_GATEWAY + path, data, { ...CONFIG_ADMIN, ...config });
        if (DEV)
            console.log(resp)
        return resp
    } catch (error) {
        if (DEV) {
            //@ts-ignore
            console.log(error.response)
        }
        //@ts-ignore
        return error.response
    }
}