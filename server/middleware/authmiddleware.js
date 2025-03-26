const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
 
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        _id: decoded.id,  // Ensure this matches your JWT payload
        ...decoded
    }; 
      next(); 
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;