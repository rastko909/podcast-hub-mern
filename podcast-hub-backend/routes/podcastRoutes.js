const express = require('express')
const router = express.Router()
const { newPodcast, getAllPodcasts, viewPodcast, seedPodcasts } = require('../controllers/podcastController')

router.post('/podcast/add', newPodcast)

router.get('/podcast/all', getAllPodcasts)

router.get('/podcast/:name', viewPodcast)

router.get('/podcast/seed', seedPodcasts)

module.exports = router
