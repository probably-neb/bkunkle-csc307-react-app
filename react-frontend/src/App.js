import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Form from "./Form";

const backend = {
  routes: {
    users: "http://localhost:8000/users",
  },
  fetchAll: () => {
    return axios
      .get(backend.routes.users)
      .then((response) => response.data.users_list);
  },
  addUser: (user) => {
    return axios.post(backend.routes.users, user).then((res) => {
      if (!res || res.status !== 201) {
        throw Error("post of user failed");
      }
      return res.data;
    });
  },
};

export default function App() {
  // const [characters, setCharacters] = useState([
  //   { name: "Charlie", job: "Janitor" },
  //   { name: "Mac", job: "Bouncer" },
  //   { name: "Dee", job: "Aspring actress" },
  //   { name: "Dennis", job: "Bartender" },
  // ]);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    backend
      .fetchAll()
      .then((users_list) => setCharacters(users_list))
      .catch((err) => console.error(err));
  }, []);
  function removeCharacter(index) {
    console.assert(index !== undefined, "index is undefined");
    console.assert(index !== null, "index is null");
    console.assert(
      index < characters.length,
      `index: ${index} not within bounds of character array: ${characters.length}`
    );
    setCharacters((current_characters) => {
      const updated_characters = [...current_characters];
      updated_characters.splice(index, 1);
      return updated_characters;
    });
  }
  function tryAddCharacter(person) {
    // don't add incomplete people
    if ([undefined, null, ""].includes(person.job)) {
      console.error("person has no job");
      return false;
    }
    if ([undefined, null, ""].includes(person.name)) {
      console.error("person has no name");
      return false;
    }
    backend
      .addUser(person)
      .then((new_user) => {
        setCharacters((current_characters) =>
          current_characters.concat([new_user])
        );
      })
      .catch((err) => console.error(err.response));

    return true;
  }
  return (
    <div>
      <Table characterData={characters} removeCharacter={removeCharacter} />
      <Form tryAddCharacter={tryAddCharacter} />
    </div>
  );
}
