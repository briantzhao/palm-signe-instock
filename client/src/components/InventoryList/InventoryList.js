import React from "react";
import "./InventoryList.scss";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";

export default function InventoryList({
  inventoryItems,
  openWarning,
  deleteItem,
}) {
  return (
    <section className="inventory-list">
      <form
        action="submit"
        className="inventory-list__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="inventory-list__heading">Inventory </h1>
        <input
          type="text"
          placeholder="Search..."
          className="inventory-list__search"
          name="inventorySearch"
        />
        <button className="inventory-list__button">+ Add New Item</button>
      </form>

      <table className="inventory-list__table">
        <thead>
          <tr className="inventory-list__table-row">
            <th className="inventory-list__table-heading">INVENTORY ITEM</th>
            <th className="inventory-list__table-heading">CATEGORY</th>
            <th className="inventory-list__table-heading">STATUS</th>
            <th className="inventory-list__table-heading">QTY</th>
            <th className="inventory-list__table-heading">WAREHOUSE</th>
            <th className="inventory-list__table-heading">ACTIONS</th>
          </tr>
        </thead>
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
              <tbody className="inventory-list__table-body">
                <tr className="inventory-list__table-row inventory-list__table-row">
                  <td className="inventory-list__table-data inventory-list__table-item">
                    <Link
                      to={`/inventories/${id}`}
                      className="inventory-list__item-link"
                      key={id}
                    >
                      <span>{itemName}</span>
                      {/* <img src={chevron} alt="right icon link" /> */}
                    </Link>
                  </td>
                  <td className="inventory-list__table-data inventory-list__table-status">
                    {status}
                  </td>

                  <td className="inventory-list__table-data inventory-list__table-category">
                    {category}
                  </td>
                  <td className="inventory-list__table-data inventory-list__table-quantity">
                    {quantity}
                  </td>

                  <td className="inventory-list__table-data-empty"> </td>
                  <td
                    className="inventory-list__table-data 
                  inventory-list__table-warehouse"
                  >
                    {warehouseName}
                  </td>
                  <td
                    className="inventory-list__table-data--tablet-icons-wrap"
                    colSpan="2"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="inventory-list__table-data-icons--delete"
                      onClick={() => {
                        deleteItem(itemName, id);
                      }}
                    />

                    <img
                      src={editIcon}
                      alt="edit icon"
                      className="inventory-list__table-data-icons--edit"
                    />
                  </td>
                </tr>
                <tr className="inventory-list__table-row">
                  <td
                    className="inventory-list__table-data-icons-wrap"
                    colSpan="2"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="inventory-list__table-data-icons--delete"
                      onClick={() => {
                        deleteItem(itemName, id);
                      }}
                    />

                    <img
                      src={editIcon}
                      alt="edit icon"
                      className="inventory-list__table-data-icons-edit"
                    />
                  </td>
                </tr>
              </tbody>
            </>
          )
        )}
      </table>
    </section>
  );
}
