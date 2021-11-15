import "./App.scss";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import NotFoundPage from "./pages/NotFoundPage/NotFountPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header"></header>
        <Switch>
          <Route path="/" exact component={WarehousePage} />
          <Route path="/inventory/" component={InventoryPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
