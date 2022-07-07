const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  axios = require("axios"),
  fillTask = require("./fillTask");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/getTasks", async (req, res) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios
    .get(
      `https://tasks.googleapis.com/tasks/v1/users/@me/lists?fields=items.id,items.title,`
    )
    .then((res) => res)
    .catch((err) => err);

  if (!(response.data && response.data.items)) return res.json([]);

  const Tasks = await fillTask(response.data.items, req.body.token);

  Tasks.sort((a, b) => a.index - b.index);

  res.json(Tasks);
});

app.post("/addTask", async (req, res) => {
  const baseUrl = "https://tasks.googleapis.com/tasks/v1/lists";

  axios.defaults.headers.common["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios
    .post(`${baseUrl}/${req.body.taskListId}/tasks/`, {
      title: req.body.title,
      notes: req.body.notes,
    })
    .then((res) => res)
    .catch((err) => err);

  res.json(response.data);
});

app.delete("/task", async (req, res) => {
  const baseUrl = "https://tasks.googleapis.com/tasks/v1/lists";

  const response = await axios
    .delete(`${baseUrl}/${req.body.listId}/tasks/${req.body.taskId}`)
    .then((res) => res)
    .catch((err) => err);

  res.json(response.data);
});

app.listen(5001, () => {
  console.log("Listen on port 5001");
});
