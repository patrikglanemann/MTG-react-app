import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import CardListPage from "./pages/CardListPage";
import DetailCardPage from "./pages/DetailCardPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="Header">
          <h1>MTG Card Search</h1>
          <nav className="Header__navbar">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/cards">Cards</NavLink>
          </nav>
        </header>
        <main className="Content">
          <Switch>
            <Route path="/cards/:id">
              <DetailCardPage />
            </Route>
            <Route path="/cards">
              <CardListPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
