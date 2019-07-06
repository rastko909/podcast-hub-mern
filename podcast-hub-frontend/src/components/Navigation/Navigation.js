import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

class Navigation extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <>
        <nav className="navigation sticky">
          <div className="navigation-inner">
            <div className="logo">
              <h1>Podcast Hub <i className="fas fa-microphone-alt logo-icon"></i> </h1>
            </div>
            <div className="link-container">
              <Link to="#" className="navigation-button" onClick={this.props.addPodcast}>Add Podcast</Link>
              <Link to="login" className="navigation-button">Login / Register</Link>
            </div>
          </div>
        </nav>
      </>
    )

  }
}

export default Navigation;