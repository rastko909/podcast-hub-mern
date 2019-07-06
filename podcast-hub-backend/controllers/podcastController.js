const Podcast = require('../models/Podcast')
const axios = require('axios');
const fetch = require('node-fetch')
let Parser = require('rss-parser');
let parser = new Parser();

const viewPodcast = async (request, response) => {
}

const newPodcast = async (request, response) => {
  const { url } = await request.body
  try {
    podcast = await Podcast.create({ url })
    response.status(201).send(`Successfully added podcast URL: ${url}`)
  }
  catch (error) {
    response.status(400).send(`There has been an error ${error}`)
  }
}

const getAllPodcasts = async (request, response) => {
  // notes to self: 
  // avoid using asyncs within asyncs, eg. using a map or forEach with async here because it caused promise hell
  const podcasts = await Podcast.find();
  let podcastData = [];
  for (let podcast of podcasts) {
    let feed = await parser.parseURL(podcast.url);
    podcastData.push({
      title: feed.title,
      description: feed.description,
      image: feed.image.url
    });
  }
  response.status(200).send(podcastData);
}

const seedPodcasts = async (request, response) => {
  const urls = ['https://rss.acast.com/aunty-donna-podcast', 'tigerbelly.libsyn.com/rss']
  await Podcast.deleteMany()
  try {
    urls.forEach((podcast) => {
      Podcast.insert({ url: podcast });
    })
    response.status(200).send('Added Podcasts to Database.');
  } catch (error) {
    response.status(400).send('Error:', error);
  }

}

module.exports = { newPodcast, getAllPodcasts, viewPodcast, seedPodcasts }
