import React from "react";
import "./InventoryList.scss";

export default function InventoryList(props) {
  return (
    <section className="inventory-list">
      <h1 className="inventory-list__heading">Inventory </h1>
      <form action="submit" className="inventory-list__form">
        <input
          type="text"
          placeholder="Search..."
          className="inventory-list__search"
          name="inventorySearch"
        />
        <button className="inventory-list__button">+ Add New Item</button>
        <article className="inventory-list__items">
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
        </article>
      </form>
    </section>
  );
}
