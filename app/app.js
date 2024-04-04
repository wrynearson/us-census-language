import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
// const LANGUAGE = "data_750.geojson";

// const geojsonData = {
//   "C16001_E002_250.geojson": "C16001_E002",
//   "C16001_E003_250.geojson": "C16001_E003",
//   "C16001_E006_250.geojson": "C16001_E006",
//   "C16001_E009_250.geojson": "C16001_E009",
//   "C16001_E012_250.geojson": "C16001_E012",
//   "C16001_E015_250.geojson": "C16001_E015",
//   "C16001_E018_250.geojson": "C16001_E018",
//   "C16001_E021_250.geojson": "C16001_E021",
//   "C16001_E024_250.geojson": "C16001_E024",
//   "C16001_E027_250.geojson": "C16001_E027",
//   "C16001_E030_250.geojson": "C16001_E030",
//   "C16001_E033_250.geojson": "C16001_E033",
//   "C16001_E036_250.geojson": "C16001_E036",
// };

// const layerConfigs = [
//   {
//     id: "C16001_E002",
//     data: geojsonData["C16001_E002"],
//     color: [141, 211, 199, 200],
//   },
//   {
//     id: "C16001_E003",
//     data: geojsonData["C16001_E003"],
//     color: [255, 255, 179, 200],
//   },
//   {
//     id: "C16001_E006",
//     data: geojsonData["C16001_E006"],
//     color: [190, 186, 218, 200],
//   },
//   {
//     id: "C16001_E009",
//     data: geojsonData["C16001_E009"],
//     color: [251, 128, 114, 200],
//   },
//   {
//     id: "C16001_E012",
//     data: geojsonData["C16001_E012"],
//     color: [128, 177, 211, 200],
//   },
//   {
//     id: "C16001_E015",
//     data: geojsonData["C16001_E015"],
//     color: [253, 180, 98, 200],
//   },
//   {
//     id: "C16001_E018",
//     data: geojsonData["C16001_E018"],
//     color: [179, 222, 105, 200],
//   },
//   {
//     id: "C16001_E021",
//     data: geojsonData["C16001_E021"],
//     color: [252, 205, 229, 200],
//   },
//   {
//     id: "C16001_E024",
//     data: geojsonData["C16001_E024"],
//     color: [217, 217, 217, 200],
//   },
//   {
//     id: "C16001_E027",
//     data: geojsonData["C16001_E027"],
//     color: [188, 128, 189, 200],
//   },
//   {
//     id: "C16001_E030",
//     data: geojsonData["C16001_E030"],
//     color: [204, 235, 197, 200],
//   },
//   {
//     id: "C16001_E033",
//     data: geojsonData["C16001_E033"],
//     color: [255, 237, 111, 200],
//   },
//   {
//     id: "C16001_E036",
//     data: geojsonData["C16001_E036"],
//     color: [255, 255, 255, 200],
//   },
// ];

// source: https://colorbrewer2.org/#type=qualitative&scheme=Set3&n=12
// const colormap = {
//   C16001_E002: [141, 211, 199, 200],
//   C16001_E003: [255, 255, 179, 200],
//   C16001_E006: [190, 186, 218, 200],
//   C16001_E009: [251, 128, 114, 200],
//   C16001_E012: [128, 177, 211, 200],
//   C16001_E015: [253, 180, 98, 200],
//   C16001_E018: [179, 222, 105, 200],
//   C16001_E021: [252, 205, 229, 200],
//   C16001_E024: [217, 217, 217, 200],
//   C16001_E027: [188, 128, 189, 200],
//   C16001_E030: [204, 235, 197, 200],
//   C16001_E033: [255, 237, 111, 200],
//   C16001_E036: [255, 255, 255, 200],
// };

// function getFillColor(feature) {
//   const language = feature.properties.language; // Assuming each feature has a 'language' property
//   return colormap[language] || [0, 0, 0, 100];
// }

