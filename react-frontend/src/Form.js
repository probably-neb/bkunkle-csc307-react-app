import React, { useState } from "react";

export default function Form(props) {
  const defaultPerson = {
    name: "",
    job: "",
  };
  const [person, setPerson] = useState(defaultPerson);
  function handleChange(event) {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  }
  function submitForm() {
    // TODO: don't fail silently
    const ok = props.tryAddCharacter(person);
    if (ok) setPerson(defaultPerson);
  }
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
