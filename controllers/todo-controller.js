import {
  saveTodoToDb,
  getTodosFromDb,
  findTodoById,
  findTodoByIdAndUpdate,
  findTodoByIdAndDelete,
  markTodoAsComplete,
  searchTodosInDb,
} from '../services/todo-service.js';

/**
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * This function creates a new todo item and saves it to a database,
 * returning the newly created item as a JSON response with a status
 * code of 201.
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function createTodo(req, res, next) {
  try {
    const newTodo = await saveTodoToDb(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * This function retrieves all todos from a database and sends them
 * as a JSON response with a 200 status code, or passes any errors
 * to the next middleware function.
 * @param {Express.Request} _ - The underscore (_) in the parameter
 * list of the `getAllTodos` function is a placeholder for the first
 * parameter, which is typically the request object. In this case,
 * the request object is not being used in the function, so it is
 * being ignored.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function getAllTodos(_, res, next) {
  try {
    const allTodos = await getTodosFromDb();
    res.status(200).json(allTodos);
  } catch (error) {
    next(error);
  }
}

/**
 * This function retrieves a single todo item by its ID and sends it
 * as a JSON response.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function getOneTodo(req, res, next) {
  const { id } = req.params;
  try {
    const oneTodo = await findTodoById(id);
    res.status(200).json(oneTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * This function updates a single todo item by its ID and returns
 * the updated todo.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function updateOneTodo(req, res, next) {
  const { id } = req.params;
  try {
    const updatedTodo = await findTodoByIdAndUpdate(id, req.body);
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * This function deletes a todo item by its ID and returns the
 * deleted item as a JSON response.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function deleteOneTodo(req, res, next) {
  const { id } = req.params;
  try {
    const deletedTodo = await findTodoByIdAndDelete(id);
    res.status(200).json(deletedTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * This function marks a todo as complete and returns the
 * completed todo.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function completeOneTodo(req, res, next) {
  const { id } = req.params;
  try {
    const completedTodo = await markTodoAsComplete(id);
    res.status(200).json(completedTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * This function filters todos based on their completion status and
 * returns the filtered list.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function filterTodosByCompletionStatus(req, res, next) {
  const { status } = req.params;
  try {
    const allTodos = await getTodosFromDb();
    const filteredTodos = allTodos.filter(
      (todo) => todo.isComplete === (status === 'complete')
    );
    res.status(200).json(filteredTodos);
  } catch (error) {
    next(error);
  }
}

/**
 * This function searches for todos in a database based on a query
 * parameter and returns the results.
 * @param {Express.Response} res - Express response object.
 * @param {NextFunction} next - Next function callback. Calls the next
 * middleware function in the chain. In this case, control is passed
 * to the custom error handler middleware.
 * @returns {Promise<void>}
 */
async function searchTodos(req, res, next) {
  const { q } = req.query;
  try {
    const searchResults = await searchTodosInDb(q);
    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
}

export {
  createTodo,
  completeOneTodo,
  deleteOneTodo,
  filterTodosByCompletionStatus,
  getAllTodos,
  getOneTodo,
  searchTodos,
  updateOneTodo,
};