const INITIAL_VIEW_STATE = {
  latitude: 37,
  longitude: -95,
  zoom: 3,
  bearing: 0,
  pitch: 20,
};

class Root extends Component {
  _onHover(info) {
    if (info.object) {
      // eslint-disable-next-line
      console.log(`${info.object.properties.language_name}`);
      return info.object.properties.language_name;
    }
  }

  render() {
    const SpanishLayer = new GeoJsonLayer({
      id: "spanish",
      data: "data/C16001_E003_250.geojson",
      getFillColor: [141, 211, 199, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const FrenchLayer = new GeoJsonLayer({
      id: "french",
      data: "data/C16001_E006_250.geojson",
      getFillColor: [190, 186, 218, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const GermanLayer = new GeoJsonLayer({
      id: "german",
      data: "data/C16001_E009_250.geojson",
      getFillColor: [251, 128, 114, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const RussianLayer = new GeoJsonLayer({
      id: "russian",
      data: "data/C16001_E012_250.geojson",
      getFillColor: [251, 128, 114, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const OtherIndoEuropeanLayer = new GeoJsonLayer({
      id: "other_indo_euro",
      data: "data/C16001_E015_250.geojson",
      getFillColor: [253, 180, 98, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const KoreanLayer = new GeoJsonLayer({
      id: "korean",
      data: "data/C16001_E018_250.geojson",
      getFillColor: [179, 222, 105, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const ChineseLayer = new GeoJsonLayer({
      id: "chinese",
      data: "data/C16001_E021_250.geojson",
      getFillColor: [252, 205, 229, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const VietnameseLayer = new GeoJsonLayer({
      id: "vietnamese",
      data: "data/C16001_E024_250.geojson",
      getFillColor: [217, 217, 217, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const TagalogLayer = new GeoJsonLayer({
      id: "tagalog",
      data: "data/C16001_E027_250.geojson",
      getFillColor: [188, 128, 189, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const OtherAsianLayer = new GeoJsonLayer({
      id: "other_asian",
      data: "data/C16001_E030_250.geojson",
      getFillColor: [204, 235, 197, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const ArabicLayer = new GeoJsonLayer({
      id: "arabic",
      data: "data/C16001_E033_250.geojson",
      getFillColor: [255, 237, 111, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const OtherLayer = new GeoJsonLayer({
      id: "other",
      data: "data/C16001_E036_250.geojson",
      getFillColor: [255, 255, 255, 200],
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 75,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onHover: this._onHover,
      visible: true,
    });

    const layers = [
      SpanishLayer,
      FrenchLayer,
      GermanLayer,
      RussianLayer,
      OtherIndoEuropeanLayer,
      KoreanLayer,
      ChineseLayer,
      VietnameseLayer,
      TagalogLayer,
      OtherAsianLayer,
      ArabicLayer,
      OtherLayer,
    ];

    // for React
    // const [visibility, setVisibility] = useState({
    //   english: true,
    //   french: true,
    //   german: true,
    //   russian: true,
    //   other_indo_euro: true,
    //   korean: true,
    //   chinese: true,
    //   vietnamese: true,
    //   tagalog: true,
    //   other_asian: true,
    //   arabic: true,
    //   other: true
    // });

    // // Toggle visibility for a given layer
    // const toggleLayerVisibility = (id) => {
    //   setVisibility((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    // };

    // // Update each layer's visibility based on state before rendering
    // const layers = languageLayers.map((layer) => ({
    //   ...layer,
    //   visible: visibility[layer.id],
    // }));

    return (
      <div style={{ position: "auto", height: "100vh" }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v11"
          />
        </DeckGL>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: "10px",
            background: "white",
            padding: "10px",
          }}
        >
          <h3>Legend</h3>
          <ol>
            <li>
              <div
                style={{
                  background: "rgba(141, 211, 199, 200)",
                }}
              >
                Spanish
              </div>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

/* global document */
render(<Root />, document.body.appendChild(document.createElement("div")));
