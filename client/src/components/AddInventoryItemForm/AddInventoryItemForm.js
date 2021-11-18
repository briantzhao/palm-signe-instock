import { Component } from "react";
import { Link } from "react-router-dom";
import "./AddInventoryItemForm.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";

const API_URL = "http://localhost:8080/";

export default class AddInventoryItemForm extends Component {
  state = {
    itemName: "",
    itemNameValid: true,
    description: "",
    descriptionValid: true,
    category: "",
    categoryValid: true,
    status: true,
    statusValid: true,
    quantity: 0,
    warehouseID: "",
    warehouseName: "",
    warehouseValid: true,
    warehouses: null,
  };
  componentDidMount() {
    axios
      .get(`${API_URL}warehouses`)
      .then(({ data }) => {
        const warehouseNames = data.map((warehouse) => {
          return warehouse.id + "," + warehouse.name;
        });
        this.setState({ warehouses: warehouseNames });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  handleStatus = () => {};

  handleWarehouse = () => {};

  validate = (name, value) => {
    if (value === null || value.length === 0) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      itemName,
      description,
      category,
      status,
      quantity,
      warehouseID,
      warehouseName,
    } = this.state;
    if (!(itemName, description, category, status, quantity, warehouseName)) {
      alert("Please fill out all fields in the form");
      this.validate("itemName", itemName);
      this.validate("description", description);
      this.validate("category", category);
      this.validate("status", status);
      this.validate("quantity", quantity);
      this.validate("warehouseName", warehouseName);
      return;
    }
    axios
      .post(`${API_URL}inventories`, {
        itemName,
        description,
        category,
        status,
        quantity,
        warehouseID,
        warehouseName,
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.warehouses === null) {
      return <h1>Loading...</h1>;
    }
    return (
      <form className="add-inventory-item-form" onSubmit={this.handleSubmit}>
        <h1 className="add-inventory-item-form__title">
          <Link to="/inventory">
            <img
              className="add-inventory-item-form__arrow"
              src={arrow}
              alt="Back arrow"
            />
          </Link>
          Add New Inventory Item
        </h1>
        <section className="add-inventory-item-form__main">
          <article className="add-inventory-item-form__details add-inventory-item-form__details-1">
            <h2 className="add-inventory-item-form__subtitle">Item Details</h2>
            <label className="add-inventory-item-form__label">
              Item Name
              <input
                className={
                  this.state.itemNameValid
                    ? "add-inventory-item-form__field"
                    : "add-inventory-item-form__field add-inventory-item-form__field--error"
                }
                type="text"
                placeholder="Item Name"
                name="itemName"
                onChange={this.handleChange}
                value={this.state.itemName}
              ></input>
              {!this.state.itemNameValid && (
                <p className="add-inventory-item-form__error">
                  <img
                    className="add-inventory-item-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-inventory-item-form__label">
              Description
              <textarea
                className={
                  this.state.descriptionValid
                    ? "add-inventory-item-form__field"
                    : "add-inventory-item-form__field add-inventory-item-form__field--error"
                }
                placeholder="Please enter a brief item description..."
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              ></textarea>
              {!this.state.descriptionValid && (
                <p className="add-inventory-item-form__error">
                  <img
                    className="add-inventory-item-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-inventory-item-form__label">
              Category
              <select
                className={
                  this.state.categoryValid
                    ? "add-inventory-item-form__field"
                    : "add-inventory-item-form__field add-inventory-item-form__field--error"
                }
                placeholder="Please Select"
                name="category"
                onChange={this.handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              {!this.state.categoryValid && (
                <p className="add-inventory-item-form__error">
                  <img
                    className="add-inventory-item-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
          </article>
          <article className="add-inventory-item-form__details">
            <h2 className="add-inventory-item-form__subtitle">
              Item Availability
            </h2>
            <label className="add-inventory-item-form__label add-inventory-item-form__label--radio">
              Status
              <div className="add-inventory-item-form__radio-section">
                <label className="add-inventory-item-form__radio-label">
                  <input
                    className="add-inventory-item-form__radio"
                    type="radio"
                    name="status"
                    id="inStock"
                    onChange={this.handleStatus}
                    value={true}
                  />
                  In stock
                </label>
                <label className="add-inventory-item-form__radio-label">
                  <input
                    className="add-inventory-item-form__radio"
                    type="radio"
                    name="status"
                    id="outOfStock"
                    onChange={this.handleStatus}
                    value={false}
                  />
                  Out of stock
                </label>
              </div>
              {!this.state.statusValid && (
                <p className="add-inventory-item-form__error">
                  <img
                    className="add-inventory-item-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            {this.state.status && (
              <label className="add-inventory-item-form__label">
                Quantity
                <input
                  className="add-inventory-item-form__field"
                  type="number"
                  placeholder={0}
                  name="quantity"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                ></input>
              </label>
            )}
            <label className="add-inventory-item-form__label">
              Warehouse
              <select
                className={
                  this.state.warehouseValid
                    ? "add-inventory-item-form__field"
                    : "add-inventory-item-form__field add-inventory-item-form__field--error"
                }
                placeholder="Please Select"
                name="warehouse"
                onChange={this.handleWarehouse}
              >
                {this.state.warehouses.map((warehouse) => {
                  return (
                    <option value={warehouse}>{warehouse.split(",")[1]}</option>
                  );
                })}
              </select>
              {!this.state.warehouseValid && (
                <p className="add-inventory-item-form__error">
                  <img
                    className="add-inventory-item-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
          </article>
        </section>
        <section className="add-inventory-item-form__buttons">
          <Link to="/">
            <button className="add-inventory-item-form__cancel">Cancel</button>
          </Link>
          <button className="add-inventory-item-form__submit">
            + Add Warehouse
          </button>
        </section>
      </form>
    );
  }
}
