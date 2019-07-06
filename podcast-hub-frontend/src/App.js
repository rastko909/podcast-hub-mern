import React from 'react';
import './App.css';
import Routes from './Routes';
import Navigation from './components/Navigation/Navigation';
import axios from 'axios';

// import axios from 'axios';

class App extends React.Component {
  state = {
    adding: false
  }

  validURL = (string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(string);
  }

  addPodcast = () => {
    const url = prompt('Please enter podcast RSS feed: ');
    const valid = this.validURL(url);
    if (url && valid === true) {
      const data = { url: url }
      try {
        axios.post("http://localhost:5000/podcast/add", data);
        this.setState({});
      }
      catch (error) {
        console.log('Error adding podcast:', error);
      }
    }
  }

  async componentDidMount() {
  }

  render() {
    return (
      <>
        <Navigation addPodcast={this.addPodcast} />
        <div className="container">
          <div className="container-inner">
            <Routes />
          </div>

        </div>
      </>
    )
  }
}

export default App;