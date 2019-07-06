import React from 'react';
import './Podcast.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Podcast extends React.Component {

  state = {
    podcast: this.props.location.state,
    episodes: null
  }

  getPodcastEpisodes = async (id) => {
    try {
      var episodes = await axios.get(`http://localhost:5000/podcast/episodes/${id}`);
      var data = await episodes.data
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.setState({ episodes: data })
    }
  }

  podcastHeader = () => {
    const { title, image, description } = this.props.location.state.podcast
    return (
      <div className="podcast-header">
        <div className="podcast-header-profile">
          <img className="podcast-header-profile-image" src={image} alt={title} />
          <div className="podcast-header-details">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

        </div>
      </div>
    )
  }

  renderPodcastEpisodes = (episodes) => {
    return episodes.map((episode, index) => {
      return (
        <div key={index} className="podcast-episodes-card">
          <a className="episode-link" href={episode.link}>{episode.title}</a>
        </div>
      )
    })
  }

  componentDidMount() {
    console.log(this.state)
  }

  render = () => {

    if (!this.state.episodes) {
      this.getPodcastEpisodes(this.props.match.params.id);
      return 'Loading Episodes...';
    } else {
      return (
        <>
          {this.podcastHeader()}
          {this.renderPodcastEpisodes(this.state.episodes)}
        </>
      )
    }
  }
}

export default Podcast;