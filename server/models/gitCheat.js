import mongoose from 'mongoose';

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
    required: true,
    trim: true,
  },
  keywords: [String],
});

const GitCheat = mongoose.model('GitCheat', GitCheatSchema);

export default GitCheat;
