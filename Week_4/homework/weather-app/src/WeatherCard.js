import './WeatherCard.css'
import pic from './icons/13d.svg'

function WeatherCard(props) {

    return (
        <>
            <div class = "weather-box">
				<div class = "weather-box-date" id = "box-date-1">{props.date}</div>
				<img class = "weather-box-img" id = "box-img-1" src={pic} alt="sunny"/>
				<div class = "weather-box-temp" id="box-temp-1">{props.minTemp+"° to "+props.maxTemp+"°"}</div>
			</div>
        </>
    )
}

export default WeatherCard;