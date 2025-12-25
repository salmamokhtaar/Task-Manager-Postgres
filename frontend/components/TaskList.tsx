"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  refresh: boolean;
};

export default function TaskList({ refresh }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const saveEdit = async (id: number) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        completed: editCompleted,
      }),
    });

    setEditingId(null);
    fetchTasks();
  };

  return (
    <div className="max-w-xl mx-auto space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-md px-4 py-2 flex items-center justify-between"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3 flex-1">
            {editingId === task.id ? (
              <>
                <input
                  type="checkbox"
                  checked={editCompleted}
                  onChange={(e) => setEditCompleted(e.target.checked)}
                />

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
              </>
            ) : (
              <>
                <input type="checkbox" checked={task.completed} readOnly />

                <span
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex gap-3 ml-4">
            {editingId === task.id ? (
              <button
                onClick={() => saveEdit(task.id)}
                className="text-green-600 text-sm"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditTitle(task.title);
                  setEditCompleted(task.completed);
                }}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
