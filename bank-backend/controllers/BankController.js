// controllers/bankerController.js

const Account = require("../models/Account");

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().populate({
      path: "userId",
      select: "email name", // Specify the fields you want to retrieve from the User schema
    });

    console.log(accounts);
    res.json({
      success: true,
      accounts,
      message: "All accounts fethed successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error", error);
  }
};

exports.getTransactionHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Account.find({ userId: userId }).sort({
      timestamp: "desc",
    });
    console.log(transactions);

    res.json({
      success: true,
      transactions,
      message: "Transaction history fetched successfully! ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Banker = require("../models/Banker");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Banker.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newBanker = await Banker.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Banker registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const banker = await Banker.findOne({ email });

    if (!banker) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, banker.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: banker._id, email: banker.email, role: banker.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      success: true,
      token,
      bankerId: banker._id,
      message: "LogedIn successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
