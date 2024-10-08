import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createTodo, updateTodo } from './validation/index.js';
import Todo from './model/index.js';

const app = express();
const port = 3000

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.get('/get-todos', async (req, res) => {
  const todoData = await Todo.find({});

  return res.status(200).json({
    msg: 'Records fetched successfully',
    data: todoData,
  });
});

app.put('/mark-done', async(req, res) => {
  const payload = req.body;
  const validatedPayload = updateTodo.safeParse(payload);

  if (!validatedPayload.success) {
    res.status(411).json({
      msg: 'Invalid Inputs'
    });
    return;
  }

  const update = await Todo.findOneAndUpdate(
    { _id: payload.id },
    { $set : { isCompleted: true } }
  )

  return res.status(200).json({
    msg: 'Todo Updated successfully',
    status: true,
    data: update,
  });
});

app.post('/add-todos', async (req, res) => {
  const payload = req.body;
  const validatedPayload = createTodo.safeParse(payload);

  if (!validatedPayload.success) {
    res.status(411).json({
      msg: 'Invalid Inputs',
      status: false,
    });
    return;
  }

  const create = await Todo.create({
    title: payload.title,
    description: payload.description,
  });

  return res.status(200).json({
    msg: 'Todo created successfully',
    status: true,
    data: create,
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});