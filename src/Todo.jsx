import React, { useState } from 'react';
import img1 from '../src/assets/img1.jpg';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState(null); // all, active, completed, or null

  const handleAdd = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input.trim(), completed: false }]);
    setInput('');
  };

  const handleCheck = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleSave = () => {
    const updated = [...tasks];
    if (editText.trim() === '') return;
    updated[editIndex].text = editText.trim();
    setTasks(updated);
    setEditIndex(null);
    setEditText('');
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditText('');
  };

  const toggleFilter = (value) => {
    setFilter(prev => prev === value ? null : value);
  };

  const getFilteredTasks = () => {
    if (filter === 'active') return tasks.filter(task => !task.completed);
    if (filter === 'completed') return tasks.filter(task => task.completed);
    return tasks; // for "all" or null
  };

  const filteredTasks = getFilteredTasks();

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
          } md:ml-32 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm p-6 sm:p-6`}
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
          <div className="mb-3 flex gap-5">
            <div
              onClick={() => toggleFilter('all')}
              className={`bg-blue-500 hover:bg-blue-700 pt-1 pb-1 cursor-pointer text-white w-12 text-center font-bold rounded ${
                filter === 'all' ? 'ring-2 ring-white' : ''
              }`}
            >
              ALL
            </div>
            <div
              onClick={() => toggleFilter('active')}
              className={`bg-blue-500 hover:bg-blue-700 pt-1 pb-1 cursor-pointer text-white w-20 text-center font-bold rounded ${
                filter === 'active' ? 'ring-2 ring-white' : ''
              }`}
            >
              ACTIVE
            </div>
            <div
              onClick={() => toggleFilter('completed')}
              className={`bg-blue-500 hover:bg-blue-700 pt-1 pb-1 cursor-pointer text-white w-32 text-center font-bold rounded ${
                filter === 'completed' ? 'ring-2 ring-white' : ''
              }`}
            >
              COMPLETED
            </div>
          </div>

          {/* Input Area */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {filteredTasks.map((task, index) => (
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
                    onChange={() => handleCheck(tasks.indexOf(task))}
                  />
                  {editIndex === tasks.indexOf(task) ? (
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
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  {editIndex === tasks.indexOf(task) ? (
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
                        onClick={() => handleEditClick(tasks.indexOf(task))}
                        title="Edit"
                        alt="edit"
                      />
                      <button
                        onClick={() => handleDelete(tasks.indexOf(task))}
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
