import React, { Component } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
// import axios from "axios";

export default class WarehousePage extends Component() {
	state = {
		warehouseList: [],
	};

	render() {
		return <WarehouseList warehouseList={this.state.warehouseList} />;
	}
}
