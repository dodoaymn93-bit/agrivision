async function fetchNASAData(lat, lon) {
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M&start=20240101&end=20241231&latitude=${lat}&longitude=${lon}&community=AG&format=JSON`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.properties || !data.properties.parameter) {
            throw new Error("No data found for this location/date.");
        }

        let precipValues = Object.values(data.properties.parameter.PRECTOTCORR || {});
        let tempValues = Object.values(data.properties.parameter.T2M || {});

        if (precipValues.length === 0 || tempValues.length === 0) {
            throw new Error("Data missing for this location.");
        }

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
