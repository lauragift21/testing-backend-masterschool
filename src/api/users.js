const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("../middlewares").errorHandler;
const notFound = require("../middlewares").notFound;

require("dotenv").config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

mongoose
  .connect(`mongodb+srv://${user}:${password}@cluster0.yss5oph.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
const router = express.Router();

router.use(bodyParser.json());

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Get a list of users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      notFound(req, res);
    }
    res.send(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Update a specific user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!user) {
      notFound(req, res);
    }
    res.send(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Delete a specific user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      notFound(req, res);
    }
    res.send(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

module.exports = router;
