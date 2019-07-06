const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const userSchema = {
  username: String,
  password: String,
  email: String
}

module.exports = mongoose.model('user', userSchema)
