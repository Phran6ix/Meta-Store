class AppError extends Error{
    constructor(message, statusCode){
        super(statusCode)
        this.message = message
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

}

module.exports = AppError