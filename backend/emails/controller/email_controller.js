const sendEmail = require('../utils/send_email');

exports.sendEmail = async (req, res) => {
  const { subject, text, html } = req.body;

  if ( !subject || (!text && !html)) {
    return res.status(400).json({ message: 'Dados incompletos.' });
  }

  try {
    await sendEmail({  subject, text, html });
    res.status(200).json({ message: 'Email enviado com sucesso.' });
  } catch (err) {
    console.error('Erro ao enviar email:', {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
    });

    res.status(500).json({ message: 'Erro ao enviar email.', error: err.message });
  }
};
