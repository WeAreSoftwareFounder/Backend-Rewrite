const authorizationMiddleware = (req, res, next) => {
    // Assuming that user roles or some form of authorization logic is implemented
    const user = req.user;
  
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
  
    next();
  };
  
  module.exports = authorizationMiddleware;
  