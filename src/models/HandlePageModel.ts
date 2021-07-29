import { Color } from "@material-ui/lab";
import { ColorCA } from "../style/type-style";

export type HandlePageModel = {
    loading: boolean,
    error: boolean,
    msg: string,
    color?: ColorCA,
    // information severity
    severity?: Color,
    notification: boolean,
    // extra information
    others?: any,
    callback: () => void
}