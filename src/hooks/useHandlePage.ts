import { useState } from "react"
import { HandlePageModel } from "../models/HandlePageModel"

const useHandlePage = ({
    error = false,
    loading = false,
    msg = "",
    notification = false,
    severity = "error",
    color = "red",
    callback = () => null,
    others = {}
}: HandlePageModel) => useState<HandlePageModel>({
    error,
    loading,
    msg,
    severity,
    notification,
    color,
    callback,
    others
})
export default useHandlePage;