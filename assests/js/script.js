

// var city =document.getElementById('city').value;
let fetchButton = document.getElementById('fetch-button');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value;
  console.log(city);
  let api_key ="b999cb8b22b053825ee574c293c2deaa"
  // fetch request gets a list of all the repos for the node.js organization
  // let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&&appid=b999cb8b22b053825ee574c293c2deaa';
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&cnt=1&appid=b999cb8b22b053825ee574c293c2deaa`;
  
  //https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&cnt=1&appid=b999cb8b22b053825ee574c293c2deaa


//replace space with +sign.

  fetch(requestUrl)
    .then(function (response) {
  console.log(response);
      return response.json();
    })
    .then(function (data) {
      //Loop over the data to generate a weather forcast for 5 days
      // for(let i = 0; i<data.length; i++){
        console.log(data);
        let windSpeed =data.list['0'].wind.speed;
        let temperature= data.list['0'].main.temp;
        let humid = data.list['0'].main.humidity;
        let weatherIcon = data.list['0'].weather['0'].icon;
        let date = moment.unix(data.list['0'].dt).format("M/DD/YYYY");
        document.getElementById('dateDay1').textContent = date;
        document.getElementById('icon1').textContent = weatherIcon;
        document.getElementById('temp1').textContent = temperature;
        document.getElementById('wind1').textContent = windSpeed;
        document.getElementById('humid1').textContent = humid;



      //Loop over the data to generate a weather forcast for 5 days
   
 
  
    });
}

fetchButton.addEventListener('click', getApi);
