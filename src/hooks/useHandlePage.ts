import { useState } from "react"
import { HandlePageModel } from "../models/HandlePageModel"

const useHandlePage = (loading = false) => useState<HandlePageModel>({
    error: false,
    loading,
    msg: "",
    notification: false,
    color: "red",
    callback: () => null,
    others: {}
})
export default useHandlePage;