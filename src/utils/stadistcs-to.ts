import { Label } from "@material-ui/icons";
import { StadisticCharModel, StadisticModel } from "../models/stadistic.model";

export const StadisticsToChatsFormat = (model: StadisticModel | undefined): StadisticCharModel | undefined => {
    if (!model) return
    const temp = StadisticsToChartFormatByMonth(model)
        , sumatory = SumatoriOfAllData(model)
        , struct = TransformToCharFormat(sumatory);


    return {
        ...temp,
        all: { struct }
    }
}

const StadisticsToChartFormatByMonth = (model) => Object.assign({}, ...Object.keys(model).map((year) => typeof model[year] === "object" ? {
    [year]: Object.assign({}, ...Object.keys(model[year]).map((month) => ({
        [month]: Object.assign({}, ...Object.keys(model[year][month]).map((data) => ({
            [data]: {
                //@ts-ignore
                labels: Object.keys(model[year][month][data]),
                datasets: [
                    {
                        //@ts-ignore
                        data: Object.keys(model[year][month][data]).map(k => model[year][month][data][k]),
                        label: ""
                    }
                ]
            }
        })))
    })))
    // @ts-ignore
} : { [year]: model[year] }))

const SumatoriOfAllData = (model) => {
    let struct = {
        total: model.total,
        crimePoints: [] as any,
    };
    Object.keys(model).filter((year) => typeof model[year] === "object").map((year) =>
        Object.keys(model[year]).map((month) =>
            Object.keys(model[year][month]).map((category) =>
                Object.keys(model[year][month][category]).map((data) => {
                    if (!struct[category])
                        struct[category] = {}
                    if (category === "crimePoints") {
                        struct.crimePoints.push(model[year][month][category][data])
                    } else {
                        struct[category][data] = struct[category][data] ? model[year][month][category][data] + struct[category][data] : model[year][month][category][data]
                    }
                }))))
    return struct;
}

const TransformToCharFormat = (model) => Object.assign({}, ...Object.keys(model).map((key) =>
    Object.assign({}, ...Object.keys(model[key]).map((data) => ({
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
    })))));