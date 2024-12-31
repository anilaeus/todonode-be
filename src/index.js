import express from 'express';
import { todoRouter } from './routes/todo.routes.js';

const app = express();
app.use(express.json());
app.use('/api', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));