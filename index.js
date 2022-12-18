//jshint esversion:6
//!/* ---------------------------- include pakage --------------------------- */
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql");
const db = require("./configs/db");
const path = require("path");
//!including route file
const userRoute = require("./Routes/User");
const port = process.env.PORT || 8800;

//!/* ------------------------------- middleware ------------------------------- */
app.use(express.json());
app.use(cors());

//!/* ---------------------------------- Route --------------------------------- */

app.use("/api/user", userRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//!/* ---------------------------- listening to port --------------------------- */
app.listen(port, () => {
  console.log("server running on port " + port);
});
