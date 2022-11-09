const firebase = require("./middleware/firebase");
const express = require("express");
const db = firebase.firestore;
const pbk = require("pbkdf2");
const app = express();
app.use(express.json());

// Should be stored in environment variable, but ok for this demo
const SALT = ";asf;klsadfllsfjalskdfjl";

// Creates a user with password, no checks needed
app.post("/password", async (req, res) => {
  // Get the username and password from request
  const { username, password } = req.body;
  // TODO: hash the password
  const hashedPassword = pbk
    .pbkdf2Sync(password, SALT, 100, 32, "sha256")
    .toString();

  // Create the User
  db.collection("users").doc(username).set({
    username: username,
    token: hashedPassword,
  });
  // Send message indicating success
  res.send("User Created");
});

// Verifies password
app.post("/verifyPassword", async (req, res) => {
  const { username, password } = req.body;
  // TODO: hash the password
  const hashedPassword = pbk
    .pbkdf2Sync(password, SALT, 100, 32, "sha256")
    .toString();

  // Set this to when you check the password
  let samePassword = false;
  // Get the user
  const check = await db.collection("users").doc(username).get();
  // Cross check the user's password with the passwordHash

  samePassword = hashedPassword == check.data().token;

  // Send arbitrary message
  if (samePassword) {
    res.json({
      msg: "Password Verified!",
      username: username,
      password: password,
    });
  } else {
    res.send("Password Invalid!");
  }
});

app.listen(4000, () => console.log("App listening on port " + 4000));
