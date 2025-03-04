const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const Router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

Router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "Admin Not Found!" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication Successfull",
      token: token,
      user: { username: admin.username, role: admin.role },
    });
  } catch (error) {
    res.status(500).send({ message: "Login Failed!", error });
  }
});

module.exports = Router;
