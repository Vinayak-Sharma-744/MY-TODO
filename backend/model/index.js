import mongoose, {Schema, Document} from "mongoose";

mongoose.connect('mongodb://localhost:27017/');

const TodoSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    completed: { type: String },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;