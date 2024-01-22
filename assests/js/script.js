// Gets the button by id
let fetchButton = document.getElementById('fetch-button');
let notFound = document.getElementById('not_found');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value.trim();
      //city = city.toLowerCase();

  let curr_city = document.getElementById('curr_city');
    curr_city.textContent = city;
  //replace space with +sign.
  let cityFiltered = city.replace(" ","+");
  let daysWeatherOutlookArray= localStorage.getItem("daysWeatherOutlookArray")?JSON.parse(localStorage.getItem("daysWeatherOutlookArray")): [];
  // let api_key ="b999cb8b22b053825ee574c293c2deaa"
  // fetch request gets a list of all the weather data for six days
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityFiltered}&units=imperial&cnt=48&appid=b999cb8b22b053825ee574c293c2deaa`; //
git 
  // setDate call to set the dates
  // setDate();
  // fetching data from openweather using the above link
  fetch(requestUrl)
    .then(function (response) {
    // gives error message if result is not found due to many reasons
      if (response.status !== 200) {
        location.reload();
        notFound.textContent ="Not Found! Or Enter a valued city name!";
      }
      return response.json();
    })
    .then(function (data) {
    // declared an empty array for the following variables to store the data and post it in the html.
      let windSpeed =[];
      let temperature =[];
      let humid = [];
      let weatherIcon=[];
      let date =[];
      let weatherIconimg= {"13n":"./assests/img/13n.png", "04n":"./assests/img/04n.png", "01n":"./assests/img/01n.png","03n":"./assests/img/03n.png",
    "10n":"./assests/img/10n.png","02n":"./assests/img/02n.png", "13d":"./assests/img/13n.png", "04d":"./assests/img/04n.png", "01d":"./assests/img/01n.png","03d":"./assests/img/03n.png", "10d":"./assests/img/10n.png","02d":"./assests/img/02n.png"};
      //Loop over the data to generate a weather forcast for 5 days, since the weather is collected every
      // three hours so the for loop is incremented by to to change the data to dailly

      for(let i = 0; i<40; i+=8){
        windSpeed[i] =data.list[i].wind.speed;
        temperature[i]= data.list[i].main.temp;
        humid[i] = data.list[i].main.humidity;
        weatherIcon[i] = data.list[i].weather['0'].icon;
        date[i] = moment.unix(data.list[i].dt).format("M/DD/YYYY");
      }
      temperature[39] = data.list['39'].main.temp;
      windSpeed[39] = data.list['39'].wind.speed;
      humid[39] = data.list['39'].main.humidity;
      weatherIcon[39] = data.list['39'].weather['0'].icon;
      date[39] = moment.unix(data.list['39'].dt).format("M/D/YYYY");

      // function express to filter out the undefined
      const filterUndefine = truthy => truthy !== undefined;

      // the udnefined values filtered out
      let windSpeedFiltered=windSpeed.filter(filterUndefine);
      let temperatureFiltered =temperature.filter(filterUndefine);
      let humidFiltered = humid.filter(filterUndefine);
      let weatherIconFiltered =weatherIcon.filter(filterUndefine);
      let dateFiltered = date.filter(filterUndefine);
      let daysWeatherOutlook ={"name":city,date:[], weatherIcon:[], temp:[], winSpeed:[], humid:[]};
      
      for(let i = 0; i < 6 ; i++) {
        document.getElementById(`dateDay${i}`).textContent = dateFiltered[i];
        daysWeatherOutlook.date.push(dateFiltered[i]);

        document.getElementById(`icon${i}`).setAttribute("src", weatherIconimg[weatherIconFiltered[i]]);
        daysWeatherOutlook.weatherIcon.push(weatherIconimg[weatherIconFiltered[i]]);

        document.getElementById(`temp${i}`).textContent = temperatureFiltered[i];
        daysWeatherOutlook.temp.push(temperatureFiltered[i]);

        document.getElementById(`wind${i}`).textContent = windSpeedFiltered[i];
        daysWeatherOutlook.winSpeed.push(windSpeedFiltered[i]);

        document.getElementById(`humid${i}`).textContent = humidFiltered[i];
        daysWeatherOutlook.humid.push(humidFiltered[i]);
      }
      //   localStorage.setItem(daysWeatherOutlook, JSON.stringify({
      //   city:city,
      //   date:daysWeatherOutlook['date'],
      //   weatherIcon:daysWeatherOutlook['weatherIcon'],
      //   temp:daysWeatherOutlook['temp'],
      //   winSpeed:daysWeatherOutlook['winSpeed'],
      //   humid:daysWeatherOutlook['humid']
      // }));

      // daysWeatherOutlook = {
      //   city:city,
      //   date:daysWeatherOutlook['date'],
      //   weatherIcon:daysWeatherOutlook['weatherIcon'],
      //   temp:daysWeatherOutlook['temp'],
      //   winSpeed:daysWeatherOutlook['winSpeed'],
      //   humid:daysWeatherOutlook['humid']
      // }


      daysWeatherOutlookArray.push(daysWeatherOutlook);
      localStorage.setItem("daysWeatherOutlookArray", JSON.stringify(daysWeatherOutlookArray));

  })
}
// added even listner to search button
fetchButton.addEventListener('click', getApi);







// const setDate = ()=>{
//   for(let i=0; i<6; i++)
//     document.getElementById(`dateDay${i}`).textContent = moment().format('M/D/YYYY');
// }