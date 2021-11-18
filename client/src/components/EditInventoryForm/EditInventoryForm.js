import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";
import "./EditInventoryForm.scss";

export default class EditWarehouseForm extends Component {
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
            </article>
            <article className="edit-inventory-form__details">
              <h2 className="edit-inventory-form__subtitle">
                Item Availability
              </h2>
            </article>
          </section>
        </form>
      </>
    );
  }
}
