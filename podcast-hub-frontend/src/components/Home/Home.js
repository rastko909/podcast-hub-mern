import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  renderPodcastCards = (podcasts) => {
    return podcasts.map((podcast, index) => {
      return (
        <div key={index} className="podcast-card">
          <div className="podcast-title">
            {podcast.title}
            <div className="podcast-actions">
              <Link className="podcast-action-item blue podcast-link"
                to={{
                  pathname: `/podcast/${podcast._id}`,
                  state: {
                    podcast
                  }
                }}>
                <i className="fas fa-list-alt"></i>
              </Link>
              <Link className="podcast-action-item podcast-link red" to="#" onClick={() => { this.props.deletePodcast(podcast._id) }}>
                <i className="fas fa-trash-alt"></i>
              </Link>
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

  render = () => {
    const { podcasts } = this.props;
    if (!podcasts) {
      return 'Loading Podcasts...';
    } else {
      const podcastList = this.renderPodcastCards(podcasts);
      return (
        <>
          {podcastList}
        </>
      )
    }
  }
}

export default Home;