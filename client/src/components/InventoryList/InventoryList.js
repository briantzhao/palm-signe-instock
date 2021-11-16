import React from "react";
import "./InventoryList.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";

export default function InventoryList(props) {
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

      <article className="inventory-list__items">
        <div className="inventory-list__items-top-container">
          <section className="inventory-list__items-left-wrap">
            <div className="inventory-list__items-item-wrap">
              <h3 className="inventory-list__items-subheading">
                INVENTORY ITEM
              </h3>
              <p className="inventory-list__items-item">Television</p>
            </div>
            <div className="inventory-list__items-item-wrap">
              <h3 className="inventory-list__items-subheading">CATEGORY</h3>
              <p className="inventory-list__items-category">Electronics</p>
            </div>
          </section>

          <section className="inventory-list__items-right-wrap">
            <div className="inventory-list__items-item-wrap">
              <h3 className="inventory-list__items-subheading">STATUS</h3>
              <p className="inventory-list__items-status">IN STOCK</p>
            </div>

            <div className="inventory-list__items-item-wrap">
              <h3 className="inventory-list__items-subheading">QTY</h3>
              <p className="inventory-list__items-qty">500</p>
            </div>
            <div className="inventory-list__items-item-wrap">
              <h3 className="inventory-list__items-subheading">WAREHOUSE</h3>
              <p className="inventory-list__items-warehouse">Manhattan</p>
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
            <img
              src={editIcon}
              alt="icon of edit action"
              className="inventory-list__icons-edit"
            />
          </figure>
        </div>
      </article>
    </section>
  );
}
