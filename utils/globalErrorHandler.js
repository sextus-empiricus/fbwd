const { CustomException } = require('../exceptions/custom.exception')

const globalErrorHandler = (err, req, res, next) => {
  res.status(err instanceof CustomException ? err.code : 500).json({
    title: err instanceof CustomException ? 'Exception' : 'Server Error',
    code: err instanceof CustomException ? err.code : 500,
    message:
      err instanceof CustomException ? err.message : 'Something went wrong.'
  })
}

module.exports = { globalErrorHandler }
