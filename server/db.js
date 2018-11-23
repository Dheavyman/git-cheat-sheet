import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let DB_URL;

if (process.env.NODE_ENV === 'production') {
  DB_URL = process.env.DB_URL;
} else if(process.env.NODE_ENV === 'test') {
  DB_URL = process.env.DB_TEST_URL;
} else {
  DB_URL = process.env.DB_DEV_URL;
}

mongoose.connect(DB_URL, {
  useNewUrlParser: true
}, () => {
  console.log('Database connected');
});

export default mongoose;
