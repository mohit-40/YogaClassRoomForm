//jshint esversion:6 
//!/* ---------------------------- include pakage --------------------------- */
const dotenv=require('dotenv').config();
const express=require("express");
const app=express();
const morgan = require("morgan");
const cors = require("cors");
const mysql =require("mysql");
const db = require('./database.js');
//!including route file
const userRoute=require('./Routes/User');
const port=process.env.PORT||8800;


//!/* ------------------------------- middleware ------------------------------- */
app.use(express.json())
app.use(cors());

//!/* ---------------------------------- Route --------------------------------- */

app.use("/api/user",userRoute);

//! /* ----------------------------- setting static for heroku  ----------------------------- */
if (process.env.NODE_ENV === "production") {
	console.log("in production")
	const path = require("path")
	app.use(express.static(path.join(__dirname, "/interview/build")));
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '/interview/build', 'index.html'));
	});
} 
else{
	app.use(morgan("common"));
}
//!/* ---------------------------- listening to port --------------------------- */
app.listen(port , ()=>{
	console.log("server running on port "+port );
});
