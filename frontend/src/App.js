import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import LandingPage from "./pages/landing-page/LandingPage";

import "./app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
