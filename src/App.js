import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Photos from "./components/Photos";
import Docs from "./components/Docs";
import Audios from "./components/Audios";
import Videos from "./components/Videos";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Homepage from './components/Homepage';
import Profile from './components/Profile';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          })
        );
      }
    });
  }, []);

  const user = useSelector(selectUser);

  return (
    <div className="app">
      <Router>


        {!user ? (
          <Login />
        ) : (
            <>
              <Navbar />
              <Switch>
                <Route exact path="/photos">
                  <Photos />
                </Route>
                <Route exact path="/docs">
                  <Docs />
                </Route>
                <Route exact path="/audios">
                  <Audios />
                </Route>
                <Route exact path="/videos">
                  <Videos />
                </Route>
                <Route exact path="/upload">
                  <Upload />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route path="/">
                  <Homepage />
                </Route>
              </Switch>
            </>
          )}
      </Router>

    </div>
  );
}

export default App;
