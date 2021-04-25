class ErrorController extends Error{
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ErrorController(404, message)
    }

    static internal(message) {
        return new ErrorController(500, message)
    }

    static forbidden(message) {
        return new ErrorController(403, message)
    }
}

module.exports = ErrorController