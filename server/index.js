const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URI = process.env.CLIENT_URI;

const app = express();
const server = http.createServer(app);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === CLIENT_URI) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routePath = './routes';
fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith('.js')) {
    const route = require(`${routePath}/${file}`);
    app.use('/api', route);
  }
});
