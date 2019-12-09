# Tidal Wave (https://tides.violetlingenfelter.com)

## Getting started

To have a live reloading version of the site running locally for development, navigate to the root of the project directory and run:
```
npm run watch:tailwind
```
This will ensure that your postcss is being live reloaded. And in a seperate terminal window, run the following: 
```
npm run dev
```

To push changes to the production version of the site, navigate to the root of the project directory:
```
npm run export
cd __sapper__/export
npx surge --domain https://tidal-wave.surge.sh
```

## Changing the station

By default, the station being used for all the chart is Moss Landing Ocean Pier station (ID: 9413616). To change this, and see a station of your choosing, navigate to `src/store.js` and change the station variable to the desired station ID. 

### Resources & Links
 - Color palette inspired by [this ColorHunt palette](https://colorhunt.co/palette/112238?ref=tab).
 - Data from the [National Oceanic and Atmospheric Association](https://noaa.gov).
 - Made with [Sapper](https://sapper.svelte.dev) and [Svelte](https://svelte.dev).
 - Visualizations done with the excellent [D3.js](https://github.com/d3/d3/blob/master/API.md).
