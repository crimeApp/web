export type DataStructStadistic = any

export type StadisticModel = {
    id: string,
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
}