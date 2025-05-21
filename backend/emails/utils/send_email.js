const nodemailer = require('nodemailer');

async function sendEmail({ subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_FOR_LEAD,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
