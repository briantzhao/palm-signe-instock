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

  // to GET all inventory from one warehouse:
  // /inventories/warehouses/:warehouseID

  // to GET individual inventory item data:
  // /inventories/:inventoryID

  // need to:
  // GET request to /inventories/:inventoryID
  componentDidMount() {
    axios
      .get("http://localhost:8080/inventories")
      .then((response) => {
        let foundId = response.data.find((inventory) => {
          return inventory.id === this.props.match.params.id;
        });

        console.log(response.data);
        const warehouseList = response.data.map((warehouse) => {
          return warehouse.warehouseID + "," + warehouse.warehouseName;
        });
        this.setState({ warehouses: warehouseList });

        console.log(this.props.match.params.id);
        console.log(foundId.id);
        return axios
          .get(`http://localhost:8080/inventories/${foundId.id}`)
          .then((response) => {
            const {
              warehouseName,
              warehouseId,
              itemName,
              description,
              category,
              status,
              quantity,
            } = response.data;

            // console.log(response.data.itemName);
            this.setState({
              warehouseName,
              warehouseId,
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
    // if state of status === "out of stock"
    // do not display quantity bar
    // true = in stock; false = out of stock
    // console.log(event.target.name);
    // let enteredQuantity = Number(event.target.value);
    // this.setState({ quantity: this.enteredQuantity });

    // if (enteredQuantity > 0) {
    //   this.setState({ status: "In Stock" });
    // } else if (enteredQuantity === 0) {
    //   this.setState({ status: "Out of Stock" });
    // }

    // if (this.state.status === "Out of Stock") {
    //   this.setState({ status: "Out of Stock", quantity: 0 });
    // } else if (this.state.status === "In Stock") {
    //   this.setState({ status: "In Stock", quantity: 1 });

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

  handleEditWarehouse = (event) => {
    // axios.get("http://localhost:8080/inventories").then((response) => {
    //   console.log(event.target.value);
    //   let foundId = response.data.find((inventory) => {
    // console.log(inventory.warehouseName);
    // console.log(event.target.value);
    //   return inventory.warehouseName === event.target.value;
    // });
    // console.log(foundId.warehouseID);

    // if (this.state.warehouseName) {
    //   return foundId.warehouseID;
    // }
    // });
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
    this.setState({ status: "Out of Stock" });
  };

  handleClickIS = () => {
    this.setState({ status: "In Stock" });
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

  //     // return warehouses.warehouseName;
  // this.setState({ warehouseName: warehouses.warehouseName });
  //   });
  // };

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
                <div>
                  <input
                    type="radio"
                    id="in-stock"
                    name="stock"
                    value="in-stock"
                    onChange={this.handleStatus}
                    checked={
                      this.state.status === "In Stock" ? "true" : "false"
                    }
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
                    // checked={
                    //   this.state.status === "In Stock" ? "false" : "true"
                    // }
                    // className={
                    //   this.state.status === "Out of Stock"
                    //     ? "outofstock"
                    //     : "outofstock-not"
                    // }
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
              <label className="edit-inventory-form__label" for="category">
                Warehouse
                <select
                  id="category"
                  name="category"
                  className="edit-inventory-form__field"
                  onClick={this.handleEditWarehouse}
                  placeholder="Please Select"
                >
                  <option value="" selected disabled hidden>
                    Please Select
                  </option>
                  {/* {this.state.warehouses.map((warehouse) => {
                    return <option value={warehouse}>{warehouse}</option>;
                  })} */}
                  {this.state.warehouses.map((warehouse) => {
                    return (
                      <option value={warehouse}>
                        {warehouse.split(",")[1]}
                      </option>
                    );
                  })}
                  {/* <option value={this.state.warehouseName}>
                    {this.state.warehouseName}
                  </option> */}
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
