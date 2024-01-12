import React from 'react';
import './WeatherApp.css'
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    const api_key = "4885c50d27905c5e89a84707f048b55c";
    
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "")
        {
            return 0;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

        let response = await  fetch(url);
        let data = await response.json();
        console.log(data);
        
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = data.wind.speed+"km/h";
        temperature[0].innerHTML = data.main.temp+"°C";
        location[0].innerHTML = data.name;

    }
    return(
        <div className='container'>
            
            <div className="weather-image">
                <img src={cloud_icon} alt="cloud icon" />
            </div>
            <div className='weather-temp'>°</div>
            <div className='weather-location'>Cerca una città!</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt="humidity icon" className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>%</div>
                        <div className="text">Umidità</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt="wind icon" className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>km/h</div>
                        <div className="text">Velocità del vento</div>
                    </div>
                </div>

            </div>

            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Cerca città...'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={search_icon} alt="search icon" />
                </div>
            </div>

        </div>
    )
}

export default WeatherApp;