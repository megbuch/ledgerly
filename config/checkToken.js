const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  req.user = null;
  if (!token) return next();
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return next();
    req.user = decoded.user;
    req.exp = new Date(decoded.exp * 1000);
    return next();
  });
};
