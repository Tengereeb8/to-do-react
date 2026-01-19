"use client";

const Home = () => {
  const [value, setValue] = useState("");
  const [tasklist, setTasklist] = useState([]);

  const changer = () => {
    setValue(e.target.value);
  };

  const adder = () => {
    setTasklist((prev) => [...prev, value]);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl">To-do-list</h1>
      </div>
      <div className="flex">
        <input
          type="text"
          onChange={() => changer(e)}
          placeholder="write a task"
        />
        <button onClick={adder}>Add</button>
      </div>
      {tasklist.map((task) => {
        return <p>{task}</p>;
      })}
    </div>
  );
};

export default Home;
