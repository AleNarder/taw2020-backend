class ErrorHandler extends Error {
    constructor(status, statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
    getStatusCode() {
        return this.statusCode;
    }
    getMessage() {
        return this.message;
    }
}
ErrorHandler;
