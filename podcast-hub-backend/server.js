const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');

const database = 'podcast-hub';
const mongoURI = `mongodb://localhost/${database}`;

const podcastRoutes = require('./routes/podcastRoutes');

app.use(cors());
app.use(express.json());

app.use('/', podcastRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
  if(err) console.log(`There has been an ${err}`);
  console.log('Connected to MongoDB');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
