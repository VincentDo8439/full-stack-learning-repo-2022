/** Todo-List App */
const firebase = require("./firebase");
const express = require("express")
const app = require("express")();
const db = firebase.firestore;
require("dotenv").config();
app.use(express.json())
const cors = require('cors')
app.use(cors())
const pbk = require("pbkdf2");
const jwt = require("jsonwebtoken");

// Should be stored in environment variable, but ok for this demo
const SALT = ";asf;klsadfllsfjalskdfjl";
const JWTSECRET = "abc123";

app.post("/todolist", async (req, res) => {});

// Gets all tasks
app.get("/", async (req, res) => {
  const list = db.collection("todolist");
  const tasks = await list.get(); // Since async operation, use await
  const ret = tasks.docs.map((data) => data.data());

  res.json(ret);
});

//TODO: Get all tasks by person id
app.get("/todolist/:user_id", async (req, res) => {
  const list = db.collection("todolist");
  let user = req.params.user_id;
  const query = await list.where("user", "==", user).get();
  const ret = query.docs.map((data) => {
    return { ...data.data(), id: data.id }
  });
  res.status(200).json(ret);
});

//TODO: Create a task
app.post("/", authMiddleware, async (req, res) => {
  const task = req.body
  db.collection("todolist").add({
    user: task.user,
    completed: false,
    task: task.task
  })
  const task_obj = {
    user: task.user,
    task: task.task,
    complete: false,
  };
  const query = await db.collection("todolist").where("task", "==", task.task).get();
  const ret = query.docs.map((data) => {
    console.log(data)
    return {msg: "Success", data: task_obj, id: data.id}
  });
  res.json(ret);
});

//TODO: check-off/delete a task
app.delete("/", async (req, res) => {
  const task = req.body
  const taskToDelete = db.collection("todolist").doc(task.id)
  db.collection("todolist").doc(task.id).delete().then(
    res.json({ msg: "successfully deleted", data: taskToDelete})
  ).catch((error) => {
    res.json({ msg: "could not delete task", error: error})
  })
})

// Verifies password
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // TODO: hash the password
  const passHashed = pbk
    .pbkdf2Sync(password, SALT, 100, 32, "sha256")
    .toString();
  // Get the user
  const check = await db.collection("users").doc(username).get();
  // Check if user exists
  if (!check.exists) {
    return res.status(400).json({ msg: "User does not exists" });
  }
  // Cross reference the stored password with the incoming password (hashed)
  const user = check.data();
  // TODO: fill in samepassword
  let samePassword = passHashed == user.token;
  if (samePassword) {
    // TODO: Issue token if passwords match, else, return a 401, not authorized
    const token = jwt.sign(user, JWTSECRET)
    return res.json({
      msg: "successfully logged in",
      username: username,
      token: token,
    });
  } else {
    return res.status(401).json({ msg: "Username or password was incorrect" });
  }
});

// Creates a user with password, no checks needed
app.post("/register", async (req, res) => {
  // Get the username and password from request
  const { username, password } = req.body;
  // hash the password
  const passHashed = pbk
    .pbkdf2Sync(password, SALT, 100, 32, "sha256")
    .toString();
  // Check for duplicate users
  const check = await db.collection("user").doc(username).get();
  if (check.exists) {
    return res.status(400).json({ msg: "User exists" });
  }
  // TODO: Create the User and fill in user and token
  db.collection("users").doc(username).set({
    username: username,
    token: passHashed,
  });
  const token = jwt.sign(username, JWTSECRET);

  // Send JWT Token
  res.json({
    msg: "successfully created",
    data: { username: username },
    token: token,
  });
});

// Auth Middleware for non expiring tokens
function authMiddleware(req, res, next) {
  console.log("next");
  // Check if proper header exists
  if (req.headers["authorization"]) {
    // Split on space -> should return ["Bearer", "${token}"]
    const headers = req.headers["authorization"].split(" ");
    // Check if first argument is Bearer
    if (headers.length === 2 && headers[0] === "Bearer") {
      // TODO: get the token
      let token = headers[1];
      try {
        let decodedToken = jwt.verify(token, JWTSECRET);
        // Set user object which can be accessed in the req
        req.user = decodedToken.username;
        next(); // Go to next function
      } catch (e) {
        return res.status(401).json({ msg: e.message });
      }
    } else {
      return res.status(401).json({ msg: "invalid token" });
    }
  } else {
    return res.status(401).json({ msg: "token was not found in header" });
  }
}

app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);
