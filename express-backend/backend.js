const express = require("express");
const cors = require("cors");
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
      id: 0,
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: 1,
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: 2,
      name: "Mac",
      job: "Professor",
    },
    {
      id: 3,
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: 4,
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
let next_id = 5;

function findUserById(id) {
  return users.users_list.find((user) => user.id === id);
}

function generateNewUserId() {
  // NOTE: I think this is safe because node/express handle requests sequentially
  // so no need to worry about race conditions
  const id = next_id;
  next_id += 1;
  return id;
}

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let matches = [];
  for (let i = 0; i < users.users_list.length; i++) {
    const name_matches =
      name === undefined || users.users_list[i].name === name;
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
  const { name, job } = req.body;
  if ([name, job].includes(undefined)) {
    // TODO: more descriptive error
    res.status(400).send("Missing information");
    return;
  } else if (req.body.id !== undefined) {
    // TODO: update request handler
    res.status(400).send("Cannot specify id in post");
    return;
  }

  let id = generateNewUserId();
  const user = { name, job, id };
  users.users_list.push(user);
  res.status(201).send(user);
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === undefined) {
    res.status(404).send(`User with id: ${id} not found`);
    return;
  }
  users.users_list.splice(index, 1);
  res.status(204).end();
});
