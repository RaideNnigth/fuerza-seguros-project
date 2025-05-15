const User = require('../model/User');
const { generateToken, generateRefreshToken } = require('../config/generate_token');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.json({ token, refreshToken });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ msg: 'Refresh token não enviado' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
    const token = generateToken(decoded.id);
    res.json({ token });
  } catch (err) {
    res.status(403).json({ msg: 'Refresh token inválido ou expirado' });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, refreshToken, getProfile };
