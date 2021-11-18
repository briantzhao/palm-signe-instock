import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
const apiURL = "http://localhost:8080";

export default class InventoryPage extends Component {
  state = {
    inventoryItems: [],
    currentInventory: [],
    modalOpen: false,
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.confirmDelete) {
  //     this.setState({ confirmDelete: false });
  //     axios
  //       .get(`${apiURL}/inventories`)
  //       .then((res) => {
  //         console.log(res.data);
  //         this.setState({ inventoryItems: res.data });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  deleteItem = (item, id) => {
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
          deleteItem={this.deleteItem}
        />
        <Modal isOpen={this.state.modalOpen} ariaHideApp={false}>
          <h1>Delete {this.state.currentInventory.itemName} inventory item?</h1>
          <p>
            Please confirm that you'd like to delete{" "}
            {this.state.currentInventory.itemName} from the inventory list. You
            won't be able to undo this action.
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
              alert(`${this.state.currentInventory.itemName} is deleted.`);

              this.setState({ confirmDelete: true });
              axios
                .delete(
                  `${apiURL}/inventories/${this.state.currentInventory.id}`
                )
                .then((res) => {
                  this.getAPI();
                })
                .catch((err) => console.log(err));

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
