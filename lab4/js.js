document.getElementById('weatherButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert('nazwa miejscowości.');
        return;
    }
    getCurrentWeather(location);
    getForecast(location);
});

function getCurrentWeather(location) {
    const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=pl`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Bieżąca pogoda:", data);
            document.getElementById('weatherInfo').innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Ikona pogody">
                Temperatura: ${data.main.temp}°C, 
                Opis: ${data.weather[0].description}
            `;
        } else if (xhr.readyState === 4) {
            alert('Nie udało się pobrać bieżącej pogody.');
        }
    };
    xhr.send();
}

function getForecast(location) {
    const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Nie udało się pobrać prognozy.');
            return response.json();
        })
        .then(data => {
            console.log("Prognoza pogody:", data);
            const forecastList = data.list.slice(0, 5).map(item => {
                const date = new Date(item.dt * 1000);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                return `${formattedDate}: Temp: ${item.main.temp}°C, ${item.weather[0].description}`;
            });
            document.getElementById('forecastInfo').innerText = forecastList.join('\n');
        })
        .catch(error => alert(error.message));
}
