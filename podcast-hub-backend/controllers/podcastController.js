const Podcast = require('../models/Podcast')
let Parser = require('rss-parser');
let parser = new Parser();

const viewPodcast = async (request, response) => {
  const { id } = request.params;
  const episodes = [];
  try {
    const podcast = await Podcast.findOne({ _id: id });
    const feed = await parser.parseURL(podcast.url);
    feed.items.forEach((episode) => {
      let episodeObject = {
        title: episode.title,
        link: episode.enclosure.url,
        description: episode.content
      }
      episodes.push(episodeObject);
    })
  }
  catch (error) {
    return response.status(400).send(`There has been an error: ${error}`)
  }
  finally {
    return response.status(200).send(episodes);
  }
}

const deletePodcast = async (request, response) => {
  const { id } = request.params
  try {
    await Podcast.findOneAndRemove({ _id: id }, { useFindAndModify: false })
    return response.status(200).send(`Podcast was successfully deleted`)
  }
  catch (error) {
    return response.status(400).send(error)
  }
}

const newPodcast = async (request, response) => {
  const { url } = await request.body
  try {
    const feed = await parser.parseURL(url);
    const podcast = await Podcast.create({
      url: url,
      categories: feed.itunes.categories,
      title: feed.title,
      image: feed.image.url,
      description: feed.description
    })
    if (podcast) {
      console.log('created podcast')
    }
    return response.status(201).send(`Successfully added podcast URL: ${podcast}`)
  }
  catch (error) {
    return response.status(400).send(error)
  }
}

const getAllPodcasts = async (request, response) => {
  try {
    var podcasts = await Podcast.find();
  }
  catch (error) {
    return response.status(401).send(error)
  }
  return response.status(200).send(podcasts);
}

const seedPodcasts = async (request, response) => {
  
}

const urls = ['https://rss.acast.com/aunty-donna-podcast', 'tigerbelly.libsyn.com/rss',
  'http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=16787314', 'http://feeds.feedburner.com/YourMomsHouseWithChristinaPazsitzkyAndTomSegura']

module.exports = { newPodcast, getAllPodcasts, viewPodcast, seedPodcasts, deletePodcast }
