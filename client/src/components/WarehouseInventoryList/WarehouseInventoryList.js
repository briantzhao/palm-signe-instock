import { Component } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import axios from "axios";
import "./WarehouseInventoryList.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { API_URL } from "../../config";

export default class WarehouseInventoryList extends Component {
  state = {
    warehouse: null,
    inventory: null,
    modalOpen: false,
    currentItem: "",
  };
  //grab warehouse and inventory information from server
  componentDidMount() {
    axios
      .get(`${API_URL}/inventories/warehouses/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({ inventory: data });
        return axios.get(`${API_URL}/warehouses/${this.props.match.params.id}`);
      })
      .then(({ data }) => {
        this.setState({ warehouse: data });
      });
  }

  hideModal = () => {
    return this.setState({ modalOpen: false });
  };

  deleteItem = () => {
    axios
      .delete(`${API_URL}/inventories/${this.state.currentItem.id}`)
      .then(() => {
        return axios.get(
          `${API_URL}/inventories/warehouses/${this.props.match.params.id}`
        );
      })
      .then(({ data }) => {
        this.setState({ inventory: data });
      })
      .catch((err) => console.log(err));
  };

  getItem = (id) => {
    const foundItem = this.state.inventory.find((item) => item.id === id);
    this.setState({ modalOpen: true, currentItem: foundItem });
  };

  render() {
    if (!this.state.warehouse) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="warehouse-inventory-list">
        <DeleteModal
          page="Inventory item"
          pageList="inventory list"
          currentItems={this.state.currentItem.itemName}
          modalState={this.state.modalOpen}
          deleteItem={this.deleteItem}
          hideModal={this.hideModal}
        />
        <section className="warehouse-inventory-list__header">
          <article className="warehouse-inventory-list__return">
            <Link to="/warehouses/">
              <img
                className="warehouse-inventory-list__label__pic"
                src={arrow}
                alt="Back arrow"
              />
            </Link>
            <h1 className="warehouse-inventory-list__title">
              {this.state.warehouse.name}
            </h1>
          </article>
          <Link
            className="warehouse-inventory-list__edit-button"
            to={`/warehouses/${this.props.match.params.id}/edit`}
          >
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
            <p className="warehouse-inventory-list__edit-text">Edit</p>
          </Link>
        </section>
        <section className="warehouse-inventory-list__details">
          <article className="warehouse-inventory-list__details__first">
            <h2 className="warehouse-inventory-list__details__field warehouse-inventory-list__details__data--address">
              WAREHOUSE ADDRESS:
            </h2>
            <p className="warehouse-inventory-list__details__data warehouse-inventory-list__details__data--address">
              {this.state.warehouse.address},
            </p>
            <p className="warehouse-inventory-list__details__data warehouse-inventory-list__details__data--address">
              {this.state.warehouse.city}, {this.state.warehouse.country}
            </p>
            <h2 className="warehouse-inventory-list__details__field warehouse-inventory-list__details__data--contact">
              CONTACT NAME:
            </h2>
            <p className="warehouse-inventory-list__details__data warehouse-inventory-list__details__data--contact">
              {this.state.warehouse.contact.name}
            </p>
            <p className="warehouse-inventory-list__details__data warehouse-inventory-list__details__data--contact">
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
          <tr className="warehouse-inventory-list__headers">
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--item">
              INVENTORY ITEM{" "}
              <img
                className="warehouse-inventory-list__label__pic"
                src={sortIcon}
              />
            </th>
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--category">
              CATEGORY{" "}
              <img
                className="warehouse-inventory-list__label__pic"
                src={sortIcon}
              />
            </th>
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--status">
              STATUS{" "}
              <img
                className="warehouse-inventory-list__label__pic"
                src={sortIcon}
              />
            </th>
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--quantity">
              QUANTITY{" "}
              <img
                className="warehouse-inventory-list__label__pic"
                src={sortIcon}
              />
            </th>
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--quantity--desktop">
              QTY{" "}
              <img
                className="warehouse-inventory-list__label__pic"
                src={sortIcon}
              />
            </th>
            <th className="warehouse-inventory-list__label warehouse-inventory-list__label--action">
              ACTIONS
            </th>
          </tr>
          {this.state.inventory.map(
            ({ id, itemName, category, status, quantity }) => {
              return (
                <>
                  <tr className="warehouse-inventory-list__single">
                    <td className="warehouse-inventory-list__item">
                      <Link
                        className="warehouse-inventory-list__item__cell"
                        to={`/inventory/${id}`}
                      >
                        {itemName}
                        <img
                          className="warehouse-inventory-list__chevron"
                          src={chevron}
                          alt="Item details button"
                        />
                      </Link>
                    </td>
                    <td className="warehouse-inventory-list__category">
                      {category}
                    </td>
                    <td className="warehouse-inventory-list__status">
                      <div
                        className={
                          status === "In Stock"
                            ? "warehouse-inventory-list__status--green"
                            : "warehouse-inventory-list__status--red"
                        }
                      >
                        {status}
                      </div>
                    </td>
                    <td className="warehouse-inventory-list__quantity">
                      {quantity}
                    </td>
                    <td className="warehouse-inventory-list__action--tablet">
                      <img
                        src={deleteIcon}
                        alt="Delete item button"
                        className="warehouse-inventory-list__action__btn"
                        onClick={() => {
                          this.getItem(id);
                        }}
                      />
                      <Link
                        className="warehouse-inventory-list__action__edit-link"
                        to={`/inventory/${id}/edit`}
                      >
                        <img
                          src={edit}
                          alt="Edit item button"
                          className="warehouse-inventory-list__action__btn"
                        />
                      </Link>
                    </td>
                  </tr>
                  {/* extra div outside of table that renders in mobile view for delete and edit buttons */}
                  <div>
                    <td className="warehouse-inventory-list__action">
                      <img
                        src={deleteIcon}
                        alt="Delete item button"
                        className="warehouse-inventory-list__action__btn"
                        onClick={() => {
                          this.getItem(id);
                        }}
                      />
                      <Link to={`/inventory/${id}/edit`}>
                        <img
                          src={edit}
                          alt="Edit item button"
                          className="warehouse-inventory-list__action__btn"
                        />
                      </Link>
                    </td>
                  </div>
                </>
              );
            }
          )}
        </table>
      </div>
    );
  }
}
