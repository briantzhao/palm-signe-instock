import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "../WarehouseList/WarehouseList.scss";

export default function WarehouseList({ warehouseList, getItem }) {
  return (
    <section className="warehouse">
      <div className="warehouse__header">
        <h1 className="warehouse__heading">Warehouses</h1>
        <form className="warehouse__form">
          <input
            className="warehouse__input--search"
            type="search"
            placeholder="Search..."
          ></input>
          <Link to={`/warehouses/add`}>
            <button className="warehouse__button--add">
              + Add New Warehouse
            </button>
          </Link>
        </form>
      </div>
      <table className="warehouse__table">
        <thead>
          <tr className="warehouse__table--header">
            <th className="warehouse__table--subheading">
              <span>
                WAREHOUSE
                <img src={sortIcon} />
              </span>
            </th>
            <th className="warehouse__table--subheading">
              <span>
                ADDRESS
                <img src={sortIcon} />
              </span>
            </th>

            <th className="warehouse__table--subheading">
              <span>
                CONTACT NAME
                <img src={sortIcon} />
              </span>
            </th>
            <th className="warehouse__table--subheading">
              <span>
                CONTACT INFORMATION
                <img src={sortIcon} />
              </span>
            </th>
            <th className="warehouse__table--subheading actions">ACTIONS</th>
          </tr>
        </thead>
        {warehouseList.map(({ id, address, city, country, name, contact }) => (
          <tbody>
            <tr key={id} className="warehouse__card">
              <div className="warehouse__wrapper">
                <td className="warehouse__data">
                  <h4>WAREHOUSE</h4>
                  <Link to={`/warehouses/${id}/inventory`}>
                    <span className="warehouse--name">{name}</span>
                    <img
                      src={chevron}
                      alt="detail"
                      className="warehouse--chevron"
                    />
                  </Link>
                </td>
                <td className="warehouse__data">
                  <h4>ADDRESS</h4>
                  <p className="warehouse--address">
                    {address}, {city}, {country}
                  </p>
                </td>
              </div>
              <div className="warehouse__wrapper">
                <td className="warehouse__data">
                  <h4>CONTACT NAME</h4>
                  <p className="warehouse--contact-name">{contact.name}</p>
                </td>
                <td className="warehouse__data">
                  <h4>CONTACT INFORMATION</h4>
                  <p className="warehouse--contact-phone">{contact.phone}</p>
                  <p className="warehouse--contact-email">{contact.email}</p>
                </td>
              </div>
              <div className="warehouse__data--icons">
                <td className="warehouse__data--icons-tablet">
                  {/* <Link to={`/delete/${id}`}> */}
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => {
                      getItem(id);
                    }}
                  ></img>
                  {/* </Link> */}
                  <Link to={`/warehouses/${id}/edit`}>
                    <img src={editIcon} alt="edit icon"></img>
                  </Link>
                </td>
              </div>
            </tr>
            <div className="warehouse__data--icons-mobile">
              {/* <Link to={`/delete/${id}`}> */}
              <img
                src={deleteIcon}
                alt="delete icon"
                onClick={() => {
                  getItem(id);
                }}
              ></img>
              {/* </Link> */}
              <Link to={`/warehouses/${id}/edit`}>
                <img src={editIcon} alt="edit icon"></img>
              </Link>
            </div>
          </tbody>
        ))}
      </table>
    </section>
  );
}
