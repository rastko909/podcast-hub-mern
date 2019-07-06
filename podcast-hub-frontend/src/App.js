import React from 'react';
import './App.css';
import Routes from './Routes';
import Navigation from './components/Navigation/Navigation';
import axios from 'axios';

// import axios from 'axios';

class App extends React.Component {
  state = {
    podcasts: null
  }

  validURL = (string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(string);
  }

  addPodcast = async () => {
    const url = prompt('Please enter podcast RSS feed: ');
    const valid = this.validURL(url);
    if (url && valid === true) {
      const data = { url: url }
      try {
        await axios.post("http://localhost:5000/podcast/add", data);
      }
      catch (error) {
        console.log('Error adding podcast:', error);
      }
      finally {
        this.getAllPodcasts();
      }
    }
  }

  deletePodcast = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/podcast/delete/${id}`);
    }
    catch (error) {
      console.log('Error deleting podcast: ', error);
    }
    finally {
      this.getAllPodcasts();
    }
  }

  getAllPodcasts = async () => {
    try {
      const podcasts = await axios.get('http://localhost:5000/podcast/all');
      const data = await podcasts.data
      if (data) {
        this.setState({ podcasts: data })
      }
    }
    catch (error) {
      console.log('error', error)
    }
  }

  componentDidMount() {
    this.getAllPodcasts();
  }

  render() {
    const { podcasts } = this.state
    if (!podcasts) {
      return (
        <>
          Loading...
        </>
      )
    } else {
      return (
        <>
          <Navigation addPodcast={this.addPodcast} />
          <div className="container">
            <div className="container-inner">
              <Routes podcasts={this.state.podcasts} deletePodcast={this.deletePodcast} />
            </div>
          </div>
        </>
      )
    }
  }
}

export default App;