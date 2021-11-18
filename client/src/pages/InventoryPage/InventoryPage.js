import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
const apiURL = "http://localhost:8080";

export default class InventoryPage extends Component {
  state = {
    inventoryItems: [],
    modalOpen: false,
    confirmDelete: null,
    item: null,
  };

  openWarning = (item) => {
    this.setState({ item: item });
    this.setState({ modalOpen: true });
  };

  componentDidMount() {
    console.log(apiURL);

    axios
      .get(`${apiURL}/inventories`)
      .then((res) => {
        console.log(res.data);
        this.setState({ inventoryItems: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // this.setState({ modalOpen: true });
  }

  render() {
    if (!this.state.inventoryItems && !this.state.modalOpen) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <InventoryList
          inventoryItems={this.state.inventoryItems}
          openWarning={this.openWarning}
        />
        <Modal isOpen={this.state.modalOpen} ariaHideApp={false}>
          <h1>Delete {this.state.item} inventory item?</h1>
          <p>
            Please confirm that you'd like to delete
            {this.state.item} from the inventory list. You won't be able to undo
            this action.
          </p>
          <button
            onClick={() => {
              this.setState({ modalOpen: false });
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("deleted");
              alert(`${this.state.item} is deleted.`);
              this.setState({ modalOpen: false });
            }}
          >
            Delete
          </button>
        </Modal>
      </>
    );
  }
}
