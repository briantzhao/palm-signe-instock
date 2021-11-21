import React, { Component } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import axios from "axios";
const apiURL = "http://localhost:8080";

export default class WarehousePage extends Component {
  state = {
    modalOpen: false,
    warehouseList: [],
    currentWarehouse: [],
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

  hideModal = () => {
    return this.setState({ modalOpen: false });
  };

  deleteItem = () => {
    console.log(this.state.currentWarehouse.id);
    axios
      .delete(`${apiURL}/warehouses/${this.state.currentWarehouse.id}`)
      .then((res) => {
        axios
          .get(`${apiURL}/warehouses`)
          .then(({ data }) => {
            const apiData = data;
            console.log(apiData[0]);
            this.setState({ warehouseList: apiData });
            return apiData;
          })
          .catch((err) => console.log("componentDidMount for warehouses", err));
      })
      .catch((err) => console.log(err));
  };

  getItem = (id) => {
    const foundItem = this.state.warehouseList.find((item) => item.id === id);
    this.setState({ currentWarehouse: foundItem });
    this.setState({ modalOpen: true });
  };

  render() {
    if (!this.state.warehouseList && !this.state.modalOpen) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        {console.log(this.state.currentWarehouse)}
        <WarehouseList
          warehouseList={this.state.warehouseList}
          getItem={this.getItem}
        />
        <DeleteModal
          page="warehouse"
          pageList="list of warehouses"
          currentItems={this.state.currentWarehouse.name}
          modalState={this.state.modalOpen}
          onRequestClose
          deleteItem={this.deleteItem}
          hideModal={this.hideModal}
        />
      </>
    );
  }
}
