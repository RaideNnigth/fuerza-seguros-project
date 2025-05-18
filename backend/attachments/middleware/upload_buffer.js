// middleware/uploadBuffer.js
const multer = require('multer');

const storage = multer.memoryStorage(); // armazena em buffer
const upload = multer({ storage });

module.exports = upload;
