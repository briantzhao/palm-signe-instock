import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehouseForm from "./components/AddWarehouseForm/AddWarehouseForm";
import EditWarehouseForm from "./components/EditWarehouse/EditWarehouseForm";
// import NotFoundPage from "./pages/NotFoundPage/NotFountPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App__main">
          <Switch>
            <Route path="/" exact component={WarehousePage} />
            <Route path="/inventory/" component={InventoryPage} />
            <Route path="/add" component={AddWarehouseForm} />
            <Route path="/warehouses/:id/edit" component={EditWarehouseForm} />
            {/* <Route path="/notfound/" component={NotFoundPage} /> */}
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
