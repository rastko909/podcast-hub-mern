import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Home.css';
// import { homedir } from 'os';

class Home extends React.Component {

  state = { podcasts: null }

  getAllPodcasts = async () => {
    try {
      const podcasts = await axios.get('http://localhost:5000/podcast/all');
      const data = await podcasts.data
      console.log(data)
      if (data) {
        this.setState({ podcasts: data })
      }
    }
    catch (error) {
      console.log('error', error)
    }
  }

  renderPodcastCards = (podcasts) => {
    return podcasts.map((podcast, index) => {
      return (
        <div key={index} className="podcast-card">
          <div className="podcast-title">
            {podcast.title}
            <div className="podcast-actions">
              <Link className="podcast-action-item blue" to={`/podcast/${podcast.title}`}>
                <i className="fas fa-list-alt"></i>
              </Link>
              <i className="fas fa-trash-alt podcast-action-item red"></i>
            </div>

          </div>
          <div className="podcast-image-container">
            <img className="podcast-image" src={podcast.image} alt={podcast.title} />
          </div>
          <div className="podcast-description">
            {podcast.description}
          </div>
        </div>
      )
    })
  }

  componentDidMount() {
    this.getAllPodcasts();
  }

  render = () => {
    const { podcasts } = this.state
    if (!podcasts) {
      return 'Loading Podcasts...'
    } else {
      const podcastList = this.renderPodcastCards(podcasts)
      return (
        <>
          {podcastList}
        </>
      )
    }
  }
}

export default Home;