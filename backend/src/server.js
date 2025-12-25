import app from "./app.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
