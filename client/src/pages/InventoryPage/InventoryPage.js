import React, { Component } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://palm-instock-api.herokuapp.com"
    : "http://localhost:8080";

export default class InventoryPage extends Component {
  state = {
    modalOpen: false,
    inventoryItems: [],
    currentInventory: [],
  };

  getAPI = () => {
    axios
      .get(`${apiURL}/inventories`)
      .then((res) => {
        console.log(res.data);
        this.setState({ inventoryItems: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAPI();
  }

  hideModal = () => {
    return this.setState({ modalOpen: false });
  };

  deleteItem = () => {
    axios
      .delete(`${apiURL}/inventories/${this.state.currentInventory.id}`)
      .then((res) => {
        this.getAPI();
      })
      .catch((err) => console.log(err));
  };

  getItem = (item, id) => {
    const foundItem = this.state.inventoryItems.find((item) => item.id === id);
    this.setState({ currentInventory: foundItem });
    this.setState({ modalOpen: true });
  };

  render() {
    if (!this.state.inventoryItems && !this.state.modalOpen) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <InventoryList
          inventoryItems={this.state.inventoryItems}
          getItem={this.getItem}
        />

        <DeleteModal
          page="inventory item"
          pageList="inventory list"
          currentItems={this.state.currentInventory.itemName}
          modalState={this.state.modalOpen}
          onRequestClose
          deleteItem={this.deleteItem}
          hideModal={this.hideModal}
        />
      </>
    );
  }
}
