const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const podcastSchema = {
  url: String,
  title: String,
  image: String,
  description: String
}

module.exports = mongoose.model('podcast', podcastSchema)
