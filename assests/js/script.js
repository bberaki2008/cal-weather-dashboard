

// var city =document.getElementById('city').value;
let fetchButton = document.getElementById('fetch-button');

function getApi(event) {
  event.preventDefault();
  let city =document.getElementById('city').value;
  console.log(city);
  // fetch request gets a list of all the repos for the node.js organization
  // let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=37.773972&lon=-122.431297&appid=c32948bb2ac0b7689e6b43e0928bff93';
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c32948bb2ac0b7689e6b43e0928bff93`;

//replace space with +sign.

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let windSpeed =data.wind.speed;
      let temperature=  (data.main.temp - 273.15) * 1.8 + 32;
      let humid = data.main.humidity;
      let weatherIcon = data.; ///
      let date = data //
      console.log(windSpeed);
      console.log(temperature);
      console.log(humid);
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
