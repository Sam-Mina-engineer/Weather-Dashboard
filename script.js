// add basic event listener to make sure that DOM is run after the HTML has loaded.


// constsearchButton to select the HTML element class search-button.
// const cityName to select HTML element ID city-name.
// const currentDate to select HTML element ID current-date.
// const forecast. I will use querySelector and select HTML element class forecast.


// search button event listener click function to prompt asking for city name. 
// const city = prompt("Enter city name:");
// if argument city, because that is the input, then call the getWeatherData(city) function. 

// getWeatherData(city) {
// const apiKey = 'dd36305ac7efbdf9bd0266889cb0b16a'  < That is the API key I got from signing up for an account. 
// const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
// fetch(apiUrl)
// .then(function(response){return response.json();})
// this is to make the HTTP get request to the apiUrl.
// add a then method to make the function as an argument, which will then run when the response is recieved. 
// parse the response as JSON.
// need to add a .then(function(response)) to use then method for the response from the fetch request. 
// it takes the function as an argument, which will then run when the response is recieved. 
// check to make sure the data code is sucessful. data.cod === '200'
// call the updateWeatherInfo(data) function. The fetched data is the argument. 
// alert "city not found!" if response code is not 200. 
// add a catch method for any errors in the fetch request of then method. 
// console log the error and make alert that the data fetch request failed. Invite the user to try again later. 

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

