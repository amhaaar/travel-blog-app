// Middleware to check if a user is logged in (authenticated via session)
function sessionAuth(req, res, next) {
  // Check if the session exists and a user is stored in the session
  if (req.session && req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }

  // If not logged in, redirect the user to the login page
  res.redirect('/auth/login');
}


module.exports = sessionAuth;
