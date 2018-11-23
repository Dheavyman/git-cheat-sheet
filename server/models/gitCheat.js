import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const GitCheatSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  }
});

const GitCheat = mongoose.model('GitCheat', GitCheatSchema);

export default GitCheat;
