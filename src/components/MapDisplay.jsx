import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import omnivore from 'leaflet-omnivore';
import '../styles/MapDisplay.css';

// Fix for Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const { BaseLayer } = LayersControl;

const MapDisplay = ({ kmlData, parsedData }) => {
  const [mapLayers, setMapLayers] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (kmlData) {
      try {
        // Use omnivore to parse KML
        const kmlLayer = omnivore.kml.parse(kmlData);

        if (kmlLayer && kmlLayer.getBounds().isValid()) {
          setMapLayers(kmlLayer);
          setMapBounds(kmlLayer.getBounds());
        } else {
          console.warn("Invalid KML bounds, using default view");
        }
      } catch (error) {
        console.error("Error processing KML:", error);
      }
    }
  }, [kmlData]);

  // Function to style the GeoJSON features
  const featureStyle = (feature) => {
    const type = feature.geometry.type;

    // Different styles based on geometry type
    if (type.includes('Point')) {
      return { radius: 8, fillColor: "#ff7800", color: "#000", weight: 1, opacity: 1, fillOpacity: 0.8 };
    } else if (type.includes('LineString')) {
      return { color: "#3388ff", weight: 3, opacity: 0.7 };
    } else if (type.includes('Polygon')) {
      return { fillColor: "#28a745", color: "#28a745", weight: 2, opacity: 0.7, fillOpacity: 0.4 };
    } else {
      return { fillColor: "#e91e63", color: "#e91e63", weight: 2, opacity: 0.7, fillOpacity: 0.4 };
    }
  };

  // Map View when map is ready
  const MapView = () => {
    const map = useMap();

    useEffect(() => {
      if (mapBounds) {
        map.fitBounds(mapBounds);
      }
    }, [map, mapBounds]);

    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
          </BaseLayer>
          <BaseLayer name="Topographic">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            />
          </BaseLayer>
        </LayersControl>

        {mapLayers && <GeoJSON data={mapLayers.toGeoJSON()} style={featureStyle} />}
        <MapView />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
