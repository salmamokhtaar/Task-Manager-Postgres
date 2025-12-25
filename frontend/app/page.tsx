"use client";

import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function HomePage() {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
      <TaskForm onTaskCreated={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
    </>
  );
}
