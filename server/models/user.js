import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: {
      validator: function(value) {
        return /^[a-z0-9._]+$/i.test(value)
      },
      message: 'Username must contain only alphanumeric characters, period and underscore.',
    }
  },
  password: {
    type: String,
    minlength: [8, 'Password must contain at least 8 characters.'],
    required: true,
  }
});

UserSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function(password, cb) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);

    return cb(null, isMatch);
  } catch (error) {
    return cb(error)
  }
}

const User = mongoose.model('User', UserSchema);

export default User;
