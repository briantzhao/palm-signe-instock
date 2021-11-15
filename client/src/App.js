import "./App.scss";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header"></header>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/inventory/" component={Inventory} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
