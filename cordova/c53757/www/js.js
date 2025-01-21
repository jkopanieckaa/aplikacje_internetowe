document.getElementById('weatherButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('Podaj nazwę miejscowości.');
        return;
    }
    getCurrentWeather(location);
    getForecast(location);
});

function getCurrentWeather(location) {
    const apiKey = '71c0d0e44ebf4e273a3cc2213c575a67';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=pl`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Bieżąca pogoda:", data);
            drawWeather(data);
        }
    };
    xhr.send();
}

function drawWeather(data) {
    document.getElementById('weatherInfo').innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        Temperatura: ${data.main.temp}°C, 
        Opis: ${data.weather[0].description}
    `;
}

function getForecast(location) {
    const apiKey = '71c0d0e44ebf4e273a3cc2213c575a67';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Nie udało się pobrać prognozy.');
            return response.json();
        })
        .then(data => {
            console.log("Prognoza pogody na 5dni:", data);
            const forecastList = data.list.slice(0, 5).map(item => {
                const date = new Date(item.dt * 1000);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                return `${formattedDate}: Temp: ${item.main.temp}°C, ${item.weather[0].description}`;
            });
            document.getElementById('forecastInfo').innerText = forecastList.join('\n');
        })
        .catch(error => alert(error.message));
}
