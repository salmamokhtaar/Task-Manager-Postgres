import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * CREATE task
 */
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: { title },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET all tasks
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * UPDATE task
 */
export const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE task
 */
export const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
