import React from 'react';
import './Podcast.css';
import axios from 'axios';
import innerText from 'react-innertext';
// import { Link } from 'react-router-dom';

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
    console.log(this.props.location.state.podcast)
    const { title, image, description, categories } = this.props.location.state.podcast
    return (
      <div className="podcast-header">
        <div className="podcast-header-profile">
          <img className="podcast-header-profile-image" src={image} alt={title} />
          <div className="podcast-header-details">
            <div className="podcast-header-title">
              <h1>{title}</h1>
            </div>
            <div className="podcast-header-description">
              <p className="desc">{innerText(description)}</p>
              <p className="categories desc">
                {categories.map((category, index) => {
                  return (
                    <span key={index} className="category"><strong> #{category}</strong></span>
                  )
                })}
              </p>
            </div>
          </div>

        </div>
      </div>
    )
  }

  renderPodcastEpisodes = (episodes) => {
    return episodes.map((episode, index) => {
      return (
        <div key={index} className="podcast-episodes-card">

          <div className="episode-link-container">
            <a className="episode-link" href={episode.link}>{episode.title}</a>
          </div>
          <div className="episode-link-buttons">
            <div className="play-button">
              <i className="fas fa-play-circle"></i>
            </div>
            <div className="download-button">
              <i className="fas fa-arrow-alt-circle-down"></i>
            </div>
            <div className="love-button">
            <i className="fas fa-heart"></i>
            </div>
          </div>
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