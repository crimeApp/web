import { Label } from "@material-ui/icons";
import { StadisticCharModel, StadisticModel } from "../models/stadistic.model";

export const StadisticsToChatsFormat = (model: StadisticModel | undefined): StadisticCharModel | undefined => {
    if (!model) return
    //@ts-ignore
    return Object.assign({}, ...Object.keys(model).map((key) => typeof model[key] === "object" ? {
        [key]: {
            //@ts-ignore
            labels: Object.keys(model[key]),
            datasets: [
                {
                    //@ts-ignore
                    data: Object.keys(model[key]).map(k => model[key][k]),
                    label: ""
                }
            ]
        }
        // @ts-ignore
    } : { [key]: model[key] }))
}