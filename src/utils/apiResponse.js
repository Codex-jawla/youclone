class ApiResponse{
    constructor(statuscode, message="success", data){
        this.statusCode = statuscode;
        this.message = message;
        this.data = data || null;
        this.success = statuscode<400;
    }
}