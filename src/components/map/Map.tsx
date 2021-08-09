import React, { useState, useEffect }  from "react";
import "./Map.css";
import { TileLayer, MapContainer, Marker } from "react-leaflet";
import { Grid, GridSize, InputLabel } from "@material-ui/core";

interface MapProps {
    label: string,
    position?: {
        lat: number,
        lng: number
    },
    required?: boolean,
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
        lat: -31.42182659888641,
        lng: -64.18388759242008
    },
    required,
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
    const [userPosition, setPosition]= useState(position);

    useEffect(() => {
        if (!userPosition) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <Grid container item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={`map-container ${className}`}>
            <InputLabel>
                <p className={"first-letter-cap p-left-2 m-top-1 font-size-small w400 " + (error ? "color-red" : "color-black")}>
                    {label} {required ? "*" : ""}
                </p>
            </InputLabel>
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
                    <Marker position={[userPosition.lat, userPosition.lng]} />
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