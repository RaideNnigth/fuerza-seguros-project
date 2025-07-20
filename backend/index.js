require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middlewares
const allowedOrigins = [
  'https://fuerza-seguros-project-1rfq2xorq-raidennigths-projects.vercel.app',
];

app.use(cors({
  origin: '*', // Allow all origins for development
}));

app.use(express.json());

// Routes
app.use('/api/post-order', require('./post_orders'));
app.use('/api/auth', require('./user_auth'));
app.use('/api/blog', require('./blog_posts'));
app.use('/api/attachments', require('./attachments'));
app.use('/api/email', require('./emails'));
app.use('/api/tags', require('./tags'));

// Root test route
app.get('/', (req, res) => {
  res.send('Fuerza Seguros API Running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Start server (HTTPS local only)
if (NODE_ENV === 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT} (production, HTTP behind proxy)`);
  });
} else {
  const keyPath = './cert/key.pem';
  const certPath = './cert/cert.pem';
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const sslOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
    https.createServer(sslOptions, app).listen(PORT, () => {
      console.log(`🔐 Server running on https://localhost:${PORT} (development)`);
    });
  } else {
    console.warn('⚠️ Cert files not found, falling back to HTTP');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (development)`);
    });
  }
}
