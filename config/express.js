/**
 * This code sets up an Express server with middleware and
 * routes for a todo application.
 *
 * It imports the necessary modules such as `express`, `cors`,
 * `morgan`, `todoRouter`, and `errorHandler`.
 *
 * It creates an instance of the `express` application and
 * sets up middleware using `express.json()`, `cors()`, and
 * `morgan('dev')`.
 *
 * It then sets up routes using `todoRouter` for the `/api/todos`
 * endpoint.
 *
 * Finally, it sets up an error handler using `errorHandler`
 * middleware.
 *
 * The `export default app` statement exports the `app`
 * instance for use in other modules.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import todoRouter from '../routes/todo-routes.js';
import errorHandler from '../middleware/error-handler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', todoRouter);

// Error Handler
app.use(errorHandler);

export default app;
