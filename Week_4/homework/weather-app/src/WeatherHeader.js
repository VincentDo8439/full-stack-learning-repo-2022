import { React } from "react";
import './WeatherHeader.css'
import pic from "./icons/01d.svg"

function WeatherHeader(props) {



    /*let api2Call = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.city.lat}&lon=${props.city.lon}&appid=${props.apiKey}`;
    fetch(api2Call)
        .then((response) =>
            response.json()
        )
        .then((data) => {
            document.getElementById("air-quality").innerHTML = 'AQI: '+data.list[0].main.aqi
        })*/

    return (
        <>
            <div id="date">
				{props.date}
            </div>
            <div id="weather-for-city">
                    Weather for {props.data.fullName}
            </div>
            <div class="current-container">
                <div id="info-display">
                    <div id="city-weather">Sunny</div>
                    <div id="description">partly cloudy</div>
                    <div id="temp">56</div>
                    <div id="air-quality">AQI: 1</div>
            </div>
            <img id="weather-img" src={pic} alt="Sunny"/>
            </div>
        </>
    );
}

export default WeatherHeader;