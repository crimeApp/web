import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

/// AGREGAR VARIOS RENDER EN EL SETINGS

const Heatmap = ({ data, className, label, center = [-31.416668, -64.183334] }: { data: number[][], center?: [number, number], label?: string, className?: string }) => {

    useEffect(() => {
        var map = L.map('map').setView(center, 12);

        /*
        ERROR WITH THIS MAP
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map); */

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // @ts-ignore
        L.heatLayer(data).addTo(map);
    }, [])

    return <div className={className}>
        <h4 style={{ width: "100%", textAlign: "center" }}>{label}</h4>
        <div id="map" ></div>
    </div>
}

export default Heatmap;