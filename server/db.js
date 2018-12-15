import dotenv from 'dotenv';
import mongoose from 'mongoose';

import GitCheat from './models/gitCheat';
import cheats from './seeders/cheats';

dotenv.config();

let DB_URL;

if(process.env.NODE_ENV !== 'test') {
    if (process.env.NODE_ENV === 'production') {
    DB_URL = process.env.DB_URL;
  } else {
    DB_URL = process.env.DB_DEV_URL;
  }

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  }, () => {
    console.log('Database connected');
    if (process.env.NODE_ENV !== 'production') {
      cheats.forEach(cheat => {
        GitCheat.findOne({command: cheat.command}, (error, existingCheat) => {
          if(!error && !existingCheat) {
            GitCheat.create(cheat);
          }
        });
      });
    }
  });
}

export default mongoose;
