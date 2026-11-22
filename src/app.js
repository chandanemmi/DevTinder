const express = require("express");
const {
  adminAuthMiddleware,
  userAuthMiddleware,
} = require("./utils/middleware");
const app = express();
// express.json() is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.use(adminAuthMiddleware); // Apply the adminAuthMiddleware to all routes

//This route overrides everything else.
//any route that matches the root URL ("/") will be handled by this middleware function. It sends a response with the message "Hello from the API" to the client.
// app.use("/", (req, res) => {
//   res.send("Hello from the API");
// });

app.use(
  "/middleware",
  (req, res, next) => {
    console.log("Middleware function executed");
    const error = new Error("Something went wrong in /example");

    next(error); // Call the next middleware or route handler
    // Express does not allow sending multiple responses for the same request,
    // which causes the ERR_HTTP_HEADERS_SENT error.
    // res.send("Hello from the middleware route");
  }
  // (req, res) => {
  //   res.send("Hello from the middleware route 2");
  // }
);
// This route will only be accessible to authenticated users
app.get("/middleware/chandan", userAuthMiddleware, (req, res) => {
  try {
    throw new Error("Something went wrong in /middleware/chandan");
    res.send("Hello from the chandan route 3");
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
});
// The error-handling middleware will only run if an error is explicitly passed to next(err).
app.use("/", (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
