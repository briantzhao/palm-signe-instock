import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import "./InventoryDetail.scss";
import { API_URL } from "../config";

export default class InventoryDetail extends Component {
  state = {
    inventoryItem: null,
  };
  componentDidMount() {
    axios
      .get(`${API_URL}inventories/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ inventoryItem: res.data });
      })
      .catch((err) => {
        console.log(err, "Check componentDidMount.");
      });
  }
  render() {
    if (!this.state.inventoryItem) {
      return <h1 className="loading">Loading...</h1>;
    }
    const { itemName, description, category, status, quantity, warehouseName } =
      this.state.inventoryItem;
    return (
      <section className="inventory-detail">
        <div className="inventory-detail__header">
          <article className="inventory-detail__return">
            <Link to="/inventory">
              <img src={arrow} alt="Back arrow" />
            </Link>
            <h1 className="inventory-detail__title">{itemName}</h1>
          </article>
          <Link
            className="inventory-detail__edit-button"
            to={`/inventory/${this.props.match.params.id}/edit`}
            key={this.props.match.params.id}
          >
            <svg
              className="inventory-detail__edit-icon"
              xlms="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="inventory-detail__edit-icon__path"
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
              />
            </svg>
            <p className="inventory-detail__edit-text">Edit</p>
          </Link>
        </div>
        <article className="inventory-detail__details">
          <div className="inventory-detail__details__container">
            <h2 className="inventory-detail__details__heading">
              ITEM DESCRIPTION:
            </h2>
            <p className="inventory-detail__details--description">
              {description}
            </p>
            <h2 className="inventory-detail__details__heading">CATEGORY:</h2>
            <p className="inventory-detail__details--description">{category}</p>
          </div>
          <div className="inventory-detail__details__wrapper">
            <div className="inventory-detail__details--info">
              <div className="inventory-detail__details--status">
                <h2 className="inventory-detail__details__heading">STATUS:</h2>
                {/* //apply conditional in/out stock logic */}
                <p
                  className={
                    status === "In Stock"
                      ? "inventory-detail__status--green"
                      : "inventory-detail__status--red"
                  }
                >
                  {status}
                </p>
              </div>
              <div className="inventory-detail__details--quantity">
                <h2 className="inventory-detail__details__heading">
                  QUANTITY:
                </h2>
                <p className="inventory-detail__details--description">
                  {quantity}
                </p>
              </div>
            </div>
            <div className="inventory-detail__details--warehouse">
              <h2 className="inventory-detail__details__heading">WAREHOUSE:</h2>
              <p className="inventory-detail__details--description">
                {warehouseName}
              </p>
            </div>
          </div>
        </article>
      </section>
    );
  }
}
