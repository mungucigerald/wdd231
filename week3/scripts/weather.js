const currentTemp = document.querySelector('#current-temp');
const icon = document.querySelector('#weather-icon');
const caption = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=3d84bee6921fe994ba1a6d6bfcdf934b';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed, status: ${response.status}`)
        }

        const data = await response.json();
        displayResults(data);
        
    } catch (error) {
        console.error('Error fetching data', error);
}
    
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}℃`;
    const iconsrc = `https://api.openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);

    caption.textContent = desc;
}
