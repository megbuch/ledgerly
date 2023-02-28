module.exports = function(req, res, next) {
    // Use status code of 401 Unauthorized
    if (!req.user) return res.status(401).json('Unauthorized');
    // A okay
    next();
  };
  