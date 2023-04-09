import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

export default function App() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspring actress" },
    { name: "Dennis", job: "Bartender" },
  ]);
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
      console.warn("person has no job");
      return false;
    }
    if ([undefined, null, ""].includes(person.name)) {
      console.warn("person has no name");
      return false;
    }
    setCharacters((current_characters) => current_characters.concat([person]));
    return true;
  }
  return (
    <div>
      <Table characterData={characters} removeCharacter={removeCharacter} />
      <Form tryAddCharacter={tryAddCharacter} />
    </div>
  );
}
