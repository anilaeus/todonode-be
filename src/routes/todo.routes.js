import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller.js';

const router = Router();
const todoController = new TodoController();

router.get('/todos', todoController.index);
router.post('/todos', todoController.create);

export { router as todoRouter };