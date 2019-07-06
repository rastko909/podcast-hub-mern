import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Podcast from './components/Podcast/Podcast';

class Routes extends React.Component {
  render() {
    const { podcasts, deletePodcast } = this.props
    return (
      <Switch>
      
        <Route path="/podcast/:id" component={Podcast} />

        <Route path="/" render={() => {
          return <Home podcasts={podcasts} deletePodcast={deletePodcast} />
        }} />



        {/* <Route path="/register" render={() => {
          return <Register register={this.props.register} authentication={authentication} />
        }} /> */}

        {/* <Route path="/login" render={() => {
          return <Login login={this.props.login} authentication={authentication} />
        }} /> */}

        {/* <Route path="/search" /> */}
      </Switch>
    )
  }
}

export default Routes;