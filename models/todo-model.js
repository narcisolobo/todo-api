import { model, Schema } from 'mongoose';

/**
 * This code is defining a Mongoose schema for a todo item.
 * The schema has three fields: `title`, `description`, and
 * `isComplete`. The `title` and `description` fields are
 * required strings, while the `isComplete` field is a boolean
 * with a default value of `false`. The schema also includes a
 * `timestamps` option, which automatically adds `createdAt`
 * and `updatedAt` fields to the document.
 */
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter todo title.'],
    },
    description: {
      type: String,
      required: [true, 'Please enter todo description.'],
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = model('Todo', todoSchema);
export default Todo;
