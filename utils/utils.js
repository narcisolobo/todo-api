/**
 * The function extracts validation errors from a ValidationError
 * object and returns them as an object with field names as keys
 * and error messages as values.
 * @param {Error} error - The "error" parameter is an object that
 * represents an error that occurred during the execution of a
 * function or code block.
 *
 * Specifically, this function is designed to handle errors of
 * type "ValidationError" that may occur when working with a Mongoose
 * model. The function extracts any validation errors from the error
 * object.
 * @returns {object} an object containing validation errors. If the
 * input error object has a name property equal to 'ValidationError'
 * and an errors property, the function loops through each field in
 * the errors object and extracts the error message for that field.
 *
 * The function then returns an object with each field as a key and
 * its corresponding error message as the value.
 */
function extractValidationErrors(error) {
  const validationErrors = {};

  if (error.name === 'ValidationError' && error.errors) {
    for (const field in error.errors) {
      if (error.errors.hasOwnProperty(field)) {
        const errorMessage = error.errors[field].message;
        validationErrors[field] = errorMessage;
      }
    }
  }

  return validationErrors;
}

export { extractValidationErrors };
