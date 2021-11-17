import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import axios from "axios";
import "./WarehouseInventoryList.scss";

const API_URL = "http://localhost:8080/";

export default class WarehouseInventoryList extends Component {
  state = {
    warehouse: null,
    inventory: null,
  };
  componentDidMount() {
    axios
      .get(`${API_URL}inventories/warehouses/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ inventory: data });
        return axios.get(`${API_URL}warehouses/${this.props.match.params.id}`);
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ warehouse: data });
      });
  }
  render() {
    if (!(this.state.warehouse && this.state.inventory)) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="warehouse-inventory-list">
        <section className="warehouse-inventory-list__header">
          <article className="warehouse-inventory-list__return">
            <Link to="">
              <img src={arrow} alt="Back arrow" />
            </Link>
            <h1 className="warehouse-inventory-list__title">
              {this.state.warehouse.name}
            </h1>
          </article>
          <Link className="warehouse-inventory-list__edit-button" to="">
            <svg
              className="warehouse-inventory-list__edit-icon"
              xlms="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="warehouse-inventory-list__edit-icon__path"
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
              />
            </svg>
          </Link>
        </section>
        <section className="warehouse-inventory-list__details">
          <article className="warehouse-inventory-list__details__first">
            <h2 className="warehouse-inventory-list__details__field">
              WAREHOUSE ADDRESS:
            </h2>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.address},
            </p>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.city}, {this.state.warehouse.country}
            </p>
            <h2 className="warehouse-inventory-list__details__field">
              CONTACT NAME:
            </h2>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.contact.name}
            </p>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.contact.position}
            </p>
          </article>
          <article className="warehouse-inventory-list__details__second">
            <h2 className="warehouse-inventory-list__details__field">
              CONTACT INFORMATION:
            </h2>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.contact.phone}
            </p>
            <p className="warehouse-inventory-list__details__data">
              {this.state.warehouse.contact.email}
            </p>
          </article>
        </section>
        <table className="warehouse-inventory-list__table">
          <thead className="warehouse-inventory-list__head">
            <tr className="warehouse-inventory-list__headers">
              <th className="warehouse-inventory-list__label">
                INVENTORY ITEM
              </th>
              <th className="warehouse-inventory-list__label">CATEGORY</th>
              <th className="warehouse-inventory-list__label">STATUS</th>
              <th className="warehouse-inventory-list__label">QUANTITY</th>
              <th className="warehouse-inventory-list__label">ACTION</th>
            </tr>
          </thead>
          <tbody className="warehouse-inventory-list__body">
            {this.state.inventory.map(
              ({ itemName, category, status, quantity }) => {
                return (
                  <tr className="warehouse-inventory-list__single">
                    <div className="warehouse-inventory-list__non-buttons">
                      <div className="warehouse-inventory-list__column">
                        <td className="warehouse-inventory-list__item">
                          <span className="warehouse-inventory-list__item__cell">
                            {itemName}{" "}
                            <Link to="">
                              <img src={chevron} alt="Item details button" />
                            </Link>
                          </span>
                        </td>
                        <td className="warehouse-inventory-list__category">
                          {category}
                        </td>
                      </div>
                      <div className="warehouse-inventory-list__column">
                        <td className="warehouse-inventory-list__status">
                          {status}
                        </td>
                        <td className="warehouse-inventory-list__quantity">
                          {quantity}
                        </td>
                      </div>
                    </div>
                    <td className="warehouse-inventory-list__action">
                      <Link to="">
                        <img src={deleteIcon} alt="Delete item button" />
                      </Link>
                      <Link to="">
                        <img src={edit} alt="Edit item button" />
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
