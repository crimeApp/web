import { SiniesterModel } from "../models/siniester.models";
import { StadisticModel } from "../models/stadistic.model";

const CreateStatisticModel = (snap_sinister: SiniesterModel[]): StadisticModel => {
    let struct = {
        total: 0
    };
    snap_sinister.forEach(data => {

        const time = new Date(data.time)
        const month = String(time.getMonth())
        const year = String(time.getFullYear())

        if (!struct[year]) {
            struct[year] = {}
        }
        if (!struct[year][month]) {
            struct[year][month] = {
                crimePoints: [],
                crimeType: {},
                crimeAge: {},
                crimeSex: {},
                crimeHair: {},
                crimeHeight: {},
                crimeSkin: {},
                crimeTime: {},
                crimeDate: {},
                crimeAccompaniment: {},
                victimPhysical: {
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0
                },
                victimEmotional: {
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0
                },
                victimAgresive: {
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0
                },
                total: 0
            }
        }

        struct[year][month].crimePoints.push({ ...data.geopoint, int: 2 })
        const hour = data.hour.split(":")[0]
        struct[year][month].crimeTime[hour] = (struct[year][month].crimeTime[hour] || 0) + 1;
        struct[year][month].crimeType[data.attack_type] = (struct[year][month].crimeType[data.attack_type] || 0) + 1;
        if (data.thief_age) struct[year][month].crimeAge[data.thief_age] = (struct[year][month].crimeAge[data.thief_age] || 0) + 1;
        if (data.thief_sex) struct[year][month].crimeSex[data.thief_sex] = (struct[year][month].crimeSex[data.thief_sex] || 0) + 1;
        if (data.thief_hair_color) struct[year][month].crimeHair[data.thief_hair_color] = (struct[year][month].crimeHair[data.thief_hair_color] || 0) + 1;
        if (data.thief_height) struct[year][month].crimeHeight[data.thief_height] = (struct[year][month].crimeHeight[data.thief_height] || 0) + 1;
        if (data.thief_skin) struct[year][month].crimeSkin[data.thief_skin] = (struct[year][month].crimeSkin[data.thief_skin] || 0) + 1;
        if (data.thief_accompanied) struct[year][month].crimeAccompaniment[data.thief_accompanied] = (struct[year][month].crimeAccompaniment[data.thief_accompanied] || 0) + 1;
        struct[year][month].victimPhysical[data.physical_damage] += 1;
        struct[year][month].victimEmotional[data.emotional_damage] += 1;
        struct[year][month].victimAgresive[data.thief_agressiveness] += 1;
        struct[year][month].total += 1;
        struct.total += 1;
    })

    return struct as StadisticModel;
}

export default CreateStatisticModel;