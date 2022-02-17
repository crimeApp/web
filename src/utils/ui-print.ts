import html2canvas from "html2canvas";

export const uiPrint = ({ idElement = "capture", name = "resumen" }: { idElement?: string, name?: string }) => {
    const data = document.getElementById(idElement)
    if (!data)
        return console.log("id not fount")
    html2canvas(data).then(canvas => {
        const uri = canvas.toDataURL()
            , link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = name + ".png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    });
}

export const uiDowloadJson = (json: Object, name = 'informe') => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", name + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}