var settings = {
  “url”: “https://api.yelp.com/v3/businesses/search?term=delis&categories=vegetarian&location=Seattle&limit=10”,
  “method”: “GET”,
  “timeout”: 0,
  “headers”: {
    “Authorization”: “Bearer QpL1_euY18mZRFtPkAvPGAV-qzoLh7iZN7zRUo6gjv-JSCrVL69NghanELXxl84TuWj_pNQisuQcp1_zG73BCFSuW7LZHPMJwPvRmYOvWQRma_YiRBCtp_-_4Y8MYHYx”
  },
};
$.ajax(settings).done(function (response) {
  console.log(response);
});

