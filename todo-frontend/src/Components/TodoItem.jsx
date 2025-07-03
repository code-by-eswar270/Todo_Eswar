import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2, CheckCircle2 } from "lucide-react";
import axios from "axios";

const TodoItem = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const toggleComplete = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/todos/${todo.id}`,
        { completed: !todo.completed }, // ✅ JSON body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${todo.id}`);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      alert("Failed to delete.");
      console.error(err);
    }
  };

  const saveEdit = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? { ...t, title: editTitle, description: editDescription }
          : t
      )
    );
    setIsEditing(false);
  };

  return (
    <motion.div
      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-start gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 space-y-1">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-transparent border-b border-blue-500 outline-none text-black dark:text-white font-semibold"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full bg-transparent border border-blue-300 rounded p-1 outline-none text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-800"
            />
            <button
              onClick={saveEdit}
              className="text-sm text-blue-600 underline hover:opacity-80"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span
              className={`block font-semibold ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
            {todo.description && (
              <div className="text-sm text-gray-600 dark:text-gray-300 italic">
                {todo.description}
              </div>
            )}
          </>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Due: {todo.dueDate || "N/A"} | Priority: {todo.priority}
        </div>
      </div>

      <div className="flex gap-2 items-center pt-1">
        <button onClick={toggleComplete} title="Mark Complete">
          <CheckCircle2 className="text-green-600 hover:scale-110 transition" />
        </button>
        <button onClick={() => setIsEditing(true)} title="Edit">
          <Edit2 className="text-blue-500 hover:scale-110 transition" />
        </button>
        <button onClick={deleteTodo} title="Delete">
          <Trash2 className="text-red-500 hover:scale-110 transition" />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
