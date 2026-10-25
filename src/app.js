const express = require("express");

const app = express();
// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use((req, res) => {
  res.send("Hello from the API");
});
console.log("Node js express server is running...");
