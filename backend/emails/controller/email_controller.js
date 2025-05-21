const sendEmail = require('../utils/send_email');

exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ message: 'Dados incompletos.' });
  }

  try {
    await sendEmail({ to, subject, text, html });
    res.status(200).json({ message: 'Email enviado com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar email.', error: err.message });
  }
};
