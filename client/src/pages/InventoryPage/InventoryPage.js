import React, { Component } from "react";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
const apiURL = "http://localhost:8080";

export default class InventoryPage extends Component {
  state = {
    inventoryItems: [],
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

  render() {
    return (
      <>
        <InventoryList inventoryItems={this.state.inventoryItems} />
      </>
    );
  }
}
