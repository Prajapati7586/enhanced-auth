const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ADMIN } = require("../utils/constant");
const { generateToken, userObjectWithoutPassKey } = require("../utils/generatejwt");

// Login
exports.createAdmin = async (req, res) => {
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
      role: ADMIN,
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
     res.status(500).json({ message: error.message });
  }
};
