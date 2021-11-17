import React from "react";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";

export default function WarehouseList({ warehouseList }) {
  console.log(warehouseList);
  return (
    <section className="warehouse">
      <div>
        <h2 className="warehouse__heading">Warehouses</h2>
        <form className="warehouse__form">
          <input
            className="warehouse__input--search"
            type="search"
            placeholder="Search"
          ></input>
          <button className="warehouse__button--add">Add New Warehouse</button>
        </form>
      </div>

      <div className="warehouse__container">
        {warehouseList.map((res) => (
          <div key={res.id} className="warehouse__card">
            <div className="warehouse--info">
              <Link to={`/warehouse/${res.id}`}>
                <p className="warehouse--name"></p>
              </Link>
              <p className="warehouse--address">
                {res.address}, {res.city}, {res.country}
              </p>
              <p className="warehouse--contact-name"></p>
              <p className="warehouse--contact-info">
                <br />
              </p>
              <div className="warehouse__container--icons">
                <figure>
                  <img src={deleteIcon} alt="delete icon"></img>
                </figure>
                <img src={editIcon} alt="edit icon"></img>
                <figure></figure>
              </div>
              <p className="warehouse--contact-info">{res.address}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
