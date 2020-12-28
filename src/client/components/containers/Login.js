import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import login from '../../redux/actionsLogin';
import './login.css';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.user.name,
      password: this.props.user.password,
    };
  }

  updateInput = (input) => {
    this.setState({ input });
  };

  updatePassword = (password) => {
    this.setState({ password });
  };

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  login = (input, password, massage) => {
    this.props.login(input, password);
    if (massage === '') {
      document.querySelector('.link').click();
    }
  };

  render() {
    const { user } = this.props;
    const { input, showPassword, password } = this.state;
    // console.log(user);
    return (
      <div className="form__wrap__login">
        <TextField
          id="standard-basic"
          label="Email"
          className="isValidEmail"
          onChange={e => this.updateInput(e.target.value)}
          value={input}
        />
        <FormControl>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            style={{ width: '165px' }}
            id="standard-basic"
            type={showPassword ? 'text' : 'password'}
            value={password}
            label="Password"
            className="isValidPassword"
            onChange={e => this.updatePassword(e.target.value)}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  // aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        <span
          className="failInput"
        >
          {user.massage}
        </span>
        <Button
          variant="contained"
          onClick={() => this.login(input, password, user.massage)}
          disabled={
            !input
            || !password
          }
        >
          Enter
        </Button>
        <Link className="link" to="/main__app" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
