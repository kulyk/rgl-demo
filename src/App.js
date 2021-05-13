import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Grid from "./Grid";

const routes = [
  { path: "/", name: "Simple" },
  { path: "/cancel-drag", name: "Cancel Drag" },
  { path: "/wrapped-drag", name: "Wrapped Drag" },
];

function NavBar() {
  const { pathname } = useLocation();
  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              className={route.path === pathname ? "active" : ""}
              to={route.path}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/">
            <Grid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
