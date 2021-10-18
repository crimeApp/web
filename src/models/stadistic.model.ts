export type DataStructStadistic = any

type DataStructChar = { labels: string[], datasets: [{ label: string, data: number[] }] }

export type StadisticModel = {
    id: string,
    name: string,
    description: string,
    crimeType: DataStructStadistic,
    crimeAge: DataStructStadistic,
    crimeSex: DataStructStadistic,
    crimeHair: DataStructStadistic,
    crimeHeight: DataStructStadistic,
    crimeSkin: DataStructStadistic,
    crimeTime: DataStructStadistic,
    crimeDate: DataStructStadistic,
    crimeAccompaniment: DataStructStadistic,
    victimPhysical: DataStructStadistic,
    victimEmotional: DataStructStadistic,
    victimAgresive: DataStructStadistic,
    crimePoints: { lat: number, lng: number, int: number }[],
    createdAt: number,
    createdByID: string,
    total: number
}

export type StadisticCharModel = {
    id: string,
    name: string,
    description: string,
    crimeType: DataStructChar,
    crimeAge: DataStructChar,
    crimeSex: DataStructChar,
    crimeHair: DataStructChar,
    crimeHeight: DataStructChar,
    crimeSkin: DataStructChar,
    crimeTime: DataStructChar,
    crimeDate: DataStructChar,
    crimeAccompaniment: DataStructChar,
    victimPhysical: DataStructChar,
    victimEmotional: DataStructChar,
    victimAgresive: DataStructChar,
    crimePoints: { lat: number, lng: number, int: number }[],
    createdAt: number,
    createdByID: string,
    total: number
}