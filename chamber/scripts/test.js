const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=0.063&lon=32.47&units=metric&appid=3d84bee6921fe994ba1a6d6bfcdf934b';
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0.063&lon=32.47&units=metric&appid=3d84bee6921fe994ba1a6d6bfcdf934b';
async function initWeather() {
    try {
        // todays weather
        const res = await fetch(url);
        const data = await res.json();

        const res2 = await fetch(url2);
        const data2 = await res2.json();
        
        const today = new Date().toDateString();

        const todayItems = data2.list.filter(x => new Date(x.dt * 1000).toDateString() === today);

        const temps = [data.main.temp, ...todayItems.map(x => x.main.temp)];

        const days = data2.list
            .filter(x => x.dt_txt.includes('12:00:00') && new Date(x.dt * 1000).toDateString() !== today).slice(0, 3);

        days.forEach((d, i) => {
            const n = i + 1;
            const weekday = new Date(d.dt * 1000).toLocaleDateString('en', { weekday: 'long' });

            const desc = d.weather[0].description;

            const temp = `${Math.round(d.main.temp)}℃`;

            console.log(`Day${n}: ${weekday}- Desc: ${desc}- Temp:${temp}`);
            console.log(`today:${today} | temps${temps} | days:${days.length}`)
        });
    } catch (error) {
        console.error(error);
    }


}

initWeather();