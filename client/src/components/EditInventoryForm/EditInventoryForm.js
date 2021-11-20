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
    quantity: 0,
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
    let id;
    axios
      .get("/inventories")
      .then((response) => {
        // response.data.find((warehouse) => {
        //   return warehouse.id === id;
        // });
        console.log(response.data[0].id);
        return axios
          .get(`/inventories/${response.data[0].id}`)
          .then((response) => {
            const {
              warehouseID,
              warehouseName,
              itemName,
              description,
              category,
              status,
              quantity,
            } = response.data;
            //   console.log(this.state);
            this.setState({
              warehouseID,
              warehouseName,
              itemName,
              description,
              category,
              status,
              quantity,
            });
          });
        // console.log(response.data[0].id);
      })
      .then((response) => {
        axios.get(`/inventories/${id}`).then((response) => {
          //   const {
          //     name,
          //     address,
          //     city,
          //     country,
          //     contact,
          //     position,
          //     phone,
          //     email,
          //   } = this.state;
          //   console.log(this.state);
          this.setState({ name: response.data.name });
        });
      });
  }

  render() {
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
                ></input>
              </label>

              <label className="edit-inventory-form__label">
                Description
                <textarea
                  className="edit-inventory-form__textarea"
                  placeholder="Description"
                  name="description"
                />
              </label>

              <label className="edit-inventory-form__label" for="category">
                Category
                <select
                  id="category"
                  name="category"
                  className="edit-inventory-form__field"
                >
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
                  />
                  <label for="in-stock">In Stock</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="stock"
                    value="out-of-stock"
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
                ></input>
              </label>
              <label className="edit-inventory-form__label" for="category">
                Warehouse
                <select
                  id="category"
                  name="category"
                  className="edit-inventory-form__field"
                >
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
