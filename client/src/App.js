import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehouseForm from "./components/AddWarehouseForm/AddWarehouseForm";
import EditInventoryForm from "./components/EditInventoryForm/EditInventoryForm";
import EditWarehouseForm from "./components/EditWarehouse/EditWarehouseForm";
import NotFoundPage from "./pages/NotFoundPage/NotFountPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import WarehouseInventoryList from "./components/WarehouseInventoryList/WarehouseInventoryList";
import AddInventoryItemForm from "./components/AddInventoryItemForm/AddInventoryItemForm";
import InventoryDetail from "./components/InventoryDetail/InventoryDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App__main">
          <Switch>
            <Route path="/warehouses/" exact component={WarehousePage} />
            <Route path="/inventory/" exact component={InventoryPage} />
            <Route path="/warehouses/add" component={AddWarehouseForm} />
            <Route path="/warehouses/:id/edit" component={EditWarehouseForm} />
            <Route
              path="/warehouses/:id/inventory"
              component={WarehouseInventoryList}
            />
            <Route path="/inventory/add" component={AddInventoryItemForm} />
            <Route path="/inventory/:id" exact component={InventoryDetail} />
            <Route path="/inventory/:id/edit" component={EditInventoryForm} />

            <Route exact path="/">
              <Redirect to="/warehouses/" />
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
