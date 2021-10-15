type DataStructStadistic = {
    labels: string[],
    datasets: [
        {
            data: number[]
        }
    ]
}

export const ObjectToDataStruct = (obj: any): DataStructStadistic => {
    let labels: string[] = []
        , data: number[] = []

    Object.keys(obj).map((key: string) => {
        labels.push(key)
        data.push(obj[key])
    })

    return {
        labels: labels,
        datasets: [
            {
                data: data
            }
        ]
    }
}