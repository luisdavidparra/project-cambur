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
import SignUp from "./components/SignUp";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/info/movie/:id">
            <InfoMovie />
          </Route>
          <Route path="/info/tv/:id">
            <InfoTv />
          </Route>
          <Route path="/info/person/:id">
            <InfoPerson />
          </Route>
          <Route path="/my-to-watch-list">
            <MyWatchList />
          </Route>
          <Route path="/my-watched">
            <MyWatched />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
