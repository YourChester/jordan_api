const ErrorController = require('../controller/ErrorController.js')

module.exports = function(err, req, res, next) {
    if (err instanceof ErrorController) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Не предвиденая ошибка'})
}