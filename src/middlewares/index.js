const cors = require("cors");
const express = require("express");
const { LOCAL_CLIENT, CLIENT } = require("../config/defaults");

const applyMiddleware = (app) => {
    // middleware
    app.use(cors());
    app.use(express.json());
};

module.exports = applyMiddleware;
