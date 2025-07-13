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
        // Forzar cursor flecha aquí es mejor hacerlo con CSS, pero lo puedes intentar también aquí:
        // interactive: true // ya está activado por defecto
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.ADMIN || "País desconocido";

        // Bind tooltip que aparece al pasar el mouse, desplazado afuera
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

        // Evento mouseover: cambiar estilo para resaltar
        layer.on('mouseover', function () {
          this.setStyle(highlightStyle);
        });

        // Evento mouseout: volver al estilo normal
        layer.on('mouseout', function () {
          this.setStyle(defaultStyle);
        });

        // Evitar que el cursor cambie a manito: podemos forzar el cursor con CSS
      }
    }).addTo(map);
  });