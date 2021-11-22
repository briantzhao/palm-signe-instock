import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";
import "./EditInventoryForm.scss";

export default class EditInventoryForm extends Component {
  state = {
    itemName: "",
    description: "",
    category: "",
    status: null,
    quantity: NaN,
    warehouseName: "",
  };

  // get warehouses from warehouse ID
  // /warehouse/:warehouseID/inventory/:inventoryID
  // ^ endpoint that i created in App.js

  // to GET all inventory from one warehouse:
  // /inventories/warehouses/:warehouseID

  // to GET individual inventory item data:
  // /inventories/:inventoryID

  // SO, what I need to do is:
  // GET request to /inventories/:inventoryID
  componentDidMount() {
    axios
      .get("http://localhost:8080/inventories")
      .then((response) => {
        let foundId = response.data.find((inventory) => {
          return inventory.id === this.props.match.params.id;
        });
        console.log(this.props.match.params.id);
        console.log(foundId.id);
        return axios
          .get(`http://localhost:8080/inventories/${foundId.id}`)
          .then((response) => {
            console.log(response.data);
            const {
              warehouseName,
              itemName,
              description,
              category,
              status,
              quantity,
            } = response.data;
            // console.log(response.data.itemName);
            this.setState({
              warehouseName,
              itemName,
              description,
              category,
              status,
              quantity,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleStatus = (event) => {
    // if in stock, return this.state status === true
    // if out of stock, state of status === false

    // if state of status === "out of stock"
    // do not display quantity bar
    // true = in stock; false = out of stock
    let enteredQuantity = Number(event.target.value);
    this.setState({ quantity: this.enteredQuantity });

    if (enteredQuantity > 0) {
      this.setState({ status: "In Stock" });
    } else if (enteredQuantity === 0) {
      this.setState({ status: "Out of Stock" });
    }

    if (this.state.status === "In Stock") {
      console.log("In Stock");
    } else {
      console.log("Out of Stock");
    }

    console.log(this.state.status);
    console.log(event.target.value);
    return;
  };

  // if status = false
  // do not display quantity bar

  // foundWarehouse = (event) => {
  //   axios.get("/inventories").then((response) => {
  //     let warehouses = response.data.find((warehouse) => {
  //       return warehouse.id === this.props.match.params.id;
  // console.log(warehouse.id);
  // console.log(this.props.match.params.id);
  // });
  // console.log(warehouses.warehouseName);

  // infinite loop

  //     // return warehouses.warehouseName;
  // this.setState({ warehouseName: warehouses.warehouseName });
  //   });
  // };

  render() {
    // console.log(this.foundWarehouse());
    return (
      <>
        <form className="edit-inventory-form" onSubmit={this.handleSubmit}>
          {/* Allows form to be used for add and edit pages */}
          <h1 className="edit-inventory-form__title">
            <Link to="/">
              <img
                className="edit-inventory-form__arrow"
                src={arrow}
                alt="Back arrow"
              />
            </Link>
            Edit Inventory Item
          </h1>

          <section className="edit-inventory-form__main">
            <article className="edit-inventory-form__details edit-inventory-form__details-1">
              <h2 className="edit-inventory-form__subtitle">Item Details</h2>
              <label className="edit-inventory-form__label">
                Item Name
                <input
                  className="edit-inventory-form__field"
                  type="text"
                  placeholder="Item Name"
                  name="name"
                  value={this.state.itemName}
                ></input>
              </label>

              <label className="edit-inventory-form__label">
                Description
                <textarea
                  className="edit-inventory-form__textarea"
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                />
              </label>

              <label className="edit-inventory-form__label" for="category">
                Category
                <select
                  id="category"
                  name="category"
                  className="edit-inventory-form__field"
                  value={this.state.category}
                >
                  <option value="" selected disabled hidden>
                    Please Select
                  </option>
                  <option value="">{this.state.category}</option>
                  <option value="electronics">Electronics</option>
                  <option value="gear">Gear</option>
                  <option value="apparel">Apparel</option>
                  <option value="accessories">Accessories</option>
                  <option value="health">Health</option>
                  {/* hardcoded for now - use .map  */}
                </select>
              </label>
            </article>

            <article className="edit-inventory-form__details">
              <h2 className="edit-inventory-form__subtitle">
                Item Availability
              </h2>
              <label className="edit-inventory-form__label" for="category">
                Status
              </label>
              <div className="edit-inventory-form__status-container">
                <div>
                  <input
                    type="radio"
                    id="in-stock"
                    name="stock"
                    value="in-stock"
                    checked={
                      this.state.status === "In Stock" ? "true" : "false"
                    }
                  />
                  <label for="in-stock">In Stock</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="stock"
                    value="out-of-stock"
                    // checked={
                    //   this.state.status === "In Stock" ? "false" : "true"
                    // }
                    className={
                      this.state.status === "Out of Stock"
                        ? "outofstock"
                        : "outofstock-not"
                    }
                  />
                  <label for="out-of-stock">Out of Stock</label>
                </div>
              </div>
              <label className="edit-inventory-form__label">
                Quantity
                <input
                  className="edit-inventory-form__field"
                  type="text"
                  placeholder="0"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleStatus}
                ></input>
              </label>
              <label className="edit-inventory-form__label" for="category">
                Warehouse
                <select
                  id="category"
                  name="category"
                  className="edit-inventory-form__field"
                >
                  {/* <option value={this.foundWarehouse()}></option> */}

                  <option value="manhattan">Manhattan</option>
                  <option value="gear">Gear</option>
                  {/* hardcoded for now - use .map  */}
                </select>
              </label>
            </article>
          </section>

          <section className="edit-inventory-form__buttons">
            <Link to="/">
              <button className="edit-inventory-form__cancel">Cancel</button>
            </Link>
            <button className="edit-inventory-form__submit">Save</button>
          </section>
        </form>
      </>
    );
  }
}
