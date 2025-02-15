import React, { useState, useEffect } from "react";
import "./styles.css";  // Import the CSS file

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button className="delete-btn" onClick={() => removeTask(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
