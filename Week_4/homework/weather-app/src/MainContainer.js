import './MainContainer.css'
import WeatherCard from './WeatherCard';
import WeatherHeader from './WeatherHeader';

function MainContainer(props) {

    function formatDate(daysFromNow = 0) {
        let output = ''
        var date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        output += date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase()
        output += ' ' + date.getDate()
        return output
    }

    let tempRanges;

    let apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.data.lat}&lon=${props.data.lon}&appid=${props.apiKey}&units=imperial`;
				// calls the API
				fetch(apiCall)
					.then((response) => 
						// after recieving a response, take the response from the server and convert it to JSON 
						response.json()
					)
					.then((data) => {
						let hours = 0
						for (let i = 0; i < 5; i++){
							let max_temp = data.list[hours].main.temp
							let min_temp = data.list[hours].main.temp
							let box_img = "02d.svg"
							for (let j = 0; j < 8; j++){
								if (data.list[hours].main.temp > max_temp){
									max_temp = data.list[hours].main.temp
								}
								if (data.list[hours].main.temp < min_temp){
									max_temp = data.list[hours].main.temp
								}
								if (j == 0){
									box_img = data.list[hours].weather[0].icon
								}
								max_temp = Math.floor(max_temp)
								min_temp = Math.round(min_temp)
								hours++;
                                tempRanges.maxTemp1 = max_temp
                                tempRanges.minTemp1 = min_temp
								document.getElementById("box-date-"+(i+1)).innerHTML = formatDate(i+1)
								document.getElementById("box-temp-"+(i+1)).innerHTML = max_temp+"°F to "+min_temp+"°F"
								document.getElementById("box-img-"+(i+1)).src = 'icons/'+box_img+'.svg'
							}
						}
					});

    //i want to be able to access lat, lon which was set in SideContainer.js
    return (
        <div id='main_container'>
            <div id='weather-container'>
                <WeatherHeader data= {props.data} apiKey={props.apiKey} date={formatDate(0)}></WeatherHeader>
                <div id='weekly-weather'>
                    <WeatherCard data={props.data} apiKey={props.apiKey} date={formatDate(1)} minTemp="72" maxTemp="83"></WeatherCard>
                    <WeatherCard date={formatDate(2)} minTemp="72" maxTemp="83"></WeatherCard>
                    <WeatherCard date={formatDate(3)} minTemp="72" maxTemp="83"></WeatherCard>
                    <WeatherCard date={formatDate(4)} minTemp="72" maxTemp="83"></WeatherCard>
                    <WeatherCard date={formatDate(5)} minTemp="72" maxTemp="83"></WeatherCard>
                </div>
            </div>
            
        </div>
    );
}

export default MainContainer;