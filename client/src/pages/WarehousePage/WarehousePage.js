import React, { Component } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import axios from "axios";

<<<<<<< HEAD
export default class WarehousePage extends Component {
  state = {
    warehouseList: [],
  };

  render() {
    // return <WarehouseList warehouseList={this.state.warehouseList} />;
    return <h1>Warehouse Page</h1>;
  }
=======
const apiURL = "http://localhost:8080";

export default class WarehousePage extends Component {
	// state = {
	// 	warehouseList: [],
	// };
	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get(`${apiURL}/warehouses`)
			.then(({ data }) => {
				const apiData = data;
				this.setState({ warehouseList: apiData });
				return apiData;
			})
			.catch((err) => console.log("componentDidMount for warehouses", err));
	}

	render() {
		return <h1> Warehouses </h1>;
		// return <WarehouseList warehouseList={this.state.warehouseList} />;
	}
>>>>>>> develop
}
