// imports
//common js syntax
// const express = require("express");
//module base
//  "type": "module", before script field in package.json()
//now
//Packages
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//files
import connectDB from "./config/db.js";
//routes
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//CONFIG.ENV
dotenv.config({ path: "./config.env" });

//mongoDb connection
connectDB();

// rest object
// create instance of express and called it app variable
const app = express();

//MIDDLEWARE
// to deal with json data
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);

//error handler[validation middleware]
app.use(errorMiddleware);
// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${process.env.DEV_MODE} on port No. ${PORT}`.bgCyan
      .white
  );
});
