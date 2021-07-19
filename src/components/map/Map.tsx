import React from "react";
import "./Map.css";
import { TileLayer, MapContainer, Marker } from "react-leaflet";
import { Grid, GridSize } from "@material-ui/core";

interface MapProps {
    label: string,
    position?: {
        lat: number,
        lng: number
    },
    className?: string,
    onChange: (newValue: { lat: number, lng: number }) => void,
    error_msg?: string,
    error?: boolean,
    msg?: string,
    xs?: GridSize,
    sm?: GridSize,
    md?: GridSize,
    lg?: GridSize,
    xl?: GridSize,
}

const Map = ({
    label,
    position = {
        lat: -31.42384796597578,
        lng: -64.18635948818674
    },
    className,
    onChange,
    error,
    error_msg,
    msg,
    xs,
    sm,
    md,
    lg,
    xl,
}: MapProps) => {
    return (
        <Grid container item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={`map-container ${className}`}>
            <Grid item>
                <p className={"first-letter-cap  color-black w800 " + (error ? "color-red" : "")}>{label}</p>
            </Grid>
            <Grid item>
                <MapContainer center={position} zoom={13} scrollWheelZoom={true}
                    //@ts-ignore
                    whenReady={(map) => {
                        map.target.on(
                            "click",
                            //@ts-ignore
                            (e) => {
                                const { lat, lng } = e.latlng;
                                onChange({ lat, lng });
                            }
                        )
                    }
                    }
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[position.lat, position.lng]} />
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

export default Map;