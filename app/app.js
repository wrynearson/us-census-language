import React, { Component } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer, ArcLayer } from "deck.gl";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const LANGUAGE = "data_750.geojson";

const colormap = {
  C16001_E002: [163, 18, 23, 200],
  C16001_E003: [236, 127, 214, 200],
  C16001_E006: [43, 36, 94, 200],
  C16001_E009: [220, 114, 5, 200],
  C16001_E012: [254, 159, 197, 200],
  C16001_E015: [195, 116, 246, 200],
  C16001_E018: [190, 26, 52, 200],
  C16001_E021: [138, 98, 188, 200],
  C16001_E024: [36, 146, 235, 200],
  C16001_E027: [97, 225, 152, 200],
  C16001_E030: [221, 155, 80, 200],
  C16001_E033: [46, 99, 217, 200],
  C16001_E036: [218, 119, 167, 200],
};

function getFillColor(feature) {
  const language = feature.properties.language; // Assuming each feature has a 'language' property
  return colormap[language] || [0, 0, 0, 100];
}

const INITIAL_VIEW_STATE = {
  latitude: 37,
  longitude: -95,
  zoom: 3,
  bearing: 0,
  pitch: 30,
};

class Root extends Component {
  _onHover(info) {
    if (info.object) {
      // eslint-disable-next-line
      console.log(`${info.object.properties.language_name}`);
    }
  }

  render() {
    const layers = [
      new GeoJsonLayer({
        id: "id",
        data: LANGUAGE,
        // Styles
        filled: true,
        pointRadiusMinPixels: 1,
        pointRadiusScale: 50,
        getFillColor: getFillColor,
        // Interactive props
        pickable: true,
        autoHighlight: true,
        onHover: this._onHover,
      }),
    ];

    return (
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
    );
  }
}

/* global document */
render(<Root />, document.body.appendChild(document.createElement("div")));
