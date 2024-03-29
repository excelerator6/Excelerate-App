import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Dashboard from "../PageComponents/Dashboard/Dashboard";
import InfoPage from "../PageComponents/InfoPage/InfoPage";
import LandingPage from "../PageComponents/LandingPage/LandingPage";
import RegisterPage from "../PageComponents/LoginAndRegisterPages/RegisterPage/RegisterPage";
import XpLogPage from "../PageComponents/XpLogPage/XpLogPage";
import StatsPage from "../PageComponents/StatsPage/StatsPage";
import AchievementsPage from "../PageComponents/AchievementsPage/AchievementsPage";
import AvatarsPage from "../PageComponents/Avatars/AvatarsPage/AvatarsPage"

import AddLogButton from "../ButtonComponents/AddLogComponent/AddLogButton.jsx";
import LevelUpModal from "../ButtonComponents/AddLogComponent/LevelUpPopup/LevelUp.jsx";

//importing to wrap app for the date picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./App.css";
import '../../fonts/AGENCYB.woff';

export default function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />


            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/dashboard will show the Dashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LandingPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LandingPage
              exact
              path="/dashboard"
            >
              <Dashboard />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LandingPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /dashboard page
                <Redirect to="/dashboard" />
              ) : (
                // Otherwise, show the login page
                <LandingPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /dashboard page
                <Redirect to="/dashboard" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /dashboard page
                <Redirect to="/dashboard" />
              ) : (
                // Otherwise, show the LandingPage
                <LandingPage />
              )}
            </Route>

            <ProtectedRoute exact path="/xp-log">
              <XpLogPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/stats-page">
              <StatsPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/dashboard">
              <Dashboard />
            </ProtectedRoute>

            <ProtectedRoute exact path="/achievements">
              <AchievementsPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/avatars-page">
              <AvatarsPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <>
            {// only want the log activity button to show if the user is logged in
              user.id ? <AddLogButton /> : <></>
            }
          </>
          <Footer />
        </div>
      </Router>
    </LocalizationProvider>
  );
}
