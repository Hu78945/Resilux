const express = require("express");
const app = express();

//Get the database
const db = require("./utils/connectdb");
db.getConnection((err, connection) => {
  if (err) {
    console.log(`This is the error ${err}`);
  } else {
    console.log("DB have been connected");
  }
});

//Use JSON FiLES
app.use(express.json());

//Require all routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const listingRoute = require("./routes/listing");


app.use("/api/v1", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);


app.listen(3000, () => {
  console.log("Server is listing at port 3000");
});
