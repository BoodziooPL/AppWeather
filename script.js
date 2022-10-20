const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')


const API_LINKS = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEYS = '&appid=f907785bceb09c0ce8c96865675665c6'
const API_UNIT = '&units=metric'

function getWeather (){
    const city = input.value || 'Krakow'
    const URL = API_LINKS + city + API_KEYS + API_UNIT
    axios.get(URL).then(res=>{
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)
        const ico = status.id
        cityName.textContent = city.toUpperCase()
        warning.textContent = ''
        input.value = ''

       if(ico <= 200 && ico >= 300){
        photo.setAttribute('src', './img/thunderstorm.png')
       }else if(ico <= 300 && ico >= 400){
        photo.setAttribute('src', './img/drizzle.png')
       }else if(ico <= 500 && ico >= 550){
        photo.setAttribute('src', './img/rain.png')
       }else if(ico <= 600 && ico >= 680){
        photo.setAttribute('src', './img/snow.png')
       }else if(ico <=700 && ico >= 781){
        photo.setAttribute('src', './img/fog.png')
       }else if(ico === 800){
        photo.setAttribute('src', './img/sun.png')
       }else if(ico >= 800 && ico < 805){
        photo.setAttribute('src', './img/cloud.png')
       }
    
        weather.textContent = status.main
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
        
    }).catch(()=> warning.textContent = 'wpisz poprawna nazwe miasta')
}

const enterCheck = (e) => {
    if(e.key === 'Enter'){
        getWeather()
    }
}
input.addEventListener('keyup',enterCheck)
button.addEventListener('click', getWeather)
getWeather()