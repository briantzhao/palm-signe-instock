import { Component } from "react";
import { Link } from "react-router-dom";
import "./WarehouseForm.scss";

const API_URL = "http://localhost:8080/";

export default class WarehouseForm extends Component {
  state = {
    name: null,
    street: null,
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
    const { name, street, city, country, contact, position, phone, email } =
      this.state;
    if (
      !(
        name &&
        street &&
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
    if (phoneRGEX.test(phone)) {
      alert("Please enter a valid phone number");
      return;
    }
    const emailRGEX = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    );
    if (emailRGEX.test(email)) {
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
      <form className="warehouse-form" onSubmit={this.handleSubmit}>
        {/* Allows form to be used for add and edit pages */}
        <h1 className="warehouse-form__title">{this.props.title}</h1>
        <section className="warehouse-form__main">
          <article className="warehouse-form__warehouse-details">
            <h2 className="warehouse-form__subtitle">Warehouse Details</h2>
            <label className="warehouse-form__warehouse__label">
              Warehouse Name
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="Warehouse Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              Street Address
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="Street Address"
                name="address"
                onChange={this.handleChange}
                value={this.state.address}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              City
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="City"
                name="city"
                onChange={this.handleChange}
                value={this.state.city}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              Country
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="Country"
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
              ></input>
            </label>
          </article>
          <article className="warehouse-form__warehouse-details">
            <h2 className="warehouse-form__subtitle">Contact Details</h2>
            <label className="warehouse-form__warehouse__label">
              Contact Name
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="Contact Name"
                name="contact"
                onChange={this.handleChange}
                value={this.state.contact}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              Position
              <input
                className="warehouse-form__warehouse__field"
                type="text"
                placeholder="Position"
                name="position"
                onChange={this.handleChange}
                value={this.state.position}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              Phone Number
              <input
                className="warehouse-form__warehouse__field"
                type="tel"
                placeholder="Phone Number"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              ></input>
            </label>
            <label className="warehouse-form__warehouse__label">
              Email
              <input
                className="warehouse-form__warehouse__field"
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </label>
          </article>
        </section>
        <section className="warehouse-form__buttons">
          <Link to="/">
            <button className="warehouse-form__cancel">Cancel</button>
          </Link>
          <button className="warehouse-form__submit">+ Add Warehouse</button>
        </section>
      </form>
    );
  }
}
