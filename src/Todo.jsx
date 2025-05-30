import React, { useState, useEffect } from 'react';
import img1 from '../src/assets/img1.jpg'; // Ensure this path is correct

function Todo() {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isDark, setIsDark] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task (and auto-save due to useEffect)
  const handleAdd = () => {
    if (input.trim() === '') return;
    const newTask = { text: input.trim(), completed: false, priority };
    setTasks([...tasks, newTask]);
    setInput('');
    setPriority('medium');
  };

  // Toggle task completion (auto-saves)
  const handleCheck = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task (auto-saves)
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Start editing a task
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // Save edited task (auto-saves)
  const handleSave = () => {
    if (editText.trim() === '') return;
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editText.trim() } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText('');
  };

  // Cancel editing
  const handleCancel = () => {
    setEditIndex(null);
    setEditText('');
  };

  // Filter tasks (all, active, completed)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-start px-4 py-10 bg-cover bg-center transition-all duration-500 ${
        isDark ? 'bg-black' : ''
      }`}
      style={{
        backgroundImage: isDark
          ? 'none'
          : "url('https://img.freepik.com/premium-photo/list-icon-notebook-with-completed-todo-list-3d-render_471402-428.jpg')",
      }}
    >
      <div>
        <div
          className={`${
            isDark
              ? 'bg-black border border-white bg-opacity-70 text-white'
              : 'bg-white bg-opacity-30 text-black'
          } md:ml-32 backdrop-blur-md rounded-2xl shadow-lg w-full p-6 sm:p-6 max-w-md`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">📝 To-Do List</h2>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`border px-3 py-1 text-sm rounded transition ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-300'
                  : 'border-black hover:bg-black hover:text-white'
              }`}
            >
              {isDark ? 'WHITE' : 'DARK'}
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="mb-3 flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`bg-blue-500 hover:bg-blue-700 py-1 px-3 text-white font-bold rounded ${
                filter === 'all' ? 'ring-2 ring-white' : ''
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`bg-blue-500 hover:bg-blue-700 py-1 px-3 text-white font-bold rounded ${
                filter === 'active' ? 'ring-2 ring-white' : ''
              }`}
            >
              ACTIVE
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`bg-blue-500 hover:bg-blue-700 py-1 px-3 text-white font-bold rounded ${
                filter === 'completed' ? 'ring-2 ring-white' : ''
              }`}
            >
              COMPLETED
            </button>
          </div>

          {/* Input Area */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-black"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="overflow-x-hidden max-h-64 space-y-2">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks to display.</p>
            ) : (
              filteredTasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex flex-col sm:flex-row justify-between items-center px-4 py-2 rounded-md border gap-2 ${
                    isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <div className="flex items-center w-full gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheck(index)}
                    />
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-black"
                      />
                    ) : (
                      <span
                        className={`flex-1 break-words ${
                          task.completed
                            ? isDark
                              ? 'line-through text-gray-400'
                              : 'line-through text-gray-500'
                            : isDark
                            ? 'text-white'
                            : 'text-gray-800'
                        }`}
                      >
                        {task.text}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <p
                      className={`text-xs font-semibold ${
                        task.priority === 'high'
                          ? 'text-red-500'
                          : task.priority === 'low'
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </p>
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-green-500 hover:text-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <img
                          className="h-6 w-6 cursor-pointer"
                          src={img1}
                          onClick={() => handleEditClick(index)}
                          title="Edit"
                          alt="edit"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          className={`${
                            isDark
                              ? 'text-red-400 hover:text-red-600'
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Clear All Tasks (only shows if tasks exist) */}
          {tasks.length > 0 && (
            <button
              onClick={() => {
                localStorage.removeItem('tasks');
                setTasks([]);
              }}
              className="mt-6 w-full bg-red-600 hover:bg-red-800 text-white py-2 rounded transition"
            >
              Clear All Tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;