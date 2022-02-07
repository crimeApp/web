export type DataStructStadistic = { [key: string]: number }

export type DataStructChar = { labels: string[], datasets: [{ label: string, data: number[] }] }
type DataStructMap = { labels: string[], datasets: [{ label: string, data: { lat: number, lng: number, int: number }[] }] }

export type StadisticModel = {
    id?: string,
    createdAt?: number,
    createdByID?: number,
    public?: boolean,
    name?: string,
    description?: string,
    [year: string]: {
        [month: string]: {
            crimeType: DataStructStadistic,
            crimeAge: DataStructStadistic,
            crimeSex: DataStructStadistic,
            crimeHair: DataStructStadistic,
            crimeHeight: DataStructStadistic,
            crimeSkin: DataStructStadistic,
            crimeTime: DataStructStadistic,
            crimeAccompaniment: DataStructStadistic,
            victimPhysical: DataStructStadistic,
            victimEmotional: DataStructStadistic,
            victimAgresive: DataStructStadistic,
            crimePoints: { lat: number, lng: number, int: number }[],
            createdAt: number,
            createdByID: string,
            total: number
        } | any
    } | any
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
    crimePoints: DataStructMap,
    createdAt: number,
    createdByID: string,
    total: number
}