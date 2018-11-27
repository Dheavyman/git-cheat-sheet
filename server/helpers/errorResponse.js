/**
 * Error response
 *
 * @param {object} error - Error object
 * @param {object} res- Response object
 *
 * @returns {object} Response object
 */
const errorResponse = (status, error, res) => (
  res.status(status).json({
    status: 'error',
    message: error.message
  })
);

export default errorResponse;
