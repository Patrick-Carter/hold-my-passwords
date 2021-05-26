import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"></Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
