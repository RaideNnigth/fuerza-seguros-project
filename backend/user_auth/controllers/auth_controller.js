const User = require('../model/User');
const { generateToken, generateRefreshToken } = require('../config/generate_token');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // 🔐 Validação de senha forte
  const senhaSeguraRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!senhaSeguraRegex.test(password)) {
    return res.status(400).json({
      msg: 'A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.'
    });
  }

  try {
    const user = new User({ username, password });
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

const verifyToken = async (req, res) => {
  // Aqui vamos usar o token que estará no header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'Usuário não encontrado' });
    }
    // Se chegou aqui, está tudo certo!
    res.status(200).json({ msg: 'Token válido', user });
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido ou expirado' });
  }
};

module.exports = { registerUser, loginUser, refreshToken, getProfile, verifyToken };
