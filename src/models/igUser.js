import mongoose from 'mongoose';

const IGUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  profile_picture: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  follower_count: {
    type: String,
    required: true
  },
  following_count: {
    type: String,
    required: true
  },
  is_private: {
    type: Boolean,
    required: true
  },
  bio_text: {
    type: String,
    required: true,
    default: ""
  },
  posts: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});


const IGUser = mongoose.model('ig-users', IGUserSchema);

export default IGUser;
