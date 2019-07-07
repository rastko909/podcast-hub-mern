const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const userSchema = {
  username: String,
  password: String,
  email: String,
  podcasts: {
    podcast_id: String,
    podcast: String,
    title: String,
    description: String,
    url: String
  }
}

module.exports = mongoose.model('user', userSchema)
