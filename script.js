let farmLat, farmLon;

document.getElementById("select-farm").addEventListener("click", () => {
    const selection = document.getElementById("farm-select").value.split(",");
    farmLat = selection[0];
    farmLon = selection[1];
    document.getElementById("farm-selection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("location").innerText = "Location: " + document.getElementById("farm-select").selectedOptions[0].text;

    fetchNASAData(farmLat, farmLon);
});

async function fetchNASAData(lat, lon) {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&start=20250101&end=20251001&latitude=${lat}&longitude=${lon}&community=AG&format=JSON`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        let precipValues = Object.values(data.properties.parameter.PRECTOTCORR);
        let tempValues = Object.values(data.properties.parameter.T2M);

        let avgPrecip = (precipValues.reduce((a,b)=>a+b,0) / precipValues.length).toFixed(2);
        let avgTemp = (tempValues.reduce((a,b)=>a+b,0) / tempValues.length).toFixed(2);

        document.getElementById("precipitation").innerText = "Average Precipitation: " + avgPrecip + " mm/day";
        document.getElementById("temperature").innerText = "Average Temperature: " + avgTemp + " °C";

    } catch (err) {
        console.error("NASA API error:", err);
        document.getElementById("precipitation").innerText = "Average Precipitation: No data";
        document.getElementById("temperature").innerText = "Average Temperature: No data";
    }
}

function fertilize() {
    animateAction("🌱 Fertilizing...");
    log("🌱 Fertilized farm! Crop growth boosted.");
}

function irrigate() {
    animateAction("💧 Irrigating...");
    log("💧 Irrigated farm! Soil moisture increased.");
}

function manageLivestock() {
    animateAction("🐄 Managing livestock...");
    log("🐄 Livestock managed! Farm productivity improved.");
}

function animateAction(message) {
    const animationDiv = document.getElementById("animation");
    animationDiv.innerHTML = `<p>${message}</p>`;
    animationDiv.style.transition = "all 1s ease";
    animationDiv.style.fontSize = "24px";
    setTimeout(() => {
        animationDiv.innerHTML = "";
    }, 1500);
}

function log(message) {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML += `<p>${message}</p>`;
}
