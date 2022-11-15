/** Todo-List App */
const firebase = require("./firebase");
const express = require("express")
const app = require("express")();
const db = firebase.firestore;
require("dotenv").config();
app.use(express.json())
const cors = require('cors')
app.use(cors())
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
app.post("/", async (req, res) => {
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


app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);
