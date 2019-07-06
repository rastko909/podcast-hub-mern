const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const podcastSchema = {
  url: String
}

module.exports = mongoose.model('podcast', podcastSchema)
