const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
    const { name, email, password,phone } = req.body;

    try {
      const newUser = new User({ name, email, password,phone});
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "Email already exists!" });
      } else {
        res.status(500).json({ err:error.message});
      }
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }
  
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.status(200).json({ token, message: "Login successful!" });
};

module.exports = { registerUser, loginUser };
