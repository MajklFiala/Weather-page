import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import SearchIcon from '@mui/icons-material/Search';
import Clear from './assets/clear.mp4'
import Clouds from './assets/clouds.mp4'
import Rain from './assets/rain.mp4'
import Normal from './assets/normal.mp4'
import Thunder from './assets/thunder.mp4'
import Mist from './assets/mist.mp4'
import { NotAccessible, Source } from '@mui/icons-material';


function App() {

  const [lat, setLat] = useState(50)
  const [lon, setLon] = useState(14)

  const [userLocation, setUserLocation] = useState({})


  
  
  
  


  const [data, setData] = useState({})
  const [city, setCity] = useState()

  

 const getData = () =>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ec36c241aca2c584d61bde7bcd69ceaf`
  fetch(url).then(response => response.json()).then(file => setData(file));
  
 }



useEffect(() =>{
  if(city == undefined){
  navigator.geolocation.getCurrentPosition((position) => {setLat(position.coords.latitude); setLon(position.coords.longitude)});
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=894287a33b3540bd9434af524c85d4f5`).then(response => response.json()).then(result => setUserLocation(result.features));
 
  const urlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation[0] ? userLocation[0].properties.city : null}&units=metric&appid=ec36c241aca2c584d61bde7bcd69ceaf`
  fetch(urlTwo).then(response => response.json()).then(file => setData(file))
  }
}, [userLocation]) 
  
const [weather, setWeather] = useState(Normal)

console.log(data)

useEffect(() => {
  const c = data.weather ? data.weather[0].main : null

    if(c=='Clouds'){
      setWeather(Clouds)
    }
    else if(c=='Clear'){
      setWeather(Clear)

    }
    else if(c=='Rain'){
      setWeather(Rain)
    }
    else if(c=='Thunderstorm'){
      setWeather(Thunder)
    }
    else if(c=='Mist'){
      setWeather(Mist)
    }
    else{
      setWeather(Normal)
    }
}, [data])



  return (
    <>
    <div className='page'>
      <div className='app'>
        
        <div className='search'>
        <input onChange={(event) => {setCity(event.target.value)}} placeholder='Enter a city...'></input>
        <SearchIcon className='icon' onClick={getData}></SearchIcon>
        </div>
        <div className='container'>
          <h1>{data.name}</h1>
          {data.main ? <h3>{data.main.temp.toFixed(1)}°C</h3> : null}
          <div className='infoContainer'>
            <div className='info'>
              <p>Humidity</p>
              {data.main ? <p>{data.main.humidity}</p> : null}
            </div>
            <div className='info'>
              <p>Wind speed</p>
              {data.wind ? <p>{data.wind.speed.toFixed(0)}</p> : null}
            </div>
            <div className='info'>
              <p>Feels like</p>
              {data.main ? <p>{data.main.feels_like.toFixed(1)}</p> : null}
            </div>
          </div>
        </div>
        <div className='Video'>
          <video key={weather} autoPlay muted loop infinate='true'>
            <source src={weather}></source>
          </video>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
