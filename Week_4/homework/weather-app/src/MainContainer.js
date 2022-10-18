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

    let tempRanges = [];

    let apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.data[3]}&lon=${props.data[4]}&appid=${props.apiKey}&units=imperial`;
				// calls the API
				fetch(apiCall)
					.then((response) => 
						// after recieving a response, take the response from the server and convert it to JSON 
						response.json()
					)
					.then((data) => {
                        let temp = document.querySelector('#temp')
						temp.innerHTML = data.list[0].main.temp+"°F"

						let main = document.querySelector('#city-weather')
						main.innerHTML = data.list[0].weather[0].main

						let description = document.querySelector('#description')
						description.innerHTML = data.list[0].weather[0].description
						// document.getElementById("weather-img").src = 'icons/'+data.list[0].weather[0].icon+'.svg'


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
                                tempRanges[(i*2)] = min_temp
                                tempRanges[(i*2)+1] = max_temp
								//document.getElementById("box-img-"+(i+1)).src = 'icons/'+box_img+'.svg'
							}
						}
					});
    let api2Call = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.data[3]}&lon=${props.data[4]}&appid=${props.apiKey}`;
    fetch(api2Call)
        .then((response) =>
            response.json()
        )
        .then((data) => {
            document.getElementById("air-quality").innerHTML = 'AQI: '+data.list[0].main.aqi
        })
    console.log(tempRanges)
    //let min_temp1 = tempRanges[0];
    return (
        <div id='main_container'>
            <div id='weather-container'>
                <WeatherHeader data={props.data} apiKey={props.apiKey} date={formatDate(0)}></WeatherHeader>
                <div id='weekly-weather'>
                    <WeatherCard date={formatDate(1)} minTemp={tempRanges[0]} maxTemp={tempRanges[1]}></WeatherCard>
                    <WeatherCard date={formatDate(2)} minTemp={tempRanges[2]} maxTemp={tempRanges[3]}></WeatherCard>
                    <WeatherCard date={formatDate(3)} minTemp={tempRanges[4]} maxTemp={tempRanges[5]}></WeatherCard>
                    <WeatherCard date={formatDate(4)} minTemp={tempRanges[6]} maxTemp={tempRanges[7]}></WeatherCard>
                    <WeatherCard date={formatDate(5)} minTemp={tempRanges[8]} maxTemp={tempRanges[9]}></WeatherCard>
                </div>
            </div>
            
        </div>
    );
}

export default MainContainer;