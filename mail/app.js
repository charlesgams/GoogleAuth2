const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  axios = require("axios"),
  fillMail = require("./fillMail");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/mail", async (req, res) => {
  console.log("Je passe");
  console.log(req.body.token, req.body.userId);
  const baseUrl = "https://gmail.googleapis.com/gmail/v1/users",
    maxResults = 20;

  axios.defaults.headers.common["Authorization"] = `Bearer ${req.body.token}`;

  const response = await axios
    .get(
      `${baseUrl}/${req.body.userId}/messages?fields=messages.id&maxResults=${maxResults}`
    )
    .then((res) => res)
    .catch((err) => err);

  if (!(response.data && response.data.messages)) return res.json([]);

  const data = await fillMail(
    response.data.messages,
    req.body.userId,
    req.body.token
  );

  data.sort((a, b) => a.index - b.index);

  res.json(data);
});

app.listen(5000, () => {
  console.log("Listen on port 5000");
});
