const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  generateToken,
  userObjectWithoutPassKey,
} = require("../utils/generatejwt");

// Register
exports.register = async (req, res) => {
  try {
    const reqbody = req.body;
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({
      where: { email: reqbody.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(reqbody.password, 10);
    const newUser = await User.create({
      name: reqbody.name,
      email: reqbody.email,
      password: hashedPassword,
      isPrivate: reqbody.isPrivate,
    });
    // Generate a JWT token
    const token = generateToken(
      newUser.dataValues.id,
      newUser.dataValues.email,
      newUser.dataValues.role
    );

    // Send the token as a response
    return res
      .status(201)
      .json({ ...userObjectWithoutPassKey(newUser.dataValues), token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const userData= user.dataValues;

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    // Generate a JWT token
    const token = generateToken(userData.id, userData.email, userData.role);

    // Send the token as a response
    return res.status(200).json({ ...userObjectWithoutPassKey(userData), token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Google OAuth callback
exports.googleCallback = (req, res) => {
  // Handle Google OAuth callback
};
