/**
 * This code is defining a router for handling HTTP requests
 * related to a todo list. It imports various functions from
 * a `todo-controller.js` file to handle different types of
 * requests such as creating a new todo, getting all todos,
 * updating a todo, completing a todo, and filtering todos by
 * completion status. The router is defined using the `Router`
 * class from the `express` library and is exported as a
 * default module.
 */

import { Router } from 'express';
import {
  completeOneTodo,
  createTodo,
  deleteOneTodo,
  filterTodosByCompletionStatus,
  getAllTodos,
  getOneTodo,
  searchTodos,
  updateOneTodo,
} from '../controllers/todo-controller.js';

const todoRouter = Router();

// prettier-ignore
todoRouter
  .route('/')
  .post(createTodo)
  .get(getAllTodos);

// prettier-ignore
todoRouter
    .route('/search')
    .get(searchTodos);

// prettier-ignore
todoRouter
  .route('/:id')
  .get(getOneTodo)
  .put(updateOneTodo)
  .patch(updateOneTodo)
  .delete(deleteOneTodo);

// prettier-ignore
todoRouter
  .route('/:id/complete')
  .put(completeOneTodo)
  .patch(completeOneTodo);

// prettier-ignore
todoRouter
    .route('/completed/:status')
    .get(filterTodosByCompletionStatus);

export default todoRouter;
