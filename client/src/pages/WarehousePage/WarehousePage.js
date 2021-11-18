import React, { Component } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import axios from "axios";

const apiURL = "http://localhost:8080";

export default class WarehousePage extends Component {
	state = {
		warehouseList: [],
	};
	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get(`${apiURL}/warehouses`)
			.then(({ data }) => {
				const apiData = data;
				console.log(apiData[0]);
				this.setState({ warehouseList: apiData });
				return apiData;
			})
			.catch((err) => console.log("componentDidMount for warehouses", err));
	}

	render() {
		// return <h1> Warehouses </h1>;
		return <WarehouseList warehouseList={this.state.warehouseList} />;
	}
}
