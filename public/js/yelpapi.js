

let API_KEY = "QpL1_euY18mZRFtPkAvPGAV-qzoLh7iZN7zRUo6gjv-JSCrVL69NghanELXxl84TuWj_pNQisuQcp1_zG73BCFSuW7LZHPMJwPvRmYOvWQRma_YiRBCtp_-_4Y8MYHYx"

const userSearch = ""
// REST
let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})

yelpREST(ENDPOINT, { params: { key: value } }).then(({ data }) => {
  // Do something with the data
})

// Using the yelpREST helper we defined earlier
yelpREST("/businesses/search/seattle", {
    params: {
      location: "seattle",
      term: 
    },
  }).then(({ data }) => {
    let { businesses } = data
    businesses.forEach((b) => {
      console.log("Name: ", b.name)
    })
  })
  