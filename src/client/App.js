/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './redux/actionsLogin';

import Login from './components/containers/Login';
import CreatItem from './components/containers/CreatItem';

import MainApp from './components/containers/MainApp';

class App extends Component {
  render() {
    // console.log(this.props.user.name);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route exact path="/main__app"><MainApp /></Route>
            <Route exact path="/creat__item"><CreatItem /></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  user: state.login,
});

export default connect(
  mapStateToProps,
  { login }
)(App);
