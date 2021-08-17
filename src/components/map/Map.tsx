import React, { useState, useEffect } from "react";
import "./Map.css";
import { TileLayer, MapContainer, Marker, useMap } from "react-leaflet";
import { Grid, GridSize } from "@material-ui/core";
import { LatLngExpression } from "leaflet";
import Selector from "../selector/Selector";
//@ts-ignore
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { RawResult } from "leaflet-geosearch/dist/providers/bingProvider";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import { BorderCA } from "../../style/type-style";

interface MapProps {
  id?: string;
  label?: string;
  zoom?: number;
  position?: {
    lat: number;
    lng: number;
  };
  showSearch?: boolean;
  required?: boolean;
  size?: "normal" | "big";
  justify?: "center" | "flex-start" | "flex-end";
  className?: string;
  border?: BorderCA | undefined;
  onChange?: (
    newValue: {
      lat: number;
      lng: number;
    },
    label?: string
  ) => void;
  error?: boolean;
  error_msg?: string;
  msg?: string;
  xs?: undefined | GridSize;
  sm?: undefined | GridSize;
  md?: undefined | GridSize;
  lg?: undefined | GridSize;
  xl?: undefined | GridSize;
}

const TEMP_POSITION = {
  lat: -31.43087168213775,
  lng: -64.21910252283733,
};

const Map = ({
  id,
  label,
  position,
  onChange = () => null,
  error,
  required,
  justify,
  error_msg,
  className,
  zoom = 13,
  msg,
  xs,
  sm,
  md,
  lg,
  xl,
  showSearch,
  size,
}: MapProps) => {
  const [value, set_value] = useState<string>(""),
    [pos, set_pos] = useState<{ lat: number; lng: number }>(TEMP_POSITION),
    [opt, set_opt] = useState<SearchResult<RawResult>[]>([]),
    prov = new OpenStreetMapProvider();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const result = await prov.search({ query: value });
      //@ts-ignore
      set_opt(result);
      if (result.length > 0) {
        set_pos({ lat: result[0].y, lng: result[0].x });
        onChange({ lat: result[0].y, lng: result[0].x }, result[0].label);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Grid
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      id={id}
      justify={justify}
      className={`map-container ${size} ${className}`}
      container
    >
       {label && !showSearch && <Grid item>
        <p
          className={`map-label first-letter-cap
              ${error_msg ? `map-error-color` : ``}`}
        >
          {label + (required ? "*" : "")}
        </p>
      </Grid>}

      {
        showSearch &&
        <Selector
          label={label}
          xs={12}
          md={8}
          value={value}
          className="m-0 m-bottom-2"
          options={opt.map(o => o.label)}
          onInputChange={(_, v, __) => set_value(v)}
        />
      }
      
      <Grid item xs={12} md={10}>
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={true}
          // @ts-ignore
          whenReady={(map) =>
            map.target.on("click", (e: { latlng: { lat: any; lng: any } }) =>
              onChange(e.latlng)
            )
          }
        >
          <ChangeView
            center={showSearch ? pos : position?.lat ? position : TEMP_POSITION}
          />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            //showSearch ? :
            <Marker
              position={
                showSearch
                  ? [pos.lat, pos.lng]
                  : position?.lat
                  ? [position.lat, position.lng]
                  : [TEMP_POSITION.lat, TEMP_POSITION.lng]
              }
            />
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

export default Map;

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  map.setView(center);
  return null;
}
