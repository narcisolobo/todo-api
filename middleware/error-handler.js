import dotenv from 'dotenv';
dotenv.config();

/**
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * This is an error handling middleware function that formats and
 * sends error responses to clients.
 * @param {Error} err - The error object that was thrown to the next()
 * function in the middleware chain.
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
const errorHandler = (err, req, res) => {
  const name = err.name || 'ServerError';
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const error = {
    name,
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  };
  if (err.name === 'ValidationError') {
    error['validationErrors'] = err.validationErrors;
  }
  res.status(status).json(error);
};

export default errorHandler;
