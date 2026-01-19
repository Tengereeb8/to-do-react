"use client";

import { useState } from "react";

export const TaskList = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("all");
  // Use implicit returns for cleaner code
  const toggleTask = (id) => {
    setTask((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isChecked: !t.isChecked } : t)),
    );
  };

  const deleteTask = (id) => {
    setTask((prev) => prev.filter((t) => t.id !== id));
  };
  const taskAdder = () => {
    if (!value.trim()) return;

    setTask((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: value,
        isChecked: false,
      },
    ]);

    setValue("");
  };

  const changer = (e) => {
    setValue(e.target.value);
  };
  const filteredTasks = task.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.isChecked;
    if (filter === "completed") return t.isChecked;
  });

  return (
    <div className="text-black">
      <h1>To-do-list</h1>

      <div>
        <input
          type="text"
          value={value}
          onChange={changer}
          className="border"
        />
        <button onClick={taskAdder}>Add</button>
      </div>
      <div className="flex gap-2 my-2">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <div>
        {filteredTasks.map(({ id, value, isChecked }) => (
          <div key={id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleTask(id)}
            />
            <p className={isChecked ? "line-through " : ""}>{value}</p>
            <button onClick={() => deleteTask(id)} className="text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        {task.length > 0 ? (
          <p>
            <span>{task.filter((t) => t.isChecked).length}</span>of
            <span>{task.length} completed.</span>
          </p>
        ) : (
          <p>No tasks yet. Add one above</p>
        )}
      </div>
      <p>
        Powered by <span className="text-[#3b73ed]">Pinecone Academy</span>
      </p>
    </div>
  );
};
