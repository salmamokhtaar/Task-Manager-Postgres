"use client";

import { useState } from "react";

type Props = {
  onTaskCreated: () => void;
};

export default function TaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState("");

  const createTask = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    onTaskCreated();
  };

  return (
    <div className="max-w-xl mx-auto mb-6">
      <div className="bg-white shadow-md rounded-xl p-4 flex gap-3">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={createTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          Create
        </button>
      </div>
    </div>
  );
}
