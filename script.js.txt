// Initialize Leaflet map
var map = L.map('map').setView([31.5, -9.7], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Store farm location
var farmLocation = { lat: 31.5, lon: -9.7 };
map.on('click', function(e) {
    farmLocation.lat = e.latlng.lat;
    farmLocation.lon = e.latlng.lng;
    document.getElementById("output").innerHTML = "Farm set at: " + farmLocation.lat.toFixed(2) + ", " + farmLocation.lon.toFixed(2);
});

// Fertilize action
function fertilize() {
    document.getElementById("output").innerHTML += "<br>🌱 Fertilized farm! Crop growth boosted.";
}

// Irrigate action
function irrigate() {
    document.getElementById("output").innerHTML += "<br>💧 Irrigated farm! Soil moisture increased.";
}

// Fetch NASA POWER API data
async function checkData() {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&start=20251001&end=20251007&latitude=${farmLocation.lat}&longitude=${farmLocation.lon}&community=AG&format=JSON`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const precipitation = data.properties.parameter.PRECTOTCORR;
        const temperature = data.properties.parameter.T2M;

        document.getElementById("output").innerHTML += `<br>📊 NASA Data:
        <br>Average Precipitation: ${averageObjectValue(precipitation).toFixed(2)} mm/day
        <br>Average Temperature: ${averageObjectValue(temperature).toFixed(2)} °C`;
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerHTML += "<br>Error loading NASA data.";
    }
}

function averageObjectValue(obj) {
    let sum = 0, count = 0;
    for (let key in obj) {
        sum += obj[key];
        count++;
    }
    return sum / count;
}
