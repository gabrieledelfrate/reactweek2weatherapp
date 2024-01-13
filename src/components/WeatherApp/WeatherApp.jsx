import React, { useState } from 'react';
import './WeatherApp.css'
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import pressure_icon from "../Assets/pressure.png";
import sunrise_icon from "../Assets/sunrise.png";
import humidity_icon from "../Assets/humidity.png";
import TopBar from './SearchBar';

const WeatherApp = () => {
    const api_key = "4885c50d27905c5e89a84707f048b55c";

    const [wicon, setWicon] = useState(cloud_icon);

    const convertUnixTimeToHHMM = (unixTime) => {
        const date = new Date(unixTime * 1000); 
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }
    
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
        const sunrise = document.getElementsByClassName("sunrise")
        const pressure = document.getElementsByClassName("pressure")


        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name;
        sunrise[0].innerHTML = convertUnixTimeToHHMM(data.sys.sunrise)+" / "+convertUnixTimeToHHMM(data.sys.sunset);
        pressure[0].innerHTML = data.main.pressure+" mBar";

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(cloud_icon);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow_icon);
        }
        else
        {
            setWicon(clear_icon);
        }


    }
    return(
        <div className='main'>
            <div className='container'>
                
                <div className="weather-image">
                    <img src={wicon} alt="cloud icon" />
                </div>
                <div className='weather-temp'>°</div>
                <div className='weather-location'>Cerca una città!</div>
                <div className='data-container'>
                    <div className='grid-container'>
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
                        <div className='element'>
                            <img src={sunrise_icon} alt="sunrise icon" className='icon' />
                            <div className='data'>
                                <div className='sunrise'></div>
                                <div className="text">Alba/Tramonto</div>
                            </div>
                        </div>    
                        <div className='element'>
                            <img src={pressure_icon} alt="pressure icon" className='icon' />
                            <div className='data'>
                                <div className='pressure'>mbar</div>
                                <div className="text">Pressione</div>
                            </div>
                        </div>    
                    </div>
                </div>    
            </div>
            
                <TopBar search={search} />
            
        </div>
    )
}

export default WeatherApp;