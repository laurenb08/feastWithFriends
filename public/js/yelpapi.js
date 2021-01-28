// Get the User's search criteria for dietary restriction and city
function getInputs() {
  dietary = "Seattle";
  city = "Vegetarian";
  getRestaurants(dietary,city);
}

// Make this call from the backend 
// Get a list of restaurants that match dietary and city criteria from the Yelp API
function getRestaurants(dietary,city) {
  const settings = {
    "url": "https://api.yelp.com/v3/businesses/search?categories=" + dietary + "&location=" + city + "&limit=6",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer QpL1_euY18mZRFtPkAvPGAV-qzoLh7iZN7zRUo6gjv-JSCrVL69NghanELXxl84TuWj_pNQisuQcp1_zG73BCFSuW7LZHPMJwPvRmYOvWQRma_YiRBCtp_-_4Y8MYHYx"
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.businesses[0].name);
    console.log(response.businesses[0].image_url);
  });
}

// Call functions
getInputs();

// Get longtitude and latitude coordinates for searched city
// function getCoord() {
//   var APIkey = "c19b2f1f085df13be7309df32599c301";
//   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIkey;

//   $.ajax({
//       url: queryURL,
//       method: "GET"
//   }).then(function(response) {
//       lat = response.coord.lat;
//       lon = response.coord.lon;
//       console.log("For " + city + ", the latitude is " + lat + ", and longtitude is " + lon);

//       getData(city, lat, lon)
//   });
// }


