const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register user
exports.register = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });;
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const user = new User({ name, email, password, phone, address });
        await user.save();
        const token = jwt.sign({ id: user._id, name: user.name, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email})
    if (!user || !(await bycrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, name: user.name, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.status(200).json({ message: "User logged in successfully", token });
}catch (error) {
    res.status(500).json({ message: error.message });
  }
}