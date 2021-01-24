// This is middleware for restricting routes a user is not allowed to visit if not logged in
// Source: https://uwa.bootcampcontent.com/UWA-Bootcamp/uw-sea-fsf-pt-09-2020-u-c/-/blob/master/14-Full-Stack/04-Important/Sequelize-Passport-Example/models/user.js
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/");
  };
  