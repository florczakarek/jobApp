import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide validemail',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide valid password'],
    minlength: 6,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'last Name',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'location',
  },
});

export default mongoose.model('User', UserSchema);
