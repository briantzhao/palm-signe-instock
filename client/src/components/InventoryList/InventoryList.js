import React from "react";
import "./InventoryList.scss";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";

export default function InventoryList({ inventoryItems }) {
  return (
    <section className="inventory-list">
      <form action="submit" className="inventory-list__form">
        <h1 className="inventory-list__heading">Inventory </h1>
        <input
          type="text"
          placeholder="Search..."
          className="inventory-list__search"
          name="inventorySearch"
        />
        <button className="inventory-list__button">+ Add New Item</button>
      </form>
      {/* {inventoryItems.map(
        ({
          id,
          itemName,
          category,
          status,
          quantity,
          warehouseID,
          warehouseName,
        }) => (
          <article key={id} className="inventory-list__items">
            <div className="inventory-list__items-top-container">
              <section className="inventory-list__items-left-wrap">
                <div className="inventory-list__items-item-wrap">
                  <h3 className="inventory-list__items-subheading">
                    INVENTORY ITEM
                  </h3>
                  <Link
                    to={`/inventories/${id}`}
                    className="inventory-list__item-link inventory-list__items-item-wrap"
                    key={id}
                  >
                    <span className="inventory-list__items-item">
                      {itemName}
                    </span>
                    <img src={chevron} alt="right arrow icon" />
                  </Link>
                </div>
                <div className="inventory-list__items-item-wrap">
                  <h3 className="inventory-list__items-subheading">CATEGORY</h3>
                  <p className="inventory-list__items-category">{category}</p>
                </div>
              </section>

              <section className="inventory-list__items-right-wrap">
                <div className="inventory-list__items-item-wrap">
                  <h3 className="inventory-list__items-subheading">STATUS</h3>
                  <p className="inventory-list__items-status">{status}</p>
                </div>

                <div className="inventory-list__items-item-wrap">
                  <h3 className="inventory-list__items-subheading">QTY</h3>
                  <p className="inventory-list__items-qty">{quantity}</p>
                </div>
                <div className="inventory-list__items-item-wrap">
                  <h3 className="inventory-list__items-subheading">
                    WAREHOUSE
                  </h3>
                  <p className="inventory-list__items-warehouse">
                    {warehouseName}
                  </p>
                </div>
              </section>
            </div>
            <div className="inventory-list__items-bottom-container">
              <figure className="inventory-list-items__icons">
                <img
                  src={deleteIcon}
                  alt="icon of delete action"
                  className="inventory-list__icons-delete"
                />
              </figure>
              <figure className="inventory-list-items__icons">
                <img
                  src={editIcon}
                  alt="icon of edit action"
                  className="inventory-list__icons-edit"
                />
              </figure>
            </div>
          </article>
        )
      )} */}
      {/* <table>
        <tr className="inventory-list__table-row--mobile">
          <th className="inventory-list__table-heading">INVENTORY ITEM</th>
          <th className="inventory-list__table-heading">CATEGORY</th>
          <th className="inventory-list__table-heading">STATUS</th>
          <th className="inventory-list__table-heading">QTY</th>
          <th className="inventory-list__table-heading">WAREHOUSE</th>
          <th className="inventory-list__table-heading">ACTIONS</th>
        </tr>
      </table> */}

      <table className="inventory-list__table">
        <tr className="inventory-list__table-row--mobile">
          <th className="inventory-list__table-heading">INVENTORY ITEM</th>
          <th className="inventory-list__table-heading">CATEGORY</th>
          <th className="inventory-list__table-heading">STATUS</th>
          <th className="inventory-list__table-heading">QTY</th>
          <th className="inventory-list__table-heading">WAREHOUSE</th>
          <th className="inventory-list__table-heading">ACTIONS</th>
        </tr>
        {inventoryItems.map(
          (
            {
              id,
              itemName,
              category,
              status,
              quantity,
              warehouseID,
              warehouseName,
            },
            i
          ) => (
            <>
              {/* <tbody className="inventory-list__table--large">
                {i === 0 ? (
                  <tr className="inventory-list__table-row--mobile">
                    <th className="inventory-list__table-heading">
                      INVENTORY ITEM
                    </th>
                    <th className="inventory-list__table-heading">CATEGORY</th>
                    <th className="inventory-list__table-heading">STATUS</th>
                    <th className="inventory-list__table-heading">QTY</th>
                    <th className="inventory-list__table-heading">WAREHOUSE</th>
                    <th className="inventory-list__table-heading">ACTIONS</th>
                  </tr>
                ) : (
                  false
                )}
                <tr className="inventory-list__table-row">
                  <td className="inventory-list__table-data inventory-list__table-data-item">
                    <Link
                      to={`/inventories/${id}`}
                      className="inventory-list__item-link"
                      key={id}
                    >
                      <span>{itemName}</span>
                      <img src={chevron} alt="" />
                    </Link>
                  </td>
                  <td className="inventory-list__table-data inventory-list__table-data-category">
                    {category}
                  </td>

                  <td className="inventory-list__table-data ">{status}</td>
                  <td className="inventory-list__table-data">{quantity}</td>
                  <td className="inventory-list__table-data">
                    {warehouseName}
                  </td>
                </tr> */}
              {/* <tr className="inventory-list__table-row">
                  <td className="inventory-list__table-data">
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="inventory-list__table-data"
                    />
                  </td>
                  <td className="inventory-list__table-data">
                    <img
                      src={editIcon}
                      alt="delete icon"
                      className="inventory-list__table-data"
                    />
                  </td>
                </tr> */}
              {/* </tbody> */}

              {/* <tbody className="inventory-list__table-body--mobile"> */}
              <tr className="inventory-list__table-row--mobile">
                <td className="inventory-list__table-data--mobile inventory-list__table-item--mobile">
                  <Link
                    to={`/inventories/${id}`}
                    className="inventory-list__item-link"
                    key={id}
                  >
                    <span>{itemName}</span>
                    {/* <img src={chevron} alt="right icon link" /> */}
                  </Link>
                </td>
                <td className="inventory-list__table-data--mobile inventory-list__table-status--mobile">
                  {status}
                </td>
                {/* </tr> */}
                {/* <tr className="inventory-list__table-row--mobile"> */}
                <td className="inventory-list__table-data--mobile inventory-list__table-category--mobile">
                  {category}
                </td>
                <td className="inventory-list__table-data--mobile inventory-list__table-quantity--mobile">
                  {quantity}
                </td>
                {/* </tr> */}
                {/* <tr className="inventory-list__table-row--mobile"> */}
                <td className="inventory-list__table-data--mobile-empty"> </td>
                <td
                  className="inventory-list__table-data--mobile 
                  inventory-list__table-warehouse--mobile"
                >
                  {warehouseName}
                </td>
                <td
                  className="inventory-list__table-data--tablet-icons-wrap"
                  colspan="2"
                  style={{ width: "100%" }}
                >
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className="inventory-list__table-data--mobile-icons-delete"
                  />

                  <img
                    src={editIcon}
                    alt="delete icon"
                    className="inventory-list__table-data--mobile-icons-edit"
                  />
                </td>
              </tr>
              <tr className="inventory-list__table-row--mobile inventory-list__table-row--mobile-wrap">
                <td
                  className="inventory-list__table-data--mobile-icons-wrap"
                  colspan="2"
                  style={{ width: "100%" }}
                >
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className="inventory-list__table-data--mobile-icons-delete"
                  />

                  <img
                    src={editIcon}
                    alt="delete icon"
                    className="inventory-list__table-data--mobile-icons-edit"
                  />
                </td>
              </tr>
              {/* </tbody> */}
            </>
          )
        )}
      </table>
    </section>
  );
}
