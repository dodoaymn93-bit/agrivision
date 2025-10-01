const farmSelect = document.getElementById("farmSelect");
const fertilizeBtn = document.getElementById("fertilizeBtn");
const irrigateBtn = document.getElementById("irrigateBtn");
const updateBtn = document.getElementById("updateBtn");
const messageEl = document.getElementById("message");
const dataEl = document.getElementById("data");
const farmMap = document.getElementById("farmMap");

let fertilized = false;
let irrigated = false;
let farmCoords = farmSelect.value.split(",");

function updateMap(lat, lon) {
    farmMap.src = `https://worldview.earthdata.nasa.gov/?p=geographic&v=MODIS_Terra_CorrectedReflectance_TrueColor,MODIS_Aqua_CorrectedReflectance_TrueColor&l=MODIS_Terra_CorrectedReflectance_TrueColor,MODIS_Aqua_CorrectedReflectance_TrueColor&t=2025-10-01&lat=${lat}&lon=${lon}&z=5`;
}

async function getNASAWeather(lat, lon) {
    let startDate = "20251001";
    let endDate = "20251001";
    let url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&start=${startDate}&end=${endDate}&latitude=${lat}&longitude=${lon}&community=AG&format=JSON`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        let precip = Object.values(data.properties.parameter.PRECTOTCORR)[0];
        let temp = Object.values(data.properties.parameter.T2M)[0];
        return { precip, temp };
    } catch (error) {
        console.error("NASA POWER API error:", error);
        return { precip: -999, temp: -999 };
    }
}

function updateMessage(weather) {
    let msg = "";
    if (fertilized) msg += "🌱 Fertilized farm! Crop growth boosted.\n";
    if (irrigated) msg += "💧 Irrigated farm! Soil moisture increased.\n";
    msg += "📊 NASA Data:\n";
    msg += `Average Precipitation: ${weather.precip} mm/day\n`;
    msg += `Average Temperature: ${weather.temp} °C`;
    messageEl.innerText = msg;
}

fertilizeBtn.addEventListener("click", () => {
    fertilized = true;
    messageEl.innerText = "🌱 Fertilized farm! Crop growth boosted.";
});

irrigateBtn.addEventListener("click", () => {
    irrigated = true;
    messageEl.innerText = "💧 Irrigated farm! Soil moisture increased.";
});

updateBtn.addEventListener("click", async () => {
    farmCoords = farmSelect.value.split(",");
    updateMap(farmCoords[0], farmCoords[1]);
    let weather = await getNASAWeather(farmCoords[0], farmCoords[1]);
    updateMessage(weather);
});

window.onload = () => {
    updateMap(farmCoords[0], farmCoords[1]);
};
