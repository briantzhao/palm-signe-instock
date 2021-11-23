import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";
import "./EditInventoryForm.scss";

const API_URL = "http://localhost:8080/";

export default class EditInventoryForm extends Component {
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
    warehouses: [],
  };

  componentDidMount() {
    axios.get(`${API_URL}warehouses`).then((response) => {
      const warehouseList = response.data.map((warehouse) => {
        return warehouse.id + "," + warehouse.name;
      });
      this.setState({ warehouses: warehouseList });
    });

    axios
      .get(`${API_URL}inventories`)
      .then((response) => {
        let foundId = response.data.find((inventory) => {
          return inventory.id === this.props.match.params.id;
        });

        return axios
          .get(`${API_URL}inventories/${foundId.id}`)
          .then((response) => {
            const {
              warehouseName,
              warehouseID,
              itemName,
              description,
              category,
              status,
              quantity,
            } = response.data;

            this.setState({
              warehouseName,
              warehouseID,
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
    if (event.target.name === "quantity") {
      const val = Number(event.target.value);
      this.setState({ [event.target.name]: val });
      return;
    }

    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  handleEditWarehouse = (event) => {
    if (event.target.name === "warehouse") {
      const whID = event.target.value.split(",")[0];
      const whName = event.target.value.split(",")[1];
      this.setState({ warehouseID: whID, warehouseName: whName }, () => {
        this.validate("warehouse", whName);
      });
      return;
    }
  };

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

    //creates axios get n patch
    axios.get(`${API_URL}inventories`).then((response) => {
      let foundId = response.data.find((inventory) => {
        return inventory.id === this.props.match.params.id;
      });
      axios
        .patch(`${API_URL}inventories/${foundId.id}`, {
          itemName,
          description,
          category,
          status,
          quantity,
          warehouseID,
          warehouseName,
        })
        .then(() => {
          alert("You have successfully edited this item.");
          this.props.history.push("/inventory");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // if you click out of stock, set quantity to zero
  handleClickOOS = () => {
    this.setState({ status: "Out of Stock", quantity: 0 });
  };

  handleClickIS = () => {
    this.setState({ status: "In Stock" });
  };

  render() {
    return (
      <>
        <form className="edit-inventory-form" onSubmit={this.handleSubmit}>
          <h1 className="edit-inventory-form__title">
            <Link to="/inventory">
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
                  className={
                    this.state.itemNameValid
                      ? "edit-inventory-form__field"
                      : "edit-inventory-form__field edit-inventory-form__field--error"
                  }
                  type="text"
                  placeholder="Item Name"
                  name="itemName"
                  onChange={this.handleStatus}
                  value={this.state.itemName}
                ></input>
                {!this.state.itemNameValid && (
                  <p className="edit-inventory-form__error">
                    <img
                      className="edit-inventory-form__error__icon"
                      src={error}
                      alt="error icon"
                    />
                    This field is required
                  </p>
                )}
              </label>

              <label className="edit-inventory-form__label">
                Description
                <textarea
                  className={
                    this.state.descriptionValid
                      ? "edit-inventory-form__textarea"
                      : "edit-inventory-form__textarea edit-inventory-form__textarea--error"
                  }
                  placeholder="Description"
                  type="text"
                  name="description"
                  onChange={this.handleStatus}
                  value={this.state.description}
                />
                {!this.state.descriptionValid && (
                  <p className="edit-inventory-form__error">
                    <img
                      className="edit-inventory-form__error__icon"
                      src={error}
                      alt="error icon"
                    />
                    This field is required
                  </p>
                )}
              </label>

              <label className="edit-inventory-form__label" for="category">
                Category
                <select
                  id="category"
                  name="category"
                  className={
                    this.state.categoryValid
                      ? "edit-inventory-form__field"
                      : "edit-inventory-form__field edit-inventory-form__field--error"
                  }
                  value={this.state.category}
                  onChange={this.handleStatus}
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
                </select>
                {!this.state.categoryValid && (
                  <p className="edit-inventory-form__error">
                    <img
                      className="edit-inventory-form__error__icon"
                      src={error}
                      alt="error icon"
                    />
                    This field is required
                  </p>
                )}
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
                <div className="edit-inventory-form__status-instock">
                  <input
                    type="radio"
                    id="in-stock"
                    name="stock"
                    value="in-stock"
                    onChange={this.handleStatus}
                    onClick={this.handleClickIS}
                  />
                  <label for="in-stock">In Stock</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="stock"
                    value="out-of-stock"
                    onChange={this.handleStatus}
                    onClick={this.handleClickOOS}
                  />
                  <label for="out-of-stock">Out of Stock</label>
                </div>
              </div>
              {this.state.status === "In Stock" ? (
                <>
                  <label className="edit-inventory-form__label">
                    Quantity
                    <input
                      className="edit-inventory-form__field"
                      type="text"
                      placeholder="Quantity"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.handleStatus}
                    ></input>
                    {!this.state.quantityValid && (
                      <p className="edit-inventory-form__error">
                        <img
                          className="edit-inventory-form__error__icon"
                          src={error}
                          alt="error icon"
                        />
                        Please correct this field
                      </p>
                    )}
                  </label>
                </>
              ) : (
                <> </>
              )}
              <label className="edit-inventory-form__label" for="warehouse">
                Warehouse
                <select
                  id="category"
                  name="warehouse"
                  className="edit-inventory-form__field"
                  onChange={this.handleEditWarehouse}
                  placeholder="Please Select"
                >
                  {this.state.warehouses.map((warehouse) => {
                    return (
                      <option value={warehouse}>
                        {warehouse.split(",")[1]}
                      </option>
                    );
                  })}
                </select>
              </label>
            </article>
          </section>

          <section className="edit-inventory-form__buttons">
            <Link to="/inventory">
              <button className="edit-inventory-form__cancel">Cancel</button>
            </Link>
            <button className="edit-inventory-form__submit">Save</button>
          </section>
        </form>
      </>
    );
  }
}
