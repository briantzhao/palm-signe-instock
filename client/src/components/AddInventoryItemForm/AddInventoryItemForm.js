import { Component } from "react";
import { Link } from "react-router-dom";
import "./AddInventoryItemForm.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";
import { API_URL } from "../../config";

export default class AddInventoryItemForm extends Component {
  //states for each form field, as well as validity tracking
  state = {
    itemName: "",
    itemNameValid: true,
    description: "",
    descriptionValid: true,
    category: "",
    categoryValid: true,
    status: null,
    statusValid: true,
    quantity: 0,
    quantityValid: true,
    warehouseID: "",
    warehouseName: "",
    warehouseValid: true,
    warehouses: null,
  };

  //gets information to populate warehouse select element
  componentDidMount() {
    axios
      .get(`${API_URL}/warehouses`)
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

  //converts quantity values to Number format
  handleChange = (event) => {
    if (event.target.name === "quantity") {
      const val = Number(event.target.value);
      this.setState({ [event.target.name]: val });
      return;
    }
    //sets quantity back to 0 if out of stock is re-selected
    if (
      event.target.value === "Out of Stock" &&
      event.target.name === "status"
    ) {
      this.setState({ quantity: 0 });
    }
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  //handles changes for warehouse, since both ID and Name are in one string
  handleDropdown = (event) => {
    if (event.target.name === "warehouse") {
      const whID = event.target.value.split(",")[0];
      const whName = event.target.value.split(",")[1];
      this.setState({ warehouseID: whID, warehouseName: whName }, () => {
        this.validate("warehouse", whName);
      });
      return;
    }
  };

  //checks if fields are filled out in a valid manner
  validate = (name, value) => {
    if (value === null || value.length === 0) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
  };

  //creates axios post call
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

    //checks that all states are filled out (besides quantity, since quantity can be 0)
    if (!(itemName && description && category && status && warehouseName)) {
      alert("Please fill out all fields in the form");
      this.validate("itemName", itemName);
      this.validate("description", description);
      this.validate("category", category);
      this.validate("status", status);
      this.validate("quantity", quantity);
      this.validate("warehouse", warehouseName);
      if (quantity === "") {
        alert("Please fill out all fields in the form");
        this.setState({ quantityValid: false });
        return;
      }
      if (quantity < 0) {
        alert("Please provide a non-negative value for quantity");
        this.setState({ quantityValid: false });
        return;
      }
      if (quantity === 0 && status === "In Stock") {
        alert("If this item is in stock, its quantity must be greater than 0");
        this.setState({ quantityValid: false });
        return;
      }
      return;
    }

    //checks special conditions of quantity separately
    if (quantity === "") {
      alert("Please fill out all fields in the form");
      this.setState({ quantityValid: false });
      return;
    }
    if (quantity < 0) {
      alert("Please provide a non-negative value for quantity");
      this.setState({ quantityValid: false });
      return;
    }
    if (quantity === 0 && status === "In Stock") {
      alert("If this item is in stock, its quantity must be greater than 0");
      this.setState({ quantityValid: false });
      return;
    }

    //creates axios post call
    axios
      .post(`${API_URL}/inventories`, {
        itemName,
        description,
        category,
        status,
        quantity,
        warehouseID,
        warehouseName,
      })
      .then(() => {
        alert("Item posted!");
        //return to inventory page
        this.props.history.push("/inventory");
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
            {/* Fields receive a red border if invalid */}
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
            {/* Fields receive a red border if invalid */}
            <label className="add-inventory-item-form__label">
              Description
              <textarea
                className={
                  this.state.descriptionValid
                    ? "add-inventory-item-form__field--text"
                    : "add-inventory-item-form__field--text add-inventory-item-form__field--error"
                }
                placeholder="Please enter a brief item description..."
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              ></textarea>
              {/* renders message if field is invalid */}
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
            {/* Fields receive a red border if invalid */}
            <label className="add-inventory-item-form__label">
              Category
              <select
                className={
                  this.state.categoryValid
                    ? "add-inventory-item-form__field"
                    : "add-inventory-item-form__field add-inventory-item-form__field--error"
                }
                name="category"
                onChange={this.handleChange}
              >
                <option value="" selected disabled hidden>
                  Please Select
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              {/* renders message if field is invalid */}
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
                    onChange={this.handleChange}
                    value="In Stock"
                  />
                  In stock
                </label>
                <label className="add-inventory-item-form__radio-label">
                  <input
                    className="add-inventory-item-form__radio"
                    type="radio"
                    name="status"
                    id="outOfStock"
                    onChange={this.handleChange}
                    value="Out of Stock"
                  />
                  Out of stock
                </label>
              </div>
              {/* renders message if field is invalid */}
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
            {/* only render if in stock is true */}
            {this.state.status === "In Stock" ? (
              <>
                {/* Fields receive a red border if invalid */}
                <label className="add-inventory-item-form__label">
                  Quantity
                  <input
                    className={
                      this.state.quantityValid
                        ? "add-inventory-item-form__field"
                        : "add-inventory-item-form__field add-inventory-item-form__field--error"
                    }
                    type="number"
                    name="quantity"
                    onChange={this.handleChange}
                    value={this.state.quantity}
                  ></input>
                  {/* renders message if field is invalid */}
                  {!this.state.quantityValid && (
                    <p className="add-inventory-item-form__error">
                      <img
                        className="add-inventory-item-form__error__icon"
                        src={error}
                        alt="error icon"
                      />
                      Please correct this field
                    </p>
                  )}
                </label>
              </>
            ) : (
              <></>
            )}
            {/* Fields receive a red border if invalid */}
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
                onChange={this.handleDropdown}
              >
                <option value="" selected disabled hidden>
                  Please Select
                </option>
                {this.state.warehouses.map((warehouse) => {
                  return (
                    <option value={warehouse}>{warehouse.split(",")[1]}</option>
                  );
                })}
              </select>
              {/* renders message if field is invalid */}
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
          <Link to="/inventory/">
            <button className="add-inventory-item-form__cancel">Cancel</button>
          </Link>
          <button className="add-inventory-item-form__submit">
            + Add Item
          </button>
        </section>
      </form>
    );
  }
}
