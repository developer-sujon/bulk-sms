//External Lib  import
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const path = require("path");
const app = new express();

//Internal Import
const {
  defaultErrorHandler,
  notFoundError,
} = require("./src/helpers/errorHandler");

//Import route
const routes = require("./src/routes");

//Security lib import
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

//Security middleware emplement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());

//Default middleware emplement
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Routing Implement
app.use("/api/v1", routes);

// Add React Front End Routing
app.get("*", (req, res) => {
  res.send("Direct access is not allowed");
});

//Not Found Error Handler
app.use(notFoundError);

// Default Error Handler
app.use(defaultErrorHandler);

module.exports = app;
