import './styles.css';
import React, { useState, useEffect } from "react";
import { FaPlus, FaCheckCircle, FaEdit, FaTrash, FaSun, FaMoon, FaBars } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <FaBars className="menu-icon" />
        <h1>To Do List</h1>
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </header>

      <div className="task-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Item"
        />
        <button onClick={addTask} className="add-button"><FaPlus /></button>
      </div>

      <div className="filter">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "task completed" : "task"}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={saveEdit}><FaCheckCircle /></button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => toggleComplete(index)}><FaCheckCircle /></button>
                <button onClick={() => startEditing(index)}><FaEdit /></button>
                <button onClick={() => deleteTask(index)}><FaTrash /></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
