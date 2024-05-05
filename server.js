// imports
//common js syntax
// const express = require("express");
//module base
//  "type": "module", before script field in package.json()
//now
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";


//CONFIG.ENV
dotenv.config({ path: "./config.env" });

console.log(process.env.PORT)

//mongoDb connection
connectDB();

// rest object
// create instance of express and called it app variable
const app = express();

// route
app.get("/", (req, res) => {
  res.send("<h1>Welcome To  Job Portal</h1>");
});

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${process.env.DEV_MODE} on port  no ${PORT}`.bg