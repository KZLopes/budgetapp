const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
// Check if Token Expired ???

module.exports = {
  // Registrar
  registerUser: asyncHandler(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        res.status(400);
        throw new Error('É necessário incluir um nome');
      }
      if (!email) {
        res.status(400);
        throw new Error('É necessário incluir um email');
      }
      if (!password) {
        res.status(400);
        throw new Error('É necessário incluir uma senha ');
      }

      const userExists = await User.findOne({ email: email });

      if (userExists) {
        res.status(400);
        throw new Error('Email já cadastrado');
      }

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creating User
      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({ name, token: generateToken(user._id) });
      } else {
        res.status(400);
        throw new Error('Informações de Usuário Inválidas');
      }
    } catch (error) {
      return next(error);
    }
  }),
  // Logar
  loginUser: asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        res
          .status(200)
          .json({ name: user.name, token: generateToken(user._id) });
      } else {
        res.status(400);
        throw new Error('Credenciais Inválidas');
      }
    } catch (error) {
      return next(error);
    }
  }),
  // Get User
  getUser: asyncHandler(async (req, res) => {
    // middleware already got the user
    const { _id } = await User.findById(req.user.id);

    res.status(200).json(_id);
  }),
};
