import dotenv from 'dotenv';
import '@babel/register';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongoose from './db';
import renderer from './middleware/renderer';
import routes from './routes';

dotenv.config();

const app = express();
let dbConnection;

if (process.env.NODE_ENV !== 'test') {
  dbConnection = mongoose.connection;
  dbConnection.on(
    'error', console.error.bind(console, 'MongoDB connection error:'));
}

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', renderer);

app.use(express.static(path.join(__dirname, '..', 'build')))

routes(app);

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
