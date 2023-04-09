import React, { useState } from "react";
import Table from "./Table";

export default function App() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspring actress" },
    { name: "Dennis", job: "Bartender" },
  ]);
  function removeCharacter(index) {
    setCharacters(current_characters => {
            const updated_characters = [...current_characters];
            updated_characters.splice(index, 1);
            return updated_characters;
    });
  }
  return (
    <div>
      <Table characterData={characters} removeCharacter={removeCharacter} />
    </div>
  );
}
