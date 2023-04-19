const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

module.exports = {
  protect: asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get Token from Header
        token = req.headers.authorization.split(' ')[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error('Nao Autorizado');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Nao Autorizado, Sem Token');
    }
  }),
};
