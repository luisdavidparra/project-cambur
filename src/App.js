import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import InfoMovie from "./components/InfoMovie";
import InfoTv from "./components/InfoTv";
import Navbar from "./components/Navbar";
import InfoPerson from "./components/InfoPerson";
import MyWatchList from "./components/MyWatchList";
import MyWatched from "./components/MyWatched";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/search">
            <Search />
          </PrivateRoute>
          <PrivateRoute path="/info/movie/:id">
            <InfoMovie />
          </PrivateRoute>
          <PrivateRoute path="/info/tv/:id">
            <InfoTv />
          </PrivateRoute>
          <PrivateRoute path="/info/person/:id">
            <InfoPerson />
          </PrivateRoute>
          <PrivateRoute path="/my-to-watch-list">
            <MyWatchList />
          </PrivateRoute>
          <PrivateRoute path="/my-watched">
            <MyWatched />
          </PrivateRoute>
          <PrivateRoute path="/profile/:id">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
