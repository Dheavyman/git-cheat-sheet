import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
const GitCheatSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  command: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  keywords: [String],
});

GitCheatSchema.plugin(uniqueValidator, {
  message: '{PATH} already exist.'
})

const GitCheat = mongoose.model('GitCheat', GitCheatSchema);

export default GitCheat;
