const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.pre('save', function preSave(next) {
  const user = this;
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) throw err;
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
