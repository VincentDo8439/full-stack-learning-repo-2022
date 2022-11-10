import { useEffect, useState, Fragment } from "react";
import { FaPlus } from "react-icons/fa";

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  createStyles,
  useMantineTheme,
  Group,
  Center,
  Stack,
  Input,
  Button,
  Checkbox,
  Title,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

export default function HomePage() {
  // toDo: an array of tasks that need to be done; setToDo: a function that allows you to modify the task variable.
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      await fetch(
        `http://localhost:4000/todolist/${window.localStorage.getItem(
          "username"
        )}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTasks(data);
        });
    };
    getTasks();
  }, []);

  // taskName: a string of the name of task that you want to add; setToDo: a function that allows you to edit the taskName
  const [taskName, setTaskName] = useState("");

  // addTask: adds a task to toDo by adding the taskName
  async function addTask() {
    // makes sure that taskName is not blank
    if (taskName) {
      // makes sure that taskName is a new task
      if (tasks.includes(taskName)) alert("Task already exists");
      else {
        const newTask = {
          task: taskName,
          completed: false,
          user: window.localStorage.getItem("username"),
        };
        setTasks(tasks.concat(newTask));
        await fetch(`http://localhost:4000/`, {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      setTaskName("");
    }
  }

  function filterTasks(task, name) {
    return task.name != name;
  }

  async function updateTask(name) {
    let taskDelete;
    setTasks(
      tasks.map((task) => {
        if (task.name === name) {
          task.finished = !task.finished;
          taskDelete = task;
        }
        return task;
      })
    )
    //  await fetch(`http://localhost:4000/`, {
    //   method: 'DELETE',
    //   body: JSON.stringify({id: taskDelete.id}),
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // })
  }

  function getSummary() {
    let unfinishedTasks = 0;
    tasks.forEach((task) => {
      if (task.finished === false) {
        unfinishedTasks += 1;
      }
    });
    if (unfinishedTasks === 1) {
      return <Title order={2}>You have 1 unfinished task</Title>;
    } else if (unfinishedTasks >= 1) {
      return (
        <Title order={2}>You have {unfinishedTasks} tasks left to do</Title>
      );
    }
  }

  return (
    <Stack align="center" justify="center" p="xl">
      {getSummary()}
      <Group>
        <Input
          value={taskName}
          placeholder="Type your task here"
          onChange={(event) => setTaskName(event.target.value)}
        ></Input>
        <Button rightIcon={<FaPlus />} onClick={() => addTask()}>
          Add
        </Button>
      </Group>
      <Stack>
        {tasks.map((task, index) => (
          <Checkbox
            checked={task.finished}
            key={task.task}
            index={index}
            label={task.task}
            onChange={() => updateTask(task.task)}
          ></Checkbox>
        ))}
      </Stack>
    </Stack>
  );
}
