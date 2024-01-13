import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";

const TopBar = ({ search }) => {
    return (
        <div className='top-bar' style={{ position: 'sticky', bottom: 9 }}>
            <input type="text" className='cityInput' placeholder='Cerca città...'/>
            <div className='search-icon' onClick={search}>
                <img src={search_icon} alt="search icon" />
            </div>
        </div>
    )
}

export default TopBar;
