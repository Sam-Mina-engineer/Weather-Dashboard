document.addEventListener('DOMContentLoaded', function() { 
    // add basic event listener to make sure that DOM is run after the HTML has loaded.
    // constsearchButton to select the HTML element class search-button.
    // const cityName to select HTML element ID city-name.
    // const currentDate to select HTML element ID current-date.
    // const forecast. I will use querySelector and select HTML element class forecast.

    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const forecast = document.querySelector('.forecast');

    // search button event listener click function to prompt asking for city name. 
    // const city = prompt("Enter city name:");
    // if argument city, because that is the input, then call the getWeatherData(city) function. 
    // I am replacing this with the JQuery and the cities.JSON public repo that I cloned into my directory. 

    // Load cities from the JSON file. UPDATE: I am no longer doing this.

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
            storeCity(city); // Store city in local storage
        } else {
            alert('Please enter a city, state, and country.');
        }
    });

    // getWeatherData(city) {
    // const apiKey = 'dd36305ac7efbdf9bd0266889cb0b16a'  < That is the API key I got from signing up for an account. 
    // const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    // fetch(apiUrl)
    // .then(function(response){return response.json();})
    // this is to make the HTTP get request to the apiUrl.
    // add a then method to make the function as an argument, which will then run when the response is recieved. 
    // parse the response as JSON.

    function getWeatherData(city) {
        const apiKey = 'dd36305ac7efbdf9bd0266889cb0b16a';
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

        console.log("API URL:", apiUrl); // Log the API URL to check correctness
        
        // need to add a .then(function(response)) to use then method for the response from the fetch request. 
        // it takes the function as an argument, which will then run when the response is recieved. 
        // check to make sure the data code is sucessful. data.cod === '200'
        // call the updateWeatherInfo(data) function. The fetched data is the argument. 
        // alert "city not found!" if response code is not 200. 
        // add a catch method for any errors in the fetch request of then method. 
        // console log the error and make alert that the data fetch request failed. Invite the user to try again later.

        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.cod === '200') {
                updateWeatherInfo(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(function(error) {
            console.log('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
    }

    function updateWeatherInfo(data) {
        const city = data.city.name;
        const forecastList = data.list;

        cityName.textContent = city;
        currentDate.textContent = new Date().toLocaleDateString();

        // make a updateWeatherInfo function with the data as the argument. Declare the const variables accordingly. 
        // forecast.innerHTML = '<p>5-Day Forecast</p> to set the inner HTML do show the 5-Day Forecast Header.

        // write a for loop to iterate through the forceastList array. 
        // The OpenWeatherMap API provides forecast data in 3-hour intervals. That makes 8 intervals per day. 
        // therefore, the for loop should increment += 8.
        // for (let i = 0; i < forecastList.length; i += 8)
        // extract the forecast data and assign it to the variable.
        // make sure to multiply by 1000 to convert milliseconds. 
        // generate the HTML. create a new div element and assign it to forecastItem.
        // set the inner HTML of the forecastItem element to display the date, temperature, and description.
        // appendChild

        forecast.innerHTML = '<p>5-Day Forecast</p>';
        for (let i = 0; i < forecastList.length; i += 8) { 
            const forecastItemData = forecastList[i];
            const date = new Date(forecastItemData.dt * 1000).toLocaleDateString();
            const temp = forecastItemData.main.temp;
            const description = forecastItemData.weather[0].description;
            const icon = forecastItemData.weather[0].icon; // Fetch the icon from the API data
            const windSpeed = forecastItemData.wind.speed; // Fetch wind speed
            const humidity = forecastItemData.main.humidity; // Fetch humidity

            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `<p>${date}</p>
                                      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                                      <p>Temp: ${temp}°F</p>
                                      <p>${description}</p>
                                      <p>Wind Speed: ${windSpeed} mph</p>
                                      <p>Humidity: ${humidity}%</p>`;
            forecast.appendChild(forecastItem);
        }

        displayPreviousCities(); // Display previously searched cities
    }

    function storeCity(city) {
        // Store the city in local storage to keep track of previously searched cities
        let cities = JSON.parse(localStorage.getItem('cities')) || [];
        if (!cities.includes(city)) {
            cities.push(city);
            localStorage.setItem('cities', JSON.stringify(cities));
        }
    }

    function displayPreviousCities() {
        // Display the previously searched cities as buttons for quick access
        const previousCities = JSON.parse(localStorage.getItem('cities')) || [];
        const previousCitiesContainer = document.createElement('div');
        previousCitiesContainer.className = 'previous-cities';
        previousCitiesContainer.innerHTML = '<h3>Previously Searched Cities</h3>';
        previousCities.forEach(city => {
            const cityButton = document.createElement('button');
            cityButton.textContent = city;
            cityButton.className = 'city-button';
            cityButton.addEventListener('click', function() {
                getWeatherData(city);
            });
            previousCitiesContainer.appendChild(cityButton);
        });

        const oldContainer = document.querySelector('.previous-cities');
        if (oldContainer) {
            oldContainer.remove();
        }
        
        document.body.appendChild(previousCitiesContainer);
    }
});
