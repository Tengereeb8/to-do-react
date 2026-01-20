"use client";
import { useState } from "react";

export const TaskList = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("all");

  const toggleTask = (id) => {
    setTask((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isChecked: !t.isChecked } : t)),
    );
  };

  const deleteTask = (id) => {
    const taskDeleter = confirm("Are you sure you want to delete this task?");
    if (!taskDeleter) {
      return;
    }
    setTask((prev) => prev.filter((t) => t.id !== id));
  };

  const taskAdder = () => {
    const trimmed = value.trim();

    if (!trimmed) {
      setValue("");
      alert("Task cannot be empty");
      return;
    }

    if (trimmed.length > 30) {
      setValue("");
      alert("Your task is too long");
      return;
    }

    setTask((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: trimmed,
        isChecked: false,
      },
    ]);

    setValue("");
  };

  const clearCompleted = () => {
    const answer = confirm("Are you sure you want to delete all tasks?");
    if (!answer) {
      return;
    }
    setTask((prev) => prev.filter((t) => !t.isChecked));
  };

  const changer = (e) => {
    setValue(e.target.value);
  };
  // const completeAll = () => {
  //   setTask((prev) => {
  //     prev.map((t) => ({ ...t, isChecked: true }));
  //   });
  // };
  const completeAll = () => {
    setTask((prev) => prev.map((t) => ({ ...t, isChecked: !t.isChecked })));
  };

  const filteredTasks = task.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.isChecked;
    if (filter === "completed") return t.isChecked;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex justify-center pt-[60px]">
      <div className="w-[377px] bg-white rounded-md shadow-[0px_0px_12px_0px_rgba(0,0,0,0.16)] px-4 py-6 flex flex-col items-center h-fit">
        <h1 className="text-black font-sans text-4xl font-medium mb-6">
          To-Do list
        </h1>

        <div className="w-full flex gap-2 mb-4">
          <input
            type="text"
            value={value}
            onChange={changer}
            className="flex-1 h-[38px] border border-[#e4e4e7] rounded-md px-3 text-black"
            placeholder="Add a new task..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                taskAdder();
              }
            }}
          />
          <button
            onClick={taskAdder}
            className="bg-[#3c82f6] text-white w-[59px] h-10 rounded-md border border-[#e4e4e7] font-normal cursor-pointer hover:bg-[#2563eb] transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 mb-5 w-full">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`h-8 w-[38px] rounded-md border font-normal cursor-pointer transition-all ${
                filter === "all"
                  ? "bg-[#007bff] text-white border-[#007bff]"
                  : "bg-[#f3f4f6] text-black border-[#999]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`h-8 w-[60px] rounded-md border font-normal cursor-pointer transition-all ${
                filter === "active"
                  ? "bg-[#007bff] text-white border-[#007bff]"
                  : "bg-[#f3f4f6] text-black border-[#999]"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`h-8 w-[87px] rounded-md border font-normal cursor-pointer transition-all ${
                filter === "completed"
                  ? "bg-[#007bff] text-white border-[#007bff]"
                  : "bg-[#f3f4f6] text-black border-[#999]"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        {task.length > 0 ? (
          <button
            className="text-green-500 mr-auto cursor-pointer flex"
            onClick={completeAll}
          >
            Complete all
          </button>
        ) : (
          ""
        )}

        <div className="w-full">
          {filteredTasks.map(({ id, value, isChecked }) => (
            <div
              key={id}
              className="w-full h-[62px] mt-5 mb-5 bg-[#f3f4f6] rounded-md flex items-center justify-between px-4 cursor-pointer"
            >
              <div className="flex items-center justify-start  gap-1">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleTask(id)}
                  className="accent-[#3c83f6] w-5 h-5 cursor-pointer "
                />
                <span
                  className={`text-black text-sm font-normal transition-all duration-200 ${
                    isChecked ? "line-through" : ""
                  }`}
                >
                  {value}
                </span>
              </div>
              <button
                onClick={() => deleteTask(id)}
                className="bg-[#fef2f2] w-[67px] h-[30px] text-[#ef4444] cursor-pointer border border-[#fef2f2] rounded-md hover:bg-[#fee2e2] transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          {task.length > 0 ? (
            <div className="flex justify-between">
              <p className="text-[#6b7280] font-normal text-sm">
                <span className="font-semibold">
                  {task.filter((t) => t.isChecked).length}
                </span>{" "}
                of <span className="font-semibold">{task.length}</span>{" "}
                completed.
              </p>
              <p
                onClick={clearCompleted}
                className="  text-red-500   transition-all cursor-pointer ml-auto"
              >
                Clear completed
              </p>
            </div>
          ) : (
            <p className="text-[#6b7280] font-normal text-sm">
              No tasks yet. Add one above
            </p>
          )}
        </div>

        <p className="text-[#6b7280] font-normal text-sm mt-4">
          Powered by <span className="text-[#3b73ed]">Pinecone Academy</span>
        </p>
      </div>
    </div>
  );
};
