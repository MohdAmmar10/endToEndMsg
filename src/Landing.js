import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import './Landing.css';
import LOGO from './Assets/Logo.svg'
import SECURE from './Assets/Secure.svg'
import SOCIAL from './Assets/Social.svg'
import SYNCED from './Assets/Sync.svg'
import {Link} from 'react-router-dom'

function Landing(props) {
      
    return (
        <div>
            <div classNameName="header">
                <nav id="mainNavbar" className="navbar navbar-dark navbar-expand-md py-1 fixed-top">
                    <div className="container">
                        <img src={LOGO} className="logo-img" alt="logo"></img>
                        <span className="navbar-brand" >CRYPTONO</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="basicExampleNav">
                            <ul className="navbar-nav ml-auto smooth-scroll">
                                <li className="nav-item">
                                    <a className="nav-link" href="#intro">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#about-us">About Us</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto h-buttons nav-flex-icons">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link"><button type="button" className="btn btn-log">Login</button></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link"><button type="button" className="btn btn-sign">Register</button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id="intro" className="view">
                    <div className="mask rgba-black-strong">

                        <div className="container-fluid d-flex align-items-center justify-content-center h-100">

                            <div className="row d-flex justify-content-center text-center">

                                <div className="col-md-12 main-title">

                                    <h1 className="display-4 main-head-title white-text pt-5 mb-2">Welcome to Cryptono</h1>

                                    <hr className="hr-light"/>

                                    <h3  className="white-text my-4">Empowering Safe Communication</h3>
                                    
                                </div>
                            </div>
                        </div><span id="features"></span>
                    </div>
                </div>
            </div>

            <div className="mt-5" >
                <div className="container">
                    <section className="text-center">
                        <h1 className="mb-2 font-weight-bold">Why to use Cryptono?</h1>
                        <div className="row d-flex justify-content-center mb-4">
                            <div className="col-md-8">

                                <h5 className="grey-text">Explore below to see why Cryptono is a simple, powerful, and secure messenger</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <img src={SECURE} alt="secure"></img>

                                <h4 className="my-4 font-weight-bold">Secure</h4>
                                <p className="grey-text">Cryptono is Simple and Secure and keeps your messages safe from attacks using End to End Encryption</p>
                            </div>
                            <div className="col-md-4 mb-1">
                                <img src={SOCIAL} alt="social"></img>
                                <h4 className="my-4 font-weight-bold">Social</h4>
                                <p className="grey-text">Cryptono allows unlimited number of friends and groups and has no limit on the size of the chats.</p>
                            </div>
                            <div className="col-md-4 mb-1">
                                <img src={SYNCED} alt="synced"></img>
                                <h4 className="my-4 font-weight-bold">Synced</h4>
                                <p className="grey-text">Cryptono delivers messages fast in realtime and lets you access your chats from multiple devices.</p>
                            </div>
                        </div>
                    </section>
                    <hr className="my-5"/>

                    <section id="about-us">
                        <h2 className="mb-3 font-weight-bold text-center">About Us</h2>
                        <div className="row text-center">
                            <div className="col-md-12 about-desc" >
                                <h3 className="mb-3">Cryptono</h3>
                                <p>This web application was first created by the students of K.J. Somaiya College of Engineering as part of a mini project under the guidance of faculty of IT Department in the academic year 2020-2021.</p>

                                <p>We at Cryptono promote and empower safe and secure communication for all our users and stand by the ideaology that our user's privacy is of utmost importance and our prime goal.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-5"/>
        
                </div>
            </div>
        </div>
    )
}
Landing.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Landing);