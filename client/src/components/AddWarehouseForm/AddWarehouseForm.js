import { Component } from "react";
import { Link } from "react-router-dom";
import "./AddWarehouseForm.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";

const API_URL = "http://localhost:8080/";

export default class AddWarehouseForm extends Component {
  state = {
    name: "",
    nameValid: true,
    address: "",
    addressValid: true,
    city: "",
    cityValid: true,
    country: "",
    countryValid: true,
    contact: "",
    contactValid: true,
    position: "",
    positionValid: true,
    phone: "",
    phoneValid: true,
    email: "",
    emailValid: true,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validate(event.target.name, event.target.value);
    });
  };

  validate = (name, value) => {
    const phoneRGEX = new RegExp(
      /^[\+]?[1]?[ ]?[(]?[0-9]{3}[)]?[ ]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
    if (name === "phone" && !phoneRGEX.test(value)) {
      this.setState({ phoneValid: false });
      return;
    }
    const emailRGEX = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    );
    if (name === "email" && !emailRGEX.test(value)) {
      this.setState({ emailValid: false });
      return;
    }
    if (value === null || value.length === 0) {
      this.setState({ [`${name}Valid`]: false });
      return;
    }
    this.setState({ [`${name}Valid`]: true });
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
      this.validate("name", name);
      this.validate("address", address);
      this.validate("city", city);
      this.validate("country", country);
      this.validate("contact", contact);
      this.validate("position", position);
      this.validate("phone", phone);
      this.validate("email", email);
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
            <img
              className="add-warehouse-form__arrow"
              src={arrow}
              alt="Back arrow"
            />
          </Link>
          Add New Warehouse
        </h1>
        <section className="add-warehouse-form__main">
          <article className="add-warehouse-form__details add-warehouse-form__details-1">
            <h2 className="add-warehouse-form__subtitle">Warehouse Details</h2>
            <label className="add-warehouse-form__label">
              Warehouse Name
              <input
                className={
                  this.state.nameValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="Warehouse Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              ></input>
              {!this.state.nameValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              Street Address
              <input
                className={
                  this.state.addressValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="Street Address"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
              ></input>
              {!this.state.addressValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              City
              <input
                className={
                  this.state.cityValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="City"
                name="city"
                onChange={this.handleChange}
                value={this.state.city}
              ></input>
              {!this.state.cityValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              Country
              <input
                className={
                  this.state.countryValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="Country"
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
              ></input>
              {!this.state.countryValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
          </article>
          <article className="add-warehouse-form__details">
            <h2 className="add-warehouse-form__subtitle">Contact Details</h2>
            <label className="add-warehouse-form__label">
              Contact Name
              <input
                className={
                  this.state.contactValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="Contact Name"
                name="contact"
                onChange={this.handleChange}
                value={this.state.contact}
              ></input>
              {!this.state.contactValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              Position
              <input
                className={
                  this.state.positionValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="text"
                placeholder="Position"
                name="position"
                onChange={this.handleChange}
                value={this.state.position}
              ></input>
              {!this.state.positionValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              Phone Number
              <input
                className={
                  this.state.phoneValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="tel"
                placeholder="Phone Number"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              ></input>
              {!this.state.phoneValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
            </label>
            <label className="add-warehouse-form__label">
              Email
              <input
                className={
                  this.state.emailValid
                    ? "add-warehouse-form__field"
                    : "add-warehouse-form__field add-warehouse-form__field--error"
                }
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
              {!this.state.emailValid && (
                <p className="add-warehouse-form__error">
                  <img
                    className="add-warehouse-form__error__icon"
                    src={error}
                    alt="error icon"
                  />
                  This field is required
                </p>
              )}
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