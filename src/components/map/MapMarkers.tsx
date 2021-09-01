import React from "react";
import "./Map.css";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Grid, GridSize } from "@material-ui/core";

interface MapProps {
    label: string,
    positionCenter?: {
        lat: number,
        lng: number
    },
    positions?: {
        lat: number,
        lng: number,
        name?: string,
        address?: string,
    }[],
    style?: React.CSSProperties,
    className?: string,
    error_msg?: string,
    error?: boolean,
    msg?: string,
    xs?: GridSize,
    sm?: GridSize,
    md?: GridSize,
    lg?: GridSize,
    xl?: GridSize,
}

const MapMarkers = ({
    label,
    positionCenter = {
        lat: -31.42384796597578,
        lng: -64.18635948818674,
    },
    positions = [{
        lat: -31.42384796597578,
        lng: -64.18635948818674,
        name: "Home",
        address: "J.B justo 8000"
    }],
    className,
    error,
    error_msg,
    msg,
    xs,
    sm,
    md,
    lg,
    xl,
    style
}: MapProps) => {
    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={`map-container ${className}`} style={style} container>
            <Grid item>
                <p className={"first-letter-cap  color-black w700 " + (error ? "color-red" : "")}>{label}</p>
            </Grid>
            <Grid item>
                <MapContainer center={positionCenter} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[positionCenter.lat, positionCenter.lng]} >
                        <Popup>
                            Mi ubicacion
                        </Popup>
                    </Marker>
                    {
                        positions.map((pos, index) => <Marker key={index.toString()} position={[pos.lat, pos.lng]} alt={pos.name}>
                            <Popup>
                                {pos?.name} <br />
                                {pos?.address}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </Grid>
            <Grid>
                {error_msg ? (
                    <p className="map-msg map-error-color">{error_msg}</p>
                ) : (
                    msg && <p className="map-msg">{msg}</p>
                )}
            </Grid>
        </Grid>
    );
};

export default MapMarkers;