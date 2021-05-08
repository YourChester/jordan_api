const jwt = require('jsonwebtoken');

module.exports = function(rules) {
  return function(req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
  
    try {
      if (!rules.length) {
        return res.status(500).json({ message: "Ошибка в ruleMiddleware" })
      }
      const token = req.headers.authorization.split(' ')[1]
      if(!token) {
        return res.status(403).json({ message: "Вы не авторизованы" })
      }

      const decodedStaff = jwt.verify(token, process.env.SECRET_KEY)
      const hasRole = rules.includes(decodedStaff.rule)
      if (!hasRole) {
        return res.status(403).json({ message: "У вас не достаточно прав" })
      }

      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: "Что то пошло не так" })
    }
  }
}