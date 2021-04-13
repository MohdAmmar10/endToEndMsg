import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
import classnames from "classnames";
import { withRouter } from 'react-router';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import LoginBanner from './Assets/loginBanner.jpg'
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errors: {}
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      console.log("done");
      console.log(this.props);
      this.props.history.push("/rooms/welcome"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
onChangeUser = e => {
    this.setState({ username: e.target.value });
  };
  onChangePass = e => {
    this.setState({ password: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      username: this.state.username,
      password: this.state.password
    };
console.log(userData);
this.props.loginUser(userData);
  };
render() {
    const { errors } = this.state;
return (
      <div className="container fulls">

        <div className="text-center">
          <h1 className="title">CRYPTONO</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 login-left">
            <img alt="Login Banner" className="login-banner" src={LoginBanner}></img>
          </div>
          <div className="col-12 col-md-4 login-right">
            <h1 className="login-label">Login</h1>
            {/* <Link to="/">
              Home
            </Link> */}
            <div>
              <h6>
                Don't have an account? <Link className="link" to="/register">Register</Link>
              </h6>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="login-inputs login-user">
              <InputLabel className="login-ip-label" htmlFor="standard-adornment-username">Username</InputLabel>
              <Input
                id="standard-adornment-username"
                type='text'
                fullWidth={true}
                onChange={this.onChangeUser}
                value={this.state.username}
                error={errors.username || errors.usernamenotfound}
                style={{fontSize:18}}
                className={classnames("", {
                  invalid: errors.username || errors.usernamenotfound
                })}
                helperText={errors.username || errors.usernamenotfound }
              />
              <span className="login-error">
                {errors.username}
                {errors.usernamenotfound}
              </span>
            </div>
            <div className="login-inputs login-pass">

              {/* <TextField
                onChange={this.onChangeUser}
                value={this.state.username}
                error={errors.username}
                id="standard-error-helper-text"
                label="Username"
                className={classnames("", {
                  invalid: errors.username || errors.usernamenotfound
                })}
                helperText={errors.username || errors.usernamenotfound }
              /> */}
              {/* <TextField
                onChange={this.onChangePass}
                  value={this.state.password}
                  error={errors.password}
                  label="Password"
                id="standard-error-helper-text"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
                helperText={errors.password || errors.passwordincorrect}
              /> */}

            <InputLabel className="login-ip-label" htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.onChangePass}
              value={this.state.password}
              error={errors.password || errors.passwordincorrect}
              fullWidth={true}
              style={{fontSize:18}}
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
              helperText={errors.password || errors.passwordincorrect}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              />
            <span className="login-error">
                 {errors.password}
                 {errors.passwordincorrect}
              </span>
                {/* //   onChange={this.onChange}
                //   value={this.state.username}
                //   error={errors.username}
                //   id="username"
                //   type="text"
                //   className={classnames("", {
                //     invalid: errors.username || errors.usernamenotfound
                //   })}
                // />
                // <label htmlFor="username">Username</label>
                // <span>
                //   {errors.username}
                //   {errors.usernamenotfound}
                // </span> */ }
                
              </div>
              {/* <div>
                 <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span >
                  {errors.password}
                  {errors.passwordincorrect}
                </span> 
              </div> */}
              <div className="login-btn-container">
                <button
                  type="submit"
                  className="login-btn"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(withRouter(Login));