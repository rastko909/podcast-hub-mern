const express = require('express');
const router = express.Router();
const { newPodcast, getAllPodcasts, viewPodcast, seedPodcasts, deletePodcast } = require('../controllers/podcastController');

router.post('/podcast/add', newPodcast);
router.delete('/podcast/delete/:id', deletePodcast);
router.get('/podcast/all', getAllPodcasts);
router.get('/podcast/episodes/:id', viewPodcast);
router.get('/seed', seedPodcasts);

module.exports = router;
