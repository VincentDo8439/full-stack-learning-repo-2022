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

    return (
        <div id='main_container'>
            <div id='weather-container'>
                <WeatherHeader apiKey={props.apiKey} date={formatDate(0)}></WeatherHeader>
                <div id='weekly-weather'>
                    <WeatherCard date={formatDate(1)} minTemp="72" maxTemp="83"></WeatherCard>
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