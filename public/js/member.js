$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      console.log(data);
    });

    $("#update-preferences").on("click", function() {
      const preferences = {
        "id": $('#profileName').data('id'),
        "vegan": $("#veganCheck").prop("checked") ? true : false,
        "lactoseIntolerance": $("#dairyCheck").prop("checked") ? true : false,
        "vegetarian": $("#vegetarianCheck").prop("checked") ? true : false,
        "nutAllergy": $("#nutFreeCheck").prop("checked") ? true : false,
        "glutenIntolerance": $("#glutenCheck").prop("checked") ? true : false,
        "shellfishAllergy": $("#shellfishCheck").prop("checked") ? true : false,
        "kosher": $("#kosherCheck").prop("checked") ? true : false
      };
      console.log(preferences);
      console.log($('#profileName'))
      $.ajax("/api/customers/", {
        type: "PUT",
        data: preferences
      }).then(function() {
        console.log("preferences updated!");
        location.reload();
      }).catch(err => {
        console.log("Error: " + err);
      });
    })

    // to do - listen for logout button and call logout route

  });