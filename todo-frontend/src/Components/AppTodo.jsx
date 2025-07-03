import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import ThemeToggle from "./ThemeToggle";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("username");

    if (name) {
      setUsername(name);
    }

    if (!email) {
      console.error("User email not found in localStorage.");
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/todos/user/${encodeURIComponent(email)}`
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];
    switch (filter) {
      case "completed":
        return todo.completed;
      case "pending":
        return !todo.completed;
      case "high":
      case "medium":
      case "low":
        return todo.priority === filter && !todo.completed;
      case "dueToday":
        return todo.dueDate === today && !todo.completed;
      case "overdue":
        return todo.dueDate && todo.dueDate < today && !todo.completed;
      default:
        return !todo.completed;
    }
  });

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#10b981] via-[#06b6d4] to-[#3b82f6] transition-colors duration-500">
      <div className="max-w-4xl w-full px-4 py-10 sm:px-6 lg:px-10">
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-6 space-y-6 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              📝 My To-Do List
            </h1>
            <ThemeToggle />
          </div>

          {/* 👇 Welcome user by name */}
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Welcome, {username || "User"}! 👋
          </h2>

          <AddTodoForm setTodos={setTodos} />
          <TodoFilters filter={filter} setFilter={setFilter} />
          <div className="max-h-[300px] overflow-y-auto pr-2">
            <TodoList todos={filteredTodos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
