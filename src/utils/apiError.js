class ApiError extends Error {
    constructor(message='Something went wrong', statusCode,stack,errors=[]) {
        super(message);
        this.statusCode = statusCode || 500;
        this.data = null;
        this.errors = errors;
        this.success = false;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };