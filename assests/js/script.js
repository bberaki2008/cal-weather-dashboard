

// var city =document.getElementById('city').value;
let fetchButton = document.getElementById('fetch-button');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value;
  console.log(city);
  let api_key ="b999cb8b22b053825ee574c293c2deaa"
  // fetch request gets a list of all the repos for the node.js organization
  // let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=37.773972&lon=-122.431297&appid=b999cb8b22b053825ee574c293c2deaa';
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${api_key}&units=metric`;


//replace space with +sign.

  fetch(requestUrl)
    .then(function (response) {
      //console.log(response);
      return response.json();
    })
    .then(function (data) {
      // for(let i = 0; i<data.length; i++){
      //   let windSpeed =data.wind.speed;
      //   let temperature=  (data.main.temp) //- 273.15) * 1.8 + 32;
      //   let humid = data.main.humidity;
      //   let weatherIcon = data.weather['0'].icon;
      //   let date = moment.unix(data.dt).format("M/DD/YYYY");
      //   document.getElementById('dateDay1').textContent = date;
      //   document.getElementById('icon1').textContent = weatherIcon;
      //   document.getElementById('temp1').textContent = temperature;
      //   document.getElementById('wind1').textContent = windSpeed;
      //   document.getElementById('humid1').textContent = humid;

      // }


      // console.log(windSpeed);
      // console.log(temperature);
      // console.log(humid);
      // console.log(weatherIcon);
      // console.log(date);
      console.log(data);

      //Loop over the data to generate a table, each table row will have a link to the repo url
      // for (var i = 0; i < data.length; i++) {
      //   // Creating elements, tablerow, tabledata, and anchor
      //   var createTableRow = document.createElement('tr');
      //   var tableData = document.createElement('td');
      //   var link = document.createElement('a');

      //   // Setting the text of link and the href of the link
      //   link.textContent = data[i].html_url;
      //   link.href = data[i].html_url;

      //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
      //   // The tablerow then gets appended to the tablebody
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
    });
}

fetchButton.addEventListener('click', getApi);
