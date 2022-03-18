import React, { Component } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import axios from "axios";
import { API_URL } from "../../config";

export default class WarehousePage extends Component {
  state = {
    modalOpen: false,
    warehouseList: [],
    currentWarehouse: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`${API_URL}/warehouses`)
      .then(({ data }) => {
        const apiData = data;
        this.setState({ warehouseList: apiData });
        return apiData;
      })
      .catch((err) => console.log("componentDidMount for warehouses", err));
  }

  hideModal = () => {
    return this.setState({ modalOpen: false });
  };

  deleteItem = () => {
    axios
      .delete(`${API_URL}/warehouses/${this.state.currentWarehouse.id}`)
      .then((res) => {
        axios
          .get(`${API_URL}/warehouses`)
          .then(({ data }) => {
            const apiData = data;
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
    if (!this.state.warehouseList) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
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
