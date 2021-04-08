import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import axios from './axios'
import Pusher from 'pusher-js'
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import PrivateRoute from "./PrivateRoute";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


function App() {


  

  // useEffect(() => {
  //   const pusher = new Pusher('8a303e31b3106d3f9a47', {
  //     cluster: 'ap2'
  //   });

  //   const channel = pusher.subscribe('messages');
  //   channel.bind('inserted', (newMessage) => {
  //     // alert(JSON.stringify(newMessage));
  //     setMessages([...messages, newMessage])
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };

  // }, [messages])

  // console.log(messages)
  return (
    <div className="app">
      <div className="app_body">
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute path="/rooms/:roomId">
              <Sidebar />
              <Chat/>
            </PrivateRoute>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
            
            <Route path="/">
            </Route>
          </Switch>
          
        </Router>
        </Provider>
      </div>
    </div>
  );
}

export default App;
