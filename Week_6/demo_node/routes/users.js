/** Module for handling users */
const express = require("express");
const cors = require("cors");

// Define route and middlewares
const users = express.Router();
const middleware = require("../middleware/functions");
users.use(cors());
users.use(express.json());

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    // Arbitrarily defined fields for user
    this.requiredFields = () => {
      return ["username", "password"];
    };
  }
}

// Fake database which we will be interacting with, key is the username
let fakeUsers = {
  jwong10: {
    username: "jwong10",
    password: "jwong10",
  },
  frey: {
    username: "frey",
    password: "frey",
  },
};

users.get("/", (req, res) => {
  let userDB = fakeUsers;
  res.status(200).json(userDB);
});

// TODO: Integrate with Error Handler
users.get(
  "/:user_id",
  (req, res, next) => {
    let userDB = fakeUsers;
    const user = req.params.user_id;
    if (userDB[user]) {
      res.status(200).json(userDB[user]);
    } else {
      throw Error("User not found");
    }
    middleware.handleErrors("User not found", req, res, next)
  },
  
);

// TODO: add POST (Create) route with json input validation middleware
users.post("/", middleware.validateSchema(User), (req, res) => {
  console.log(req.body);
  const user = req.body;
  //checks if all the required fields are correct
  if (
    user == undefined ||
    (user.username == undefined && user.password == undefined)
  ) {
    console.log(fakeUsers)
    return res.send("invalid data entered");
  }
  //check if the user is already in the database
  if (fakeUsers.hasOwnProperty(user.username)) {
    console.log(fakeUsers)
    return res.send("user already exists");
  }
  const user_obj = {
    id: user.username,
    username: user.username,
    password: user.password,
  };
  fakeUsers[user.username] = user_obj;
  res.json({msg: "Sucess", data: user_obj});
  console.log(fakeUsers)
});

// Export Route
module.exports = users;
