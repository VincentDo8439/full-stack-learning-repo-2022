import './SideContainer.css'
import React from 'react';

function SideContainer(childToParent) {

    // variable that stores the city that is chosen
    let city;

    // function that uses OpenWeatherMap's geocoding API to find locations
		function search() {
			// takes the value from the search input
			let searchInput = document.querySelector("#search-input").value;
			if (searchInput) {
				// creates the API call with the value from the search input as a query
				let apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput},,US&limit=5&appid=${childToParent.apiKey}`;
				// calls the API
				fetch(apiCall)
					.then((response) => 
						// after recieving a response, take the response from the server and convert it to JSON 
						response.json()
					)
					.then((data) => {
						// after recieving the converted JSON data, pass the JSON to the renderSearchResults() function
						renderSearchResults(data)
					});
			}
		}
        
    // function that renders the search results as a unordered list
		function renderSearchResults(searchResults) {
            // selects the unordered list element search-results-list
            const ul = document.querySelector('#search-results-list')
            // shows the unordered list if was hidden previously
            ul.classList.remove("hidden");
            // clears out any list items from the previous search
            ul.innerHTML = ''
            // loops through each search result and creates and attaches a list item for the unordered list
            searchResults.forEach((searchResult, index) => {
                // creates a new unordered list element
                const li = document.createElement('li')
                // sets the list item's class as search-result
                li.setAttribute('class', 'search-result')
                // sets the text inside the list item as the name and state of the city 
                const fullName = searchResult.name + ', ' + searchResult.state
                li.innerHTML = fullName
                // if the list item of a city is clicked, call the selectCity() function
                li.addEventListener('click', () => selectCity(fullName, searchResult.name, searchResult.state, searchResult.lat, searchResult.lon))
                // attaches the list item elements to search-results-list
                ul.appendChild(li)
                
        })	
    }

    //function in SideContainer.js
    function selectCity(fullName, name, state, lat, lon) {
        // hides the search-results-list since it is not needed right now
        document.querySelector('#search-results-list').className = 'hidden'
        // sets the global city variable
        document.querySelector("#search-input").value = ''
        city = {
            fullName: fullName,
            name: name,
            state: state,
            lat: lat,
            lon: lon
        }
        //i want this function to ship data to the parent
        childToParent(city);
    }

    return (
        <div id='SideContainer'>
            <div>
			    <input id='search-input' placeholder='search for a city'></input>
			    <button id='search-button' onClick={search}>search</button>
		    </div>
		    <ul id='search-results-list'></ul>
        </div>
    );
}

export default SideContainer;