import React, { Component } from "react";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import axios from "axios";

<<<<<<< HEAD
const apiURL = "http://localhost:8080";

export default class WarehousePage extends Component {
  // state = {
  // 	warehouseList: [],
  // };
  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   axios
  //     .get(`${apiURL}/warehouses`)
  //     .then(({ data }) => {
  //       const apiData = data;
  //       this.setState({ warehouseList: apiData });
  //       return apiData;
  //     })
  //     .catch((err) => console.log("componentDidMount for warehouses", err));
  // }

  render() {
    return <h1> Warehouses </h1>;
    // return <WarehouseList warehouseList={this.state.warehouseList} />;
=======
export default class WarehousePage extends Component {
  state = {
    // hardcoded to avoid axios call for now, change back to empty array
    warehouseList: [
      {
        id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
        name: "Manhattan",
        address: "503 Broadway",
        city: "New York",
        country: "USA",
        contact: {
          name: "Parmin Aujla",
          position: "Warehouse Manager",
          phone: "+1 (646) 123-1234",
          email: "paujla@instock.com",
        },
      },
    ],
  };

  render() {
    return (
      <>
        <WarehouseList warehouseList={this.state.warehouseList} />
      </>
    );
>>>>>>> main
  }
}
