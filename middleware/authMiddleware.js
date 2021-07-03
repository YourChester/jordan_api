const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
      return res.status(401).json({ message: "Доступ запрещен" })
    }
    const decodedSeller = jwt.verify(token, process.env.SECRET_KEY)
    req.seller = decodedSeller
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: "Доступ запрещен" })
  }
}