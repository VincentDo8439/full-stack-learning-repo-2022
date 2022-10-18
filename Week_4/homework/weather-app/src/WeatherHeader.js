import { React } from "react";
import './WeatherHeader.css'
import pic from "./icons/01d.svg"

function WeatherHeader(props) {

    return (
        <>
            <div id="date">
				{props.date}
            </div>
            <div id="weather-for-city">
                    Weather for {props.data[0]}
            </div>
            <div class="current-container">
                <div id="info-display">
                    <div id="city-weather"></div>
                    <div id="description"></div>
                    <div id="temp"></div>
                    <div id="air-quality"></div>
            </div>
            <img id="weather-img" src={pic} alt="Sunny"/>
            </div>
        </>
    );
}

export default WeatherHeader;