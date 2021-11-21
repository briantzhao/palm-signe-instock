import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehouseForm from "./components/AddWarehouseForm/AddWarehouseForm";
// import NotFoundPage from "./pages/NotFoundPage/NotFountPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import WarehouseInventoryList from "./components/WarehouseInventoryList/WarehouseInventoryList";
import AddInventoryItemForm from "./components/AddInventoryItemForm/AddInventoryItemForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App__main">
          <Switch>
            <Route path="/" exact component={WarehousePage} />
            <Route path="/inventory/" exact component={InventoryPage} />
            <Route path="/add" component={AddWarehouseForm} />
            <Route path="/:id/inventory" component={WarehouseInventoryList} />
            <Route path="/inventory/add" component={AddInventoryItemForm} />
            {/* <Route path="/notfound/" component={NotFoundPage} /> */}
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
