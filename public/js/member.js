$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      // console.log(data);
      console.log("api/user_data called")
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
      console.log(preferences);
      console.log($('#profileName'))
      $.ajax("/api/customers/", {
        type: "PUT",
        data: preferences
      }).then(function(req, res) {
        console.log("preferences updated!");
        // location.reload(true);
        // res.render("profile", {user: req.user});
        window.location.replace("/profile");

      }).catch(err => {
        console.log("Error: " + err);
      });
    })

  });