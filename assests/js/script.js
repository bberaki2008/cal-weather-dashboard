// Gets the button id
let fetchButton = document.getElementById('fetch-button');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value;
  console.log(city);
  let api_key ="b999cb8b22b053825ee574c293c2deaa"
  // fetch request gets a list of all the weather data for six days
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&cnt=6&appid=b999cb8b22b053825ee574c293c2deaa`;
  
//replace space with +sign.

  fetch(requestUrl)
    .then(function (response) {
  console.log(response);
      return response.json();
    })
    .then(function (data) {
// declared an empty array for the following variables to store the data and post it in the html.
        let windSpeed =[];
        let temperature =[];
        let humid = [];
        let weatherIcon=[];
        let date =[];
        let weatherIconimg= {};
      //Loop over the data to generate a weather forcast for 5 days
      for(let i = 0; i<6; i++){
        windSpeed[i] =data.list[i].wind.speed;
        temperature[i]= data.list[i].main.temp;
        humid[i] = data.list[i].main.humidity;
        weatherIcon[i] = data.list[i].weather['0'].icon;
        date[i] = moment.unix(data.list[i].dt).format("M/DD/YYYY");
        console.log(data.list[i].main.temp);

        document.getElementById(`dateDay${i}`).textContent = date[i];
        document.getElementById(`icon${i}`).textContent = weatherIcon[i];
        document.getElementById(`temp${i}`).textContent = temperature[i];
        document.getElementById(`wind${i}`).textContent = windSpeed[i];
        document.getElementById(`humid${i}`).textContent = humid[i];
      }
    });
}

fetchButton.addEventListener('click', getApi);
