const express = require("express");
const bodyParser = require("body-parser");
const User = require("./users.model");
const errorHandler = require("../middlewares").errorHandler;
const notFound = require("../middlewares").notFound;

const router = express.Router();
router.use(bodyParser.json());

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  if (!user) {
    notFound(req, res);
  }
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