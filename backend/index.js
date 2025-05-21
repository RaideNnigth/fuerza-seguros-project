require('dotenv').config();

// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const sslOptions = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
};

const app = express();
app.use(cors());
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Fuerza Seguros API Running!');
});

https.createServer(sslOptions, app).listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
