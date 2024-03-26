import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const LANGUAGE = "data_750.geojson";

// source: https://colorbrewer2.org/#type=qualitative&scheme=Set3&n=12
const colormap = {
  C16001_E002: [141, 211, 199, 200],
  C16001_E003: [255, 255, 179, 200],
  C16001_E006: [190, 186, 218, 200],
  C16001_E009: [251, 128, 114, 200],
  C16001_E012: [128, 177, 211, 200],
  C16001_E015: [253, 180, 98, 200],
  C16001_E018: [179, 222, 105, 200],
  C16001_E021: [252, 205, 229, 200],
  C16001_E024: [217, 217, 217, 200],
  C16001_E027: [188, 128, 189, 200],
  C16001_E030: [204, 235, 197, 200],
  C16001_E033: [255, 237, 111, 200],
  C16001_E036: [255, 255, 255, 200],
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
        pointRadiusScale: 75,
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
