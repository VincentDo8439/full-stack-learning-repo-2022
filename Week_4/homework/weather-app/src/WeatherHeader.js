import { React } from "react";
import "./WeatherHeader.css";
import pic from "./icons/01d.svg";

let Logo = require("./icons/01n.svg")

function WeatherHeader(props) {
  return (
    <>
      <div id="date">{props.date}</div>
      <div id="weather-for-city">Weather for {props.data[0]}</div>
      <div class="current-container">
        <div id="info-display">
          <text id="city-weather">{props.cityWeather}</text>
          <div id="description"></div>
          <div id="temp">{props.temp}</div>
          <div id="air-quality"></div>
        </div>
        <img id="weather-img" src={Logo} alt="Sunny" />
      </div>
    </>
  );
}

export default WeatherHeader;
