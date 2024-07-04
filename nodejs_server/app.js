const express = require("express");
const fs = require("node:fs");
const cors = require("cors");

const app = express();
const port = 3000;
const dataFilePath = "tasks.json";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a Task
app.post("/tasks", (req, res) => {
  const task = req.body;

  if (!task) return res.status(400).send("Missing task");

  const newTask = { id: Date.now(), ...task };

  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    let tasks = [];
    if (data) tasks = JSON.parse(data);

    tasks.push(newTask);

    fs.writeFile(dataFilePath, JSON.stringify(tasks), (err) => {
      if (err) throw err;
      console.log("the file has been saved!");
    });
    res.status(201).send(tasks);
  });
});

// Get All tasks
app.get("/tasks", (req, res) => {
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (data) {
      const tasks = JSON.parse(data);
      res.json(tasks);
    } else {
      const message = "No tasks!";
      res.send([]);
    }
  });
});

// Get a Single Task
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (data) {
      const tasks = JSON.parse(data);
      const task = tasks.find((item) => item.id == id);
      res.json(task);
    } else {
      const message = "Task not found";
      res.status(404).send(message);
    }
  });
});

// Update a Task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = req.body;

  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (data) {
      const tasks = JSON.parse(data).map((item) => {
        if (item.id == id) return { ...item, ...task };
        return item;
      });

      fs.writeFile(dataFilePath, JSON.stringify(tasks), (err) => {
        if (err) throw err;
        console.log("the file has been saved!");
      });

      res.json(tasks);
    } else {
      const message = "Task not found";
      res.status(404).send([message]);
    }
  });
});

// Delete a Task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (data) {
      const tasks = JSON.parse(data).filter((item) => item.id != id);

      fs.writeFile(dataFilePath, JSON.stringify(tasks), (err) => {
        if (err) throw err;
        console.log("the file has been saved!");
      });

      res.json(tasks);
    } else {
      const message = "Task not found";
      res.status(404).send(message);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
