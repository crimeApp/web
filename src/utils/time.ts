export function UnixToDate(timestamp: number) : string {
    return UnixToDay(timestamp) + ' - ' + UnixToTime(timestamp);
}

export function UnixToDay(timestamp?: number) : string {
    return timestamp ? new Intl.DateTimeFormat('es-AR').format(timestamp) : '';
}

export function UnixToTime(timestamp?: number) : string {
    if(!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false })
}

export function UnixToDateString(timestamp: number) : string {
    const diff = new Date().getTime() - timestamp;
    const count = diff/(1000*60*60*24);
    if(count < 1) {
        return `Hoy a las ${UnixToTime(timestamp)}`
    } else if (count < 2) {
        return `Ayer a las ${UnixToTime(timestamp)}`
    } else if (count < 7) {
        return `Hace ${Math.round(count)} dias`
    } else if (count < 40) {
        return `Hace ${Math.round(count/7)} semanas`
    } else {
        return `Hace ${Math.round(count/30)} meses`
    }
}

export function DateMoreTime(date: number, time: string) : number {
    const [hours, minutes] = time.split(":")
    , new_date = new Date(date)
    new_date.setHours(Number(hours))
    new_date.setMinutes(Number(minutes))
    return new_date.getTime();
}