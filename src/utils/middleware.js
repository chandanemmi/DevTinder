const adminAuthMiddleware = (req, res, next) => {
  // Check if the user is an admin
  const isAdmin = req.headers["x-admin"] === "true"; // Example check, you can implement your own logic

  if (!isAdmin) {
    console.log("Admin only.");
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Access denied. Admins only." }); // User is not an admin, send a forbidden response
  }
};

const userAuthMiddleware = (req, res, next) => {
  // Check if the user is authenticated
  const isAuthenticated = req.headers["x-authenticated"] === "true"; // Example check, you can implement your own logic

  if (!isAuthenticated) {
    console.log("User only.");
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Access denied. Please log in." }); // User is not authenticated, send an unauthorized response
  }
};

module.exports = {
  adminAuthMiddleware,
  userAuthMiddleware,
};
