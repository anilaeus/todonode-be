import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTodoSchema = z.object({
  todo_name: z.string().min(1).max(15)
});

export class TodoController {
  async index(req, res) {
    try {
      const todos = await prisma.todo.findMany();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const validated = createTodoSchema.parse(req.body);
      const todo = await prisma.todo.create({
        data: validated
      });
      res.json({ todo });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: error.message });
    }
  }
}