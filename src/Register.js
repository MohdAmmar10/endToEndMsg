import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import RegisterBanner from './Assets/registerBanner.svg'
import './Register.css'; 

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      name: "",
      email: "",
      phno: "",
      password: "",
      password2: "",
      showPassword: false,
      showPassword2: false,
      errors: {}
    };
  }


  componentWillReceiveProps(nextProps) {
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
  handleClickShowPassword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };

  handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
// onChangeUser = e => {
//     this.setState({ username: e.target.value });
//   };
//   onChangePass = e => {
//     this.setState({ password: e.target.value });
//   };

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      phno: this.state.phno,
      password: this.state.password,
      password2: this.state.password2
    };
console.log(newUser);
this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="text-center">
          <h1 className="title">CRYPTONO</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 register-left">
            <img alt="Regsiter Banner" className="register-banner" src={RegisterBanner}></img>
          </div>
          <div className="col-12 col-md-4 register-right">
            <h1 className="register-label">Register</h1>
            <div>
              <h6>
                Already have an account? <Link className="link" to="/login">Login</Link>
              </h6>
            </div>
            <form noValidate onSubmit={this.onSubmit}>    
              <div className="register-inputs register-user">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username">Username</label>
                <span>{errors.username}</span> */}
                <InputLabel className="login-ip-label" htmlFor="username">Username</InputLabel>
                <Input
                  // id="standard-adornment-username"
                  type='text'
                  fullWidth={true}
                  id="username"
                  onChange={this.onChange}
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
              <div className="register-inputs">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span >{errors.name}</span> */}
                <InputLabel className="login-ip-label" htmlFor="name">Name</InputLabel>
                <Input
                  // id="standard-adornment-name"
                  type='text'
                  id="name"
                  fullWidth={true}
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  style={{fontSize:18}}
                  className={classnames("", {
                    invalid: errors.name
                  })}
                  helperText={errors.name}
                />
                <span className="login-error">
                  {errors.name}
                </span>
              </div>
              <div className="register-inputs">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span>{errors.email}</span> */}

                <InputLabel className="login-ip-label" htmlFor="email">Email</InputLabel>
                <Input
                  // id="standard-adornment-email"
                  type='email'
                  id="email"
                  fullWidth={true}
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  style={{fontSize:18}}
                  className={classnames("", {
                    invalid: errors.email
                  })}
                  helperText={errors.email}
                />
                <span className="login-error">
                  {errors.email}
                </span>
              </div>
              <div className="register-inputs">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.phno}
                  error={errors.phno}
                  id="phno"
                  type="number"
                  className={classnames("", {
                    invalid: errors.phno
                  })}
                />
                <label htmlFor="phno">Phone Number</label>
                <span >{errors.phno}</span> */}
                
                <InputLabel className="login-ip-label" htmlFor="phno">Phone Number</InputLabel>
                <Input
                  // id="standard-adornment-no"
                  type='number'
                  id="phno"
                  fullWidth={true}
                  onChange={this.onChange}
                  value={this.state.phno}
                  error={errors.phno}
                  style={{fontSize:18}}
                  className={classnames("", {
                    invalid: errors.phno
                  })}
                  helperText={errors.phno}
                />
                <span className="login-error">
                  {errors.phno}
                </span>

              </div>
              <div className="register-inputs">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span>{errors.password}</span> */}

                <InputLabel className="login-ip-label" htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password }
                  fullWidth={true}
                  style={{fontSize:18}}
                  className={classnames("", {
                    invalid: errors.password
                  })}
                  helperText={errors.password}
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
                </span>
              </div>
              <div className="register-inputs">
                {/* <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span>{errors.password2}</span> */}

                <InputLabel className="login-ip-label" htmlFor="standard-adornment-password2">Confirm Password</InputLabel>
                <Input
                  // id="standard-adornment-password"
                  id="password2"
                  type={this.state.showPassword2 ? 'text' : 'password'}
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2 }
                  fullWidth={true}
                  style={{fontSize:18}}
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                  helperText={errors.password2}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword2}
                        onMouseDown={this.handleMouseDownPassword2}
                      >
                        {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  />
                <span className="login-error">
                  {errors.password2}
                </span>
              </div>
              <div className="register-btn-container">
                <button
                  className="register-btn"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));