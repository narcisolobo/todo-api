import Todo from '../models/todo-model.js';
import { NotFoundError, ValidationError } from '../errors/errors.js';

/**
 * @typedef {Object} Todo
 * @property {string} _id - The unique identifier of the todo.
 * @property {string} title - The title of the todo.
 * @property {string} description - The description of the todo.
 * @property {boolean} isComplete - Indicates whether the todo is complete or not.
 * @property {Date} createdAt - The date and time when the todo was created.
 * @property {Date} updatedAt - The date and time when the todo was last updated.
 */

/**
 * This is an async function that saves a todo object to a database
 * using the Todo model and returns the newly created todo.
 * @param {Todo} todo - The `todo` parameter is an object that
 * represents a todo item to be saved to a database.
 * @returns {Promise<Todo>} The function `saveTodoToDb` returns a
 * promise that resolves to the newly created `Todo` object if the
 * creation is successful. If there is a validation error,
 * it throws a custom `ValidationError` with the original error as
 * its cause. If there is any other error, it throws the original error.
 */
async function saveTodoToDb(todo) {
  console.log('service todo', todo);
  try {
    const newTodo = await Todo.create(todo);
    return newTodo;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError('Validation failed.', error);
    }
    throw error;
  }
}

/**
 * This function retrieves all todos from a database using
 * async/await syntax.
 * @returns {Promise<Todo[]>} The function `getTodosFromDb` returns a
 * promise that resolves to an array of all the `Todo` objects found
 * in the database.
 */
async function getTodosFromDb() {
  try {
    const allTodos = await Todo.find({});
    return allTodos;
  } catch (error) {
    throw error;
  }
}

/**
 * This function retrieves one todo by id from a database using
 * async/await syntax.
 * @param {string} id The `_id` of the Todo object to retrieve.
 * @returns {Promise<Todo>} The function `findTodoById` returns a
 * promise that resolves to the `Todo` object if found. If the
 * `Todo` is not found, it throws a custom `NotFoundError`. If
 * there is any other error, it throws the original error.
 */
async function findTodoById(id) {
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new NotFoundError(`Todo with id: ${id} not found.`);
    }
    return todo;
  } catch (error) {
    throw error;
  }
}

/**
 * This is an async function that finds a todo by its ID and
 * updates it with new data, throwing errors if the todo is
 * not found or if validation fails.
 * @param {string} id - The id of the todo item to be updated.
 * @param {Todo} todo - The `todo` parameter is an object that
 * represents the updated todo item. It contains the new values
 * for the properties of the todo item that need to be updated.
 * @returns {Promise<Todo>} the updated todo object.
 */
async function findTodoByIdAndUpdate(id, todo) {
  try {
    const found = await Todo.findById(id);
    if (!found) {
      throw new NotFoundError(`Todo with id: ${id} not found.`);
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });
    return updatedTodo;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError('Validation failed.', error);
    }
    throw error;
  }
}

/**
 * This function finds a todo by its ID and deletes it, throwing
 * an error if the todo is not found.
 * @param {string} id - The id of the todo item to be deleted.
 * @returns {Promise<Todo>} the deleted todo item with the specified id.
 */
async function findTodoByIdAndDelete(id) {
  try {
    const found = await Todo.findById(id);
    if (!found) {
      throw new NotFoundError(`Todo with id: ${id} not found.`);
    }
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return deletedTodo;
  } catch (error) {
    throw error;
  }
}

/**
 * This function marks a todo as complete by updating its isComplete
 * property to true and saving it to the database.
 * @param {string} id - The id parameter is the unique identifier of
 * the todo item that needs to be marked as complete.
 * @returns {Promise<Todo>} the updated todo object with the
 * `isComplete` property set to `true`.
 */
async function markTodoAsComplete(id) {
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new NotFoundError(`Todo with id: ${id} not found.`);
    }

    todo.isComplete = true;
    await todo.save();

    return todo;
  } catch (error) {
    throw error;
  }
}

/**
 * This function searches for todos in a database based on a given
 * query string.
 * @param {string} query - The query parameter is a string that
 * represents the search query that the function will use to search
 * for matching todos in the database. The function will search for
 * todos whose title or description contains the query string,
 * regardless of case sensitivity.
 * @returns {Promise<Todo[]>} a promise that resolves to an array
 * of search results from a MongoDB database. The search is performed
 * by finding all documents in the "Todo" collection that have a
 * "title" or "description" field that matches the regular expression
 * specified in the "query" parameter.
 */
async function searchTodosInDb(query) {
  try {
    const searchResults = await Todo.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    return searchResults;
  } catch (error) {
    throw error;
  }
}

export {
  saveTodoToDb,
  getTodosFromDb,
  findTodoById,
  findTodoByIdAndUpdate,
  findTodoByIdAndDelete,
  markTodoAsComplete,
  searchTodosInDb,
};
