import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import mongoose from './db';
import routes from './routes';

dotenv.config();

const app = express();
let dbConnection;

if (process.env.NODE_ENV !== 'test') {
  dbConnection = mongoose.connection;
  dbConnection.on(
    'error', console.error.bind(console, 'MongoDB connection error:'));
}

app.use(logger('short'));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the home route'
  });
});

app.all('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    message: 'Route not found',
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

export default app;
