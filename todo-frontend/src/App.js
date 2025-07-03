import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import TodoApp from "./Components/AppTodo"; // 👉 Your todo layout moved to AppTodo.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-2xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
