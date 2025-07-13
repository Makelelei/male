const map = L.map('map', {
  worldCopyJump: false,
  maxBounds: [[-90, -180], [90, 180]]
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  noWrap: true
}).addTo(map);

fetch('countries.geo.json')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: '#3388ff',
        weight: 1,
        fillColor: '#66ccff',
        fillOpacity: 0.5,
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.ADMIN || "País desconocido";

        // Tooltip con nombre al pasar el cursor
        layer.bindTooltip(name, {
          direction: 'top',
          offset: [0, -10],
          opacity: 0.9,
          sticky: true
        });

        // Estilo base
        const defaultStyle = {
          color: '#3388ff',
          weight: 1,
          fillColor: '#66ccff',
          fillOpacity: 0.5
        };

        // Estilo resaltado
        const highlightStyle = {
          color: '#ff6600',
          weight: 3,
          fillColor: '#ffaa00',
          fillOpacity: 0.7
        };

        // Al pasar el mouse, cambia el estilo para resaltar
        layer.on('mouseover', function () {
          this.setStyle(highlightStyle);
        });

        // Al quitar el mouse, vuelve al estilo base
        layer.on('mouseout', function () {
          this.setStyle(defaultStyle);
        });
      }
    }).addTo(map);
  });
