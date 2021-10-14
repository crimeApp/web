import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

/// AGREGAR VARIOS RENDER EN EL SETINGS

const Heatmap = ({ data, className, label, center = [-31.416668, -64.183334] }: { data: [number, number, number][], center?: [number, number], label?: string, className?: string }) => {

    useEffect(() => {
        var map = L.map('map').setView(center, 12);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // @ts-ignore
        L.heatLayer(data).addTo(map);
    }, [])

    return <div className={className}>
        <h4>{label}</h4>
        <div id="map" ></div>
    </div>
}

export default Heatmap;