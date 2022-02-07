const h3 = require("h3-js");

const PRESISION = 7;

const GeoHash = (lat: number, lng: number): string => h3.geoToH3(lat, lng, PRESISION);

export default GeoHash;