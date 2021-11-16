import { Component } from "react";
import { Link } from "react-router-dom";
import "./AddWarehouseForm.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

const API_URL = "http://localhost:8080/";

export default class AddWarehouseForm extends Component {
  state = {
    name: null,
    address: null,
    city: null,
    country: null,
    contact: null,
    position: null,
    phone: null,
    email: null,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, address, city, country, contact, position, phone, email } =
      this.state;
    if (
      !(
        name &&
        address &&
        city &&
        country &&
        contact &&
        position &&
        phone &&
        email
      )
    ) {
      alert("Please fill out all fields in the form");
      return;
    }
    const phoneRGEX = new RegExp(
      /^[\+]?[1]?[ ]?[(]?[0-9]{3}[)]?[ ]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
    if (!phoneRGEX.test(phone)) {
      alert("Please enter a valid phone number");
      return;
    }
    const emailRGEX = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    );
    if (!emailRGEX.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    axios
      .post(`${API_URL}warehouses`, {
        name,
        address,
        city,
        country,
        contact,
        position,
        phone,
        email,
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="add-warehouse-form" onSubmit={this.handleSubmit}>
        {/* Allows form to be used for add and edit pages */}
        <h1 className="add-warehouse-form__title">
          <Link to="/">
            <img src={arrow} alt="Back arrow" />
          </Link>
          Add Warehouse
        </h1>
        <section className="add-warehouse-form__main">
          <article className="add-warehouse-form__warehouse-details">
            <h2 className="add-warehouse-form__subtitle">Warehouse Details</h2>
            <label className="add-warehouse-form__warehouse__label">
              Warehouse Name
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="Warehouse Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              Street Address
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="Street Address"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              City
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="City"
                name="city"
                onChange={this.handleChange}
                value={this.state.city}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              Country
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="Country"
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
              ></input>
            </label>
          </article>
          <article className="add-warehouse-form__warehouse-details">
            <h2 className="add-warehouse-form__subtitle">Contact Details</h2>
            <label className="add-warehouse-form__warehouse__label">
              Contact Name
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="Contact Name"
                name="contact"
                onChange={this.handleChange}
                value={this.state.contact}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              Position
              <input
                className="add-warehouse-form__warehouse__field"
                type="text"
                placeholder="Position"
                name="position"
                onChange={this.handleChange}
                value={this.state.position}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              Phone Number
              <input
                className="add-warehouse-form__warehouse__field"
                type="tel"
                placeholder="Phone Number"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              ></input>
            </label>
            <label className="add-warehouse-form__warehouse__label">
              Email
              <input
                className="add-warehouse-form__warehouse__field"
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </label>
          </article>
        </section>
        <section className="add-warehouse-form__buttons">
          <Link to="/">
            <button className="add-warehouse-form__cancel">Cancel</button>
          </Link>
          <button className="add-warehouse-form__submit">
            + Add Warehouse
          </button>
        </section>
      </form>
    );
  }
}
