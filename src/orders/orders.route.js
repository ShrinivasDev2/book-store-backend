const express = require("express");
const { createAOrder, getOrderByEmail } = require("./orders.controller");
const Router = express.Router();

//Create Order
Router.post("/create-order", createAOrder);

// Get orders by user email
Router.get("/email/:email", getOrderByEmail);

module.exports = Router;
