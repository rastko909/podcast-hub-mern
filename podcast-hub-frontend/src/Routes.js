import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'

class Routes extends React.Component {
  render() {
    // const { countriesList, authentication } = this.props
    return (
      <Switch>

        {/* <Route path="/podcast/:name" component={Podcast} /> */}

        <Route path="/" render={() => {
          return <Home />
        }} />

        {/* <Route path="/list" render={() => {
          return <List countriesList={countriesList} authentication={authentication} />
        }} /> */}


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