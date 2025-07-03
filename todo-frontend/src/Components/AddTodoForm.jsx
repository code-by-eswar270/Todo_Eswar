import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AddTodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("username"); // 👈 Get name from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/todos?userEmail=${encodeURIComponent(
          userEmail
        )}`,
        {
          title,
          description,
          dueDate,
          priority,
        }
      );

      setTodos((prev) => [response.data, ...prev]);

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    } catch (error) {
      alert("Failed to add todo. Please try again.");
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      {/* Show the logged-in user name */}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          required
        />

        {/* Description Textarea */}
        <div>
          <textarea
            placeholder="Optional description (max 200 chars)..."
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                setDescription(e.target.value);
              }
            }}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white resize-none"
            rows={3}
          />
          <p
            className={`text-sm text-right ${
              description.length >= 180 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {description.length}/200
          </p>
        </div>

        {/* Due Date + Priority + Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            >
              <option value="high">🔥 High</option>
              <option value="medium">⚠️ Medium</option>
              <option value="low">✅ Low</option>
            </select>
          </div>

          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-transparent mb-1">Add</label>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition dark:bg-blue-500"
            >
              Add
            </button>
          </div>
        </div>
      </motion.form>
    </>
  );
};

export default AddTodoForm;
