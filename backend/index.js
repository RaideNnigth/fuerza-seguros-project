require('dotenv').config();

// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

const allowedOrigins = [
  'https://fuerza-seguros-project.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true); // Libera qualquer outro domínio também
  },
}));

app.use(express.json());

// Post Order routes
app.use('/api/post-order', require('./post_orders'));

// User authentication routes
const userAuthRoutes = require('./user_auth');
app.use('/api/auth', userAuthRoutes); 

// Blog post routes
const blogPostRoutes = require('./blog_posts');
app.use('/api/blog', blogPostRoutes);

// Attachments routes
const attachmentRoutes = require('./attachments');
app.use('/api/attachments', attachmentRoutes);

// Email routes
const emailRoutes = require('./emails');
app.use('/api/email', emailRoutes);

// Tags routes
const tagRoutes = require('./tags');
app.use('/api/tags', tagRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Fuerza Seguros API Running!');
});

const PORT = process.env.API_PORT || process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // Em produção (Railway), usa HTTP normal
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (production, HTTP)`);
  });
} else {
  // Em dev local, usa HTTPS com certificados
  const sslOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
  };

  https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (development, HTTPS)`);
  });
}
