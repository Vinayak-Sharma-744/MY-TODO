import mongoose, {Schema, Document} from "mongoose";

mongoose.connect('mongodb://localhost:27017/');

const TodoSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;