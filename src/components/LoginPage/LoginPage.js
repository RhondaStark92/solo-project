import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

// const Title = styled.h1`
//   text-transform: uppercase;  
//   text-align: center;
// `;

const Wrapper = styled.section`
  text-align: center;
`;

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Wrapper>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <Typography variant="h4">Login</Typography>
          <div>
          <TextField
          name="username"
          id="outlined-name"
          placeholder="User Name"
          value={this.state.username}
          margin="normal"
          variant="outlined"
          onChange={this.handleInputChangeFor('username')}
          />
          </div>
          <div>
            <TextField
              name="password"
              id="outlined-password"
              placeholder="Password"
              value={this.state.password}
              type="password"
              margin="normal"
              variant="outlined"
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <Button
            type="button"
            // variant="contained"
            color="primary"
            // className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </Wrapper>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
