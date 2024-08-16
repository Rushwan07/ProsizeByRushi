const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const clothRoutes = require('./routes/Cloth');
const userRoutes = require('./routes/userRoutes')
// const favRoutes = require('./routes/favRoutes')

const app = express();

// Middleware
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/cloth', clothRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/fav', favRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', "http://localhost:" + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
