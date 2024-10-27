const Order = require("./orders.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: "Order created Successfully", savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Order creation failed!", error });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      res.status(404).json({ message: "You don't placed any order yet" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ Error: "Couldn't Fetch the orders at the time" });
  }
};

module.exports = { createAOrder, getOrderByEmail };
