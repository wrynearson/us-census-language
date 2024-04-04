import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { render } from "react-dom";
import { DeckGL } from "@deck.gl/react";
import InteractiveMap from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";

// Your layer configurations
const layerConfigs = [
  {
    id: "C16001_E003",
    label: "Spanish",
    url: "data/C16001_E003_250.geojson",
    color: [141, 211, 199, 200],
  },
  {
    id: "C16001_E006",
    label: "French",
    url: "data/C16001_E006_250.geojson",
    color: [255, 255, 179, 200],
  },
  {
    id: "C16001_E009",
    label: "German",
    url: "data/C16001_E009_250.geojson",
    color: [190, 186, 218, 200],
  },
  {
    id: "C16001_E012",
    label: "Russian",
    url: "data/C16001_E012_250.geojson",
    color: [251, 128, 114, 200],
  },
  {
    id: "C16001_E015",
    label: "Other Indo-European",
    url: "data/C16001_E015_250.geojson",
    color: [253, 180, 98, 200],
  },
  {
    id: "C16001_E018",
    label: "Korean",
    url: "data/C16001_E018_250.geojson",
    color: [179, 222, 105, 200],
  },
  {
    id: "C16001_E021",
    label: "Chinese",
    url: "data/C16001_E021_250.geojson",
    color: [252, 205, 229, 200],
  },
  {
    id: "C16001_E024",
    label: "Vietnamese",
    url: "data/C16001_E024_250.geojson",
    color: [217, 217, 217, 200],
  },
  {
    id: "C16001_E027",
    label: "Tagalog",
    url: "data/C16001_E027_250.geojson",
    color: [188, 128, 189, 200],
  },
  {
    id: "C16001_E030",
    label: "Other Asian",
    url: "data/C16001_E030_250.geojson",
    color: [204, 235, 197, 200],
  },
  {
    id: "C16001_E033",
    label: "Arabic",
    url: "data/C16001_E033_250.geojson",
    color: [255, 237, 111, 200],
  },
  {
    id: "C16001_E036",
    label: "Other",
    url: "data/C16001_E036_250.geojson",
    color: [255, 255, 255, 200],
  },
];

function App() {
  const [visibleLayers, setVisibleLayers] = useState(
    layerConfigs.reduce((acc, layer) => ({ ...acc, [layer.id]: true }), {})
  );
  const [hoveredLanguage, setHoveredLanguage] = useState(null); // Track the hovered language

  const toggleLayerVisibility = (id) => {
    setVisibleLayers((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    setHoveredLanguage(null); // Reset hover state when toggling visibility
  };

  const handleMouseEnter = (id) => {
    setHoveredLanguage(id);
  };

  const handleMouseLeave = () => {
    setHoveredLanguage(null);
  };

  const layers = layerConfigs
    .filter(
      (config) =>
        visibleLayers[config.id] &&
        (!hoveredLanguage || config.id === hoveredLanguage)
    )
    .map(
      (config) =>
        new GeoJsonLayer({
          id: config.id,
          data: config.url,
          getFillColor: config.color,
          filled: true,
          pointRadiusMinPixels: 1,
          pointRadiusScale: 75,
          pickable: true,
          autoHighlight: true,
          // Additional layer properties
        })
    );

  const Legend = ({ layerConfigs, visibleLayers, toggleLayerVisibility }) => (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        margin: "1rem",
        padding: "1rem",
        borderRadius: ".5rem",
        background: "rgba(100,100,100,.8)",
      }}
    >
      <h1
        style={{
          display: "flex",
          color: "white",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: "1.2rem",
        }}
      >
        Languages Spoken at Home
      </h1>
      <a
        href="https://github.com/wrynearson/us-census-language/blob/main/src/README.md"
        target="_blank"
        rel="noreferrer noopener"
        style={{
          display: "flex",
          color: "white",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: "1rem",
          paddingBottom: ".5rem",
        }}
      >
        About
      </a>
      {layerConfigs.map((layer) => (
        <div
          key={layer.id}
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: ".5rem",
            wrap: "no-wrap",
          }}
          onMouseEnter={() => handleMouseEnter(layer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <span
            style={{
              display: "inline-block",
              width: "1rem",
              height: "1rem",
              backgroundColor: `rgb(${layer.color.join(",")})`,
              marginRight: "10px",
              border: "1px solid rgba(0,0,0,0)",
            }}
          ></span>
          <label
            style={{
              display: "flex",
            }}
          >
            <input
              type="checkbox"
              checked={!!visibleLayers[layer.id]}
              onChange={() => toggleLayerVisibility(layer.id)}
            />
            <div
              style={{
                color: "white",
                fontFamily: "sans-serif",
                fontSize: "1rem",
              }}
            >
              {layer.label}
            </div>
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ position: "auto", height: "100vh" }}>
      <DeckGL
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3,
          pitch: 20,
        }}
        controller={true}
        layers={layers}
      >
        <InteractiveMap
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        />
      </DeckGL>
      <Legend
        layerConfigs={layerConfigs}
        visibleLayers={visibleLayers}
        toggleLayerVisibility={toggleLayerVisibility}
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
