$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      console.log(data);
      // $(".member-name").text(data.email);
    });

    $("#update-preferences").on("click", function() {
      // to do - get data from profile.handlebars checkboxes (add ids!)
      const preferences = {};
      $.post("/api/customers", {body: preferences }).then(data => {
        console.log(data);
        // body.vegan
      });
    })

    // to do - listen for logout button and call logout route

  });