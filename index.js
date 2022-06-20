const gStreets = L.tileLayer(
  'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }
);

const googleSat = L.tileLayer(
  'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }
);

var baseMaps = {
  'Normal view': gStreets,
  'Satelite view': googleSat,
};

const sa = L.geoJSON(studyArea, {
  onEachFeature: function (feature, layer) {
    var popupContent =
      '<h2>Polygon No: ' +
      feature.properties.Id +
      '</h2>' +
      '<p><a class ="info" href="https://raw.githubusercontent.com/iamdnp/Time-Series-Data/main/GRAPHS/Active_Channel/Polygon_' +
      feature.properties.Id +
      '-2.png" target="_blank">Active Channel Width</a></p>' +
      '<p><a class ="info" href="https://raw.githubusercontent.com/iamdnp/Time-Series-Data/main/GRAPHS/Wetted_Channel/Polygon_' +
      feature.properties.Id +
      '.png" target="_blank">Wetted Channel Width</a></p>';

    layer.bindPopup(popupContent);
  },
  coordsToLatLng: function (coords) {
    var latLng = L.CRS.EPSG3857.unproject(L.point(coords));
    return latLng;
  },
  style: {
    fillColor: '#4B7BE5',
    color: 'Black',
    weight: 1,
  },
});

var map = L.map('map', {
  layers: [gStreets, sa],
}).setView([25.4, 83.12], 9);

var controlLayers = L.control.layers(baseMaps).addTo(map);
