import React, { useState, useEffect } from 'react';

const MeteoGiornaliero = ({ lat, lon }) => {
    const [forecastData, setForecastData] = useState([]);
    const api_key = "4885c50d27905c5e89a84707f048b55c";

    useEffect(() => {
        const fetchForecastData = async () => {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`);
            const data = await response.json();
            setForecastData(data.list);
        };

        fetchForecastData();
    }, [lat, lon]);

    return (
        <div className='meteo-giornaliero' style={{ height: '2rem', width: '6rem', borderRadius: '10px' }}>
            {forecastData.slice(0, 5).map((data, index) => (
                <div key={index} className='forecast-section' style={{ height: '1rem', width: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div>{Math.floor(data.main.temp)}°C</div>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='weather-icon' />
                    <div>{new Date(data.dt * 1000).getHours()}:00</div>
                </div>
            ))}
        </div>
    )
}

export default MeteoGiornaliero;
