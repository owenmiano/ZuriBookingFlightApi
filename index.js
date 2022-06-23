const express = require("express");
const routes = require("./routes/flightRoute");
const app = express();

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false})) // handles form submission



// flight API
app.use("/", routes);

const port = process.env.PORT || 3050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
