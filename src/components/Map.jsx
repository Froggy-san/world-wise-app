import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import Button from "../components/Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CititesContecxt";
import { useGeolocation } from "../Hooks/useGeolocation";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoLoctionPosition,
    getPosition,
  } = useGeolocation();

  console.log(geoLoctionPosition, "POSTION");
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLoctionPosition)
        setMapPosition([geoLoctionPosition.lat, geoLoctionPosition.lng]);
    },
    [geoLoctionPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLoctionPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {geoLoctionPosition ? (
          <Marker
            position={[geoLoctionPosition.lat, geoLoctionPosition.lng]}
            key="asdads"
          >
            <Popup>
              <span>current locaiton </span>
              <span>asdasd</span>
            </Popup>
          </Marker>
        ) : null}

        {cities.map((city) => {
          // console.log(city);
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji} </span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
