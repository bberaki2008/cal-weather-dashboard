// Gets the button by id
let fetchButton = document.getElementById('fetch-button');
let notFound = document.getElementById('not_found');
let divGrandParentEl = document.getElementById('grandParent');

  let daysWeatherOutlookArray= localStorage.getItem("daysWeatherOutlookArray")?JSON.parse(localStorage.getItem("daysWeatherOutlookArray")): [];

  for(let i=0; i < daysWeatherOutlookArray.length; i++){
    histCreator(`${daysWeatherOutlookArray[i].name}`);
  }


let weatherIconimg= {
  "13n":"https://openweathermap.org/img/wn/13n@2x.png", "04n":"https://openweathermap.org/img/wn/04n@2x.png", "01n":"https://openweathermap.org/img/wn/01n@2x.png","03n":"https://openweathermap.org/img/wn/03n@2x.png",
  "10n":"https://openweathermap.org/img/wn/10n@2x.png","02n":"https://openweathermap.org/img/wn/02n@2x.png", "13d":"https://openweathermap.org/img/wn/13d@2x.png", "04d":"https://openweathermap.org/img/wn/04d@2x.png", 
  "01d":"https://openweathermap.org/img/wn/01d@2x.png",
  "02d":"https://openweathermap.org/img/wn/02d@2x.png",
  "03d":"https://openweathermap.org/img/wn/03d@2x.png", 
  "10d":"https://openweathermap.org/img/wn/10d@2x.png"
};

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value.trim();
      //city = city.toLowerCase();
    if(!city) return;

  let curr_city = document.getElementById('curr_city');
    curr_city.textContent = city;
  //replace space with +sign.
  let cityFiltered = city.replace(" ","+");

  // fetch request gets a list of all the weather data for six days
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityFiltered}&units=imperial&cnt=48&appid=b999cb8b22b053825ee574c293c2deaa`; //

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

      //Loop over the data to generate a weather forcast for 5 days, since the weather is collected every
      // three hours so the for loop is incremented by to to change the data to dailly
      city = city.toLowerCase();
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
      

      let daysWeatherOutlook ={name:city,date:[], weatherIcon:[], temp:[], winSpeed:[], humid:[]};

      // filtering out if the city is already in the list
      const isButtonCreated =daysWeatherOutlookArray.filter( el => el.name === city ).length||false;
      daysWeatherOutlookArray = daysWeatherOutlookArray.filter( el => el.name != city ); 

      for(let i = 0; i < 6 ; i++) {
        document.getElementById(`dateDay${i}`).textContent = moment().add(i, 'd').format("M/D/YYYY");
        daysWeatherOutlook.date.push(moment().add(i, 'd').format("M/D/YYYY"));

        document.getElementById(`icon${i}`).setAttribute("src", weatherIconimg[weatherIconFiltered[i]]);
        daysWeatherOutlook.weatherIcon.push(weatherIconimg[weatherIconFiltered[i]]);

        document.getElementById(`temp${i}`).textContent = temperatureFiltered[i];
        daysWeatherOutlook.temp.push(temperatureFiltered[i]);

        document.getElementById(`wind${i}`).textContent = windSpeedFiltered[i];
        daysWeatherOutlook.winSpeed.push(windSpeedFiltered[i]);

        document.getElementById(`humid${i}`).textContent = humidFiltered[i];
        daysWeatherOutlook.humid.push(humidFiltered[i]);
      }

     if(!isButtonCreated){histCreator(city)};

      daysWeatherOutlookArray.push(daysWeatherOutlook);
      localStorage.setItem("daysWeatherOutlookArray", JSON.stringify(daysWeatherOutlookArray));

  }).catch(() => {
    alert("An error occurred while fetching the weather forecast!");
  });
}
// added even listner to search button
fetchButton.addEventListener('click', getApi);

//creates history searched city with buttons to click
function histCreator(city){
  let parentDiv = document.createElement("div");
  let childDiv = document.createElement("div");
  let histButton = document.createElement("button");
  parentDiv.setAttribute("class","row");
  childDiv.setAttribute("class","row mt-3");
  histButton.setAttribute("class","btn btn-secondary mb-1 hisCity");
  histButton.setAttribute("type","submit");
  histButton.setAttribute("value",`${city}`);
  // Adds text content to created button
  histButton.textContent =`${city}`;

  childDiv.appendChild(histButton);
  parentDiv.appendChild(childDiv);
  // Appends prant "div" as child of grand "div"
  divGrandParentEl.appendChild(parentDiv);

}

$(document).on( "click", ".hisCity", function() {
  const city = $(this).attr('value');
  curr_city.textContent = city;
  let daysWeatherOutlookArrayLoc = localStorage.getItem("daysWeatherOutlookArray")?JSON.parse(localStorage.getItem("daysWeatherOutlookArray")):[]; 

  let cityWeatherOutlook;
  for(let i=0; i < daysWeatherOutlookArrayLoc.length; i++){
    if(daysWeatherOutlookArrayLoc[i].name ===city){
      cityWeatherOutlook = daysWeatherOutlookArrayLoc[i];
    }
  }

  for(let i = 0; i < 6 ; i++) {
    document.getElementById(`dateDay${i}`).textContent =  cityWeatherOutlook.date[i];
    document.getElementById(`icon${i}`).setAttribute("src", cityWeatherOutlook.weatherIcon[i]);
    document.getElementById(`temp${i}`).textContent = cityWeatherOutlook.temp[i];
    document.getElementById(`wind${i}`).textContent = cityWeatherOutlook.winSpeed[i];
    document.getElementById(`humid${i}`).textContent = cityWeatherOutlook.humid[i];
  }

});