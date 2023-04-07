import Table from "./Table";

const characters = [
  { name: "Charlie", job: "Janitor" },
  { name: "Mac", job: "Bouncer" },
  { name: "Dee", job: "Aspring actress" },
  { name: "Dennis", job: "Bartender" },
];

export default function App() {
  return (
    <div>
      <Table characterData={characters} />
    </div>
  );
}
