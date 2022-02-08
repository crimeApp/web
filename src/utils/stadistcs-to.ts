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
            labels: Object.keys(model[key]).sort((a, b) => !isNaN(a) && !isNaN(b) ? Number(a) - Number(b) : a.length - b.length),
            datasets: [
                {
                    //@ts-ignore
                    data: Object.keys(model[key]).sort((a, b) => !isNaN(a) && !isNaN(b) ? Number(a) - Number(b) : a.length - b.length).map(k => model[key][k]),
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

export const GetTypeCrimeByMonth = (model: StadisticModel, year: string, key: string): DataStructChar => {
    console.log(model, year, key)
    return ({
        labels: Object.keys(model[year]).sort((a, b) => Number(a) - Number(b)),
        datasets: [
            {
                //@ts-ignore
                data: Object.keys(model[year]).sort((a, b) => Number(a) - Number(b)).map(month => model[year][month]["crimeType"][key]),
                label: "Casos totales por mes"
            }
        ]
    })
};

export const TotalCasesByMonths = (model: StadisticModel) => {
    //@ts-ignore
    const years = Object.keys(model).filter(years => typeof model[years] === 'object' && !isNaN(years))

    const months = years.map(year => Object.keys(model[year]).filter(e => typeof model[year][e] === 'object'));

    const data = years.map((year, index) => ({
        year,
        months: months[index].map(month => ({
            month: numberToMonth[month],
            total: model[year][month].total
        }))
    }))

    return data
}

const numberToMonth = {
    '1': 'Enero',
    '2': 'Febrero',
    '3': 'Marzo',
    '4': 'Abril',
    '5': 'Mayo',
    '6': 'Junio',
    '7': 'Julio',
    '8': 'Agosto',
    '9': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre',
}