import "./App.scss";
import Header from "./components/Header/Header";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehouseForm from "./components/AddWarehouseForm/AddWarehouseForm";
// import NotFoundPage from "./pages/NotFoundPage/NotFountPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import WarehouseInventoryList from "./components/WarehouseInventoryList/WarehouseInventoryList";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={WarehousePage} />
          <Route path="/inventory/" component={InventoryPage} />
          <Route path="/add" component={AddWarehouseForm} />
          <Route path="/:id/inventory" component={WarehouseInventoryList} />
          {/* <Route path="/notfound/" component={NotFoundPage} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
