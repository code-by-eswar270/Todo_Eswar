import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet! ✨</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))
      )}
    </div>
  );
};

export default TodoList;
