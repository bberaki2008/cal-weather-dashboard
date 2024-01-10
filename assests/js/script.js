

// var city =document.getElementById('city').value;
let fetchButton = document.getElementById('fetch-button');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value;
  console.log(city);
  let api_key ="b999cb8b22b053825ee574c293c2deaa"
  // fetch request gets a list of all the repos for the node.js organization
  // let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&&appid=b999cb8b22b053825ee574c293c2deaa';
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&cnt=6&appid=b999cb8b22b053825ee574c293c2deaa`;
  
  //https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&cnt=6&appid=b999cb8b22b053825ee574c293c2deaa


//replace space with +sign.

  fetch(requestUrl)
    .then(function (response) {
  console.log(response);
      return response.json();
    })
    .then(function (data) {
      //Loop over the data to generate a weather forcast for 5 days
        let windSpeed =[];
        let temperature =[];
        let humid = [];
        let weatherIcon=[];
        let date =[];

      for(let i = 0; i<6; i++){
        // console.log(data);
        windSpeed[i] =data.list[i].wind.speed;
        temperature[i]= data.list[i].main.temp;
        humid[i] = data.list[i].main.humidity;
        weatherIcon[i] = data.list[i].weather['0'].icon;
        date[i] = moment.unix(data.list[i].dt).format("M/DD/YYYY");
        console.log(data.list[i].main.temp);

        // document.getElementById(`dateDay${i}`).textContent = date[i];
        // document.getElementById(`icon1${i}`).textContent = weatherIcon[i];
        // document.getElementById(`temp1${i}`).textContent = temperature[i];
        // document.getElementById(`wind1${i}`).textContent = windSpeed[i];
        // document.getElementById(`humid1${i}`).textContent = humid[i];

      }

      

      for(let i=0; i<6; i++){        
        document.getElementById(`dateDay${i}`).textContent = date[i];
        // document.getElementById(`icon1${i}`).textContent = weatherIcon[i];
        // document.getElementById(`temp1${i}`).textContent = temperature[i];
        // document.getElementById(`wind1${i}`).textContent = windSpeed[i];
        // document.getElementById(`humid1${i}`).textContent = humid[i];
      }


   
    });
}

fetchButton.addEventListener('click', getApi);
