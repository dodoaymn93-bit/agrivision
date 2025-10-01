async function fetchClimateData(lat, lon) {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&community=AG&latitude=${lat}&longitude=${lon}&format=JSON`;
    const response = await fetch(url);
    const data = await response.json();
    return data.properties.parameter;
}

async function fetchNDVI(lat, lon) {
    // Simulated NDVI API call (replace with GLAM/AppEEARS call if available)
    return Math.random().toFixed(2); // Random NDVI for demo
}

async function fetchSoilMoisture(lat, lon) {
    // Simulated Soil Moisture API call (replace with Crop-CASMA call if available)
    return Math.random().toFixed(2); // Random soil moisture for demo
}

async function chooseFarm(lat, lon) {
    document.getElementById("location").innerText = `Farm set at: ${lat}, ${lon}`;
    document.getElementById("fertilize").innerText = "🌱 Fertilized farm! Crop growth boosted.";
    document.getElementById("irrigate").innerText = "💧 Irrigated farm! Soil moisture increased.";

    const climateData = await fetchClimateData(lat, lon);
    const ndvi = await fetchNDVI(lat, lon);
    const soilMoisture = await fetchSoilMoisture(lat, lon);

    document.getElementById("precipitation").innerText = climateData.PRECTOTCORR ? climateData.PRECTOTCORR[Object.keys(climateData.PRECTOTCORR)[0]].toFixed(2) + " mm/day" : "-";
    document.getElementById("temperature").innerText = climateData.T2M ? climateData.T2M[Object.keys(climateData.T2M)[0]].toFixed(2) + " °C" : "-";
    document.getElementById("ndvi").innerText = ndvi;
    document.getElementById("soilMoisture").innerText = soilMoisture;

    triggerAnimations(ndvi, soilMoisture);
}

function triggerAnimations(ndvi, soilMoisture) {
    const farmImg = document.getElementById("farmImage");
    if (ndvi > 0.5 && soilMoisture > 0.5) {
        farmImg.classList.add("plant");
    } else {
        farmImg.classList.remove("plant");
    }
}
