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
        return res.status(401).json({ message: "Доступ запрещен" })
      }

      const decodedStaff = jwt.verify(token, process.env.SECRET_KEY)

      if (new Date().getTime() > (decodedStaff.exp * 1000)) {
        return res.status(401).json({ message: "Доступ запрещен" })
      }

      const hasRole = rules.includes(decodedStaff.role)
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" })
      }

      next()
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: "Доступ запрещен" })
    }
  }
}