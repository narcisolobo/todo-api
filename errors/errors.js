import { extractValidationErrors } from '../utils/utils.js';

/**
 * This class defines a custom error called NotFoundError
 * with a status code of 404.
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/**
 * This class defines a custom error called ValidationError
 * with a status code of 403. It implements the
 * `extractValidationErrors` utility function for errors
 * that inlude validation errors.
 */
class ValidationError extends Error {
  constructor(message, error) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 403;
    this.validationErrors = extractValidationErrors(error);
  }
}

export { NotFoundError, ValidationError };
