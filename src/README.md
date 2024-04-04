# Language Map

Language spoken at home in the US are displayed as points. Data is from the US census.

## Data Prep

Languages spoken at home (question C16001) at the Census Tract level for 2020. This map ignores English to show the linguistic diversity of US households.

For every 250 speakers of a language, a point is placed randomly within the tract. Each language scatterplot layer is saved as a .geojson file.

Data prep and processing can be found in the notebook [c16001](https://github.com/wrynearson/us-census-language/blob/main/data-prep/c16001.ipynb)

## Visualization

Using Deck.gl & React, these geojson files are then loaded individually as layers. Users can toggle layers on and off. Hovering over a language name in the legend shows only that language on the map.

## Limitations

Areas with less than 250 speakers of a language don't appear. This is, for now, a technical limitation as the geojson files were getting very large.

## Development

Uses [Vite](https://vitejs.dev/) to bundle and serve files.

To run locally, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

Set `MAPBOX_TOKEN` in env variable, or directly in `app.jsx`.

To install dependencies:

```bash
npm install
# or
yarn
```

Commands:

- `npm start` is the development target, to serve the app and hot reload.
- `npm run build` is the production target, to create the final bundle and write to disk.
