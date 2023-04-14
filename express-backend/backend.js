const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

function findUserById(id) {
  return users.users_list.find((user) => user.id === id);
}

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let matches = [];
  for (let i = 0; i < users.users_list.length; i++) {
    const name_matches = name === undefined || users.users_list[i].name === name;
    const job_matches = job === undefined || users.users_list[i].job === job;
    if (name_matches && job_matches) {
      matches.push(users.users_list[i]);
    }
  }

  res.send({ users_list: matches });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);
  if (user === undefined) {
    res.status(404).send("User not found");
    return;
  }
  res.send({ users_list: [user] });
});

app.post("/users", (req, res) => {
  const { name, job, id } = req.body;
  if ([name, job, id].includes(undefined)) {
    // TODO: more descriptive error
    res.status(400).send("Missing information");
    return;
  }
  if (findUserById(id) !== undefined) {
    res.status(400).send("User already exists");
    return;
  }
  users.users_list.push({ name, job, id });
  res.status(200).end();
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);
  if (user === undefined) {
    res.status(400).send("User not found");
    return;
  }
  const index = users.users_list.findIndex((user) => user.id === id);
  users.users_list.splice(index, 1);
  res.status(200).end();
});
