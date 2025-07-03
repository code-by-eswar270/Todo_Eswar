import React from "react";

const TodoFilters = ({ filter, setFilter }) => {
  const filters = [
    "all",
    "completed",
    "pending",
    "high",
    "medium",
    "low",
    "dueToday",
    "overdue",
  ];

  const labelMap = {
    all: "All",
    completed: "✔ Completed",
    pending: "🕒 Pending",
    high: "🔥 High",
    medium: "⚠️ Medium",
    low: "✅ Low",
    dueToday: "📅 Due Today",
    overdue: "⏰ Overdue",
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-full text-sm capitalize transition
            ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
            }`}
        >
          {labelMap[f]}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
