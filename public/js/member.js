$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      console.log("api/user_data called:" + data);

    });

    $("#update-preferences").on("click", function() {
      const preferences = {
        "id": $('#profileName').data('id'),
        "city": $('#userCity').val(),
        "vegan": $("#veganCheck").prop("checked") ? true : false,
        "vegetarian": $("#vegetarianCheck").prop("checked") ? true : false,
        "glutenIntolerance": $("#glutenCheck").prop("checked") ? true : false,
        "kosher": $("#kosherCheck").prop("checked") ? true : false
      };
      $.ajax("/api/customers/", {
        type: "PUT",
        data: preferences
      }).then(function(req, res) {
        window.location.replace("/profile");

      }).catch(err => {
        console.log("Error: " + err);
      });
    })

  });