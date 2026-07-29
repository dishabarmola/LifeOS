const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/dashboard", dashboardRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!'
  });
});

module.exports = app;