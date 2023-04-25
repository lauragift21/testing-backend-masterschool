const mongoose = require("mongoose");
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

module.exports = User;
