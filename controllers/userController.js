const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ADMIN } = require("../utils/constant");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
};

// Edit user profile
exports.editProfile = async (req, res) => {
  // Handle editing user profile
  try {
    const userId = req.user.id;
    const { name, bio, phone, email, password, photo } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user details
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update photo if provided
    if (photo) {
      user.photo = photo;
    }

    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// Set profile privacy
exports.setPrivacy = async (req, res) => {
  try {
    const userId = req.user.id;
    const newIsPrivateValue = req.body.isPrivate;
    if (newIsPrivateValue === undefined) {
      return res.status(404).json({ error: "invalid data." });
    }
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.isPrivate = newIsPrivateValue;
    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
};

// List public profiles
exports.listPublicProfiles = async (req, res) => {
  try {
    if (req?.user?.role === ADMIN) {
      const users = await User.findAll({
        attributes: { exclude: ["password", "phone"] },
      });
      return res.status(200).json(users);
    }

    const users = await User.findAll({
      where: { isPrivate: false },
      attributes: { exclude: ["password", "phone"] },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
