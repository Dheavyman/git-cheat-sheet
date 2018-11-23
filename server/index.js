import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import mongoose from './db';

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('short'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the home route'
  });
});

app.set('port', process.env.PORT || 8800);

app.listen(app.get('port'), error => {
  if (error) {
    console.log(error.message);
    return;
  }

  console.log(`Server running on port ${app.get('port')}`);
});
