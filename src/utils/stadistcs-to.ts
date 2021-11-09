import { Label } from "@material-ui/icons";
import { DataStructChar, StadisticCharModel, StadisticModel } from "../models/stadistic.model";

export const StadisticsToChatsFormat = (model: StadisticModel | undefined): StadisticCharModel | { all: { struct: undefined } } => {
    if (!model) return {
        all: {
            struct: undefined
        }
    }
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
            labels: Object.keys(model[key]).sort(),
            datasets: [
                {
                    //@ts-ignore
                    data: Object.keys(model[key]).sort().map(k => model[key][k]),
                    label: ""
                }
            ]
        }
    })))));

export const GetTotalByMonth = (model: StadisticModel, year: string): DataStructChar => ({
    labels: Object.keys(model[year]),
    datasets: [
        {
            //@ts-ignore
            data: Object.keys(model[year]).map(month => model[year][month]["total"]),
            label: "Casos totales por mes"
        }
    ]
});

export const GetTypeCrimeByMonth = (model: StadisticModel, year: string, key: string): DataStructChar => ({
    labels: Object.keys(model[year]).sort((a, b) => Number(a) - Number(b)),
    datasets: [
        {
            //@ts-ignore
            data: Object.keys(model[year]).sort((a, b) => Number(a) - Number(b)).map(month => model[year][month]["crimeType"][key]),
            label: "Casos totales por mes"
        }
    ]
});