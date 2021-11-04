export function UnixToDate(timestamp: number) : string {
    return new Date(timestamp).toLocaleTimeString('en', {year: 'numeric', month: 'numeric', day: 'numeric',  hour: '2-digit', minute: '2-digit', hour12: false });
}

export function UnixToDay(timestamp: number) : string {
    return new Intl.DateTimeFormat('es-AR').format(timestamp);
}

export function UnixToTime(timestamp: number) : string {
    return new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false })
}