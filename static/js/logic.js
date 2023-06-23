let myMap = L.map("map", {
  center: [29.4252, -98.4946],
  zoom: 12
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Assemble the API query URL.
let url = "/api/restaurants";

// Get the data with d3.
d3.json(url).then(function(response) {
  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  // Loop through the data.
  for (let i = 0; i < response.length; i++) {
    // Get the latitude and longitude from the location property.
    let lat = response[i].lat;
    let lng = response[i].lng;

    // Check if latitude and longitude exist.
    if (lat && lng) {
      // Create the HTML content for the popup.
      let popup= `<h3>${response[i].name}</h3>
        <p>Score: ${response[i].score}</p>
        <p>Price Range: ${response[i].price_range}</p>`;

      // Add a new marker to the cluster group, and bind a popup.
      let marker= markers.addLayer(L.marker([lat, lng]).bindPopup(popup));
      markers.addLayer(marker);
      
    }
  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);
});

const cfg = {
  type: 'bar',
  data: {
    datasets: [{
      data: ['name', 'score']
    }]
  },
  options: {
    parsing: {
      xAxisKey: 'name',
      yAxisKey: 'score'
    }
  }
}