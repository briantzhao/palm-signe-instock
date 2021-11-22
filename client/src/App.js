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
import WarehouseInventoryList from "./components/WarehouseInventoryList/WarehouseInventoryList";
import AddInventoryItemForm from "./components/AddInventoryItemForm/AddInventoryItemForm";
import InventoryDetail from "./components/InventoryDetail/InventoryDetail";

function App() {
<<<<<<< HEAD
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
						<Route path="/inventories/:id" component={InventoryDetail} />
						{/* <Route path="/notfound/" component={NotFoundPage} /> */}
					</Switch>
				</main>
				<Footer />
			</Router>
		</div>
	);
=======
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App__main">
          <Switch>
            <Route path="/" exact component={WarehousePage} />
            <Route path="/inventory/" exact component={InventoryPage} />
            <Route path="/add" component={AddWarehouseForm} />
            <Route path="/warehouses/:id/edit" component={EditWarehouseForm} />
            <Route path="/:id/inventory" component={WarehouseInventoryList} />
            <Route path="/inventory/add" component={AddInventoryItemForm} />
            {/* <Route path="/notfound/" component={NotFoundPage} /> */}
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
>>>>>>> develop
}

export default App;
