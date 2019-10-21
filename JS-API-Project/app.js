
// variables   
const key = '18d263d6f09545c8cee2687ebb255759';
const calLatitude = 51.049999;  
const calLongitude = -114.066666;

// Event Listeners
window.addEventListener('load', getCityWeather(calLatitude, calLongitude));

document.querySelector('.toronto').addEventListener('click', function() {
    getCityWeather(43.651070, -79.347015);
});

document.querySelector('.vancouver').addEventListener('click', function() {
    getCityWeather(49.246292, -123.116226);
});

document.querySelector('.winnipeg').addEventListener('click', function() {
    getCityWeather(49.895077, -97.138451);
});


// functions
function getCityWeather(calLatitude, calLongitude) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/18d263d6f09545c8cee2687ebb255759/${calLatitude},${calLongitude}?units=si`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            let output = `
                <h1>Current Weather in ${pullCityName(data.timezone)}</h1>
                <div class="weather-params">
                    <div class="weather-params-titles">
                        <div>temperature</div>
                        <div>feels like</div>
                        <div>humidity</div>
                        <div>wind speed</div>
                        <div>cloud cover</div>
                        <div>visibility</div>
                    </div>
                    <div class="weather-params-values">
                        <div class="temp">${data.currently.temperature} °C</div>
                        <div>${data.currently.apparentTemperature} °C</div>
                        <div>${Number(data.currently.humidity) * 100} %</div>
                        <div>${data.currently.windSpeed} m/s</div>
                        <div>${Number(data.currently.cloudCover) * 100} %</div>
                        <div>${data.currently.visibility} km</div>
                    </div>
                    <div class="weather-params-forecast">
                        <p>${data.hourly.summary}</p>
                        <p>${data.daily.summary}</p>
                    </div>
                </div>
            `;
            document.querySelector('.weather').innerHTML = output;
        })
};


function pullCityName(name) {
    let nameArr = name.split('/');
    return nameArr[1];
}


