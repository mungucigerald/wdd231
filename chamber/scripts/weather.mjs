const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0.063&lon=32.47&units=metric&appid=3d84bee6921fe994ba1a6d6bfcdf934b';
const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=0.063&lon=32.47&units=metric&appid=3d84bee6921fe994ba1a6d6bfcdf934b';

const city = document.getElementById('city');
const temp = document.getElementById('temp');
const desc = document.getElementById('w-description');
const icon = document.querySelector('#weather-icon img');
const hiLow = document.getElementById('hi-lo');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

export async function initWeather() {
    try {
        // todays weather
        const res = await fetch(url);
        const data = await res.json();

        city.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)} ℃`;
        desc.textContent = data.weather[0].description;
        hiLow.textContent = `${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`

        // 3day forecast
        const res2 = await fetch(url2);
        const data2 = await res2.json();
        const today = new Date().toDateString();
        const todayItems = data2.list.filter(x => new Date(x.dt * 1000).toDateString() === today);
        const temps = [data.main.temp, ...todayItems.map(x => x.main.temp)];
        const days = data2.list
            .filter(x => x.dt_txt.includes('12:00:00') && new Date(x.dt * 1000).toDateString() !== today).slice(0, 3);
        
        hiLow.textContent = `${Math.round(Math.max(...temps))}° / ${Math.round(Math.min(...temps))}°`;
        days.forEach((d, i) => {
            const n = i + 1;
            document.getElementById(`day${n}`).textContent = new Date(d.dt * 1000).toLocaleDateString('en', { weekday: 'long' });

            document.getElementById(`info${n}`).textContent = d.weather[0].description;

            document.getElementById(`day-temp${n}`).textContent = `${Math.round(d.main.temp)} ℃`
        });
    } catch (error) {
        console.error(error);
    }
}