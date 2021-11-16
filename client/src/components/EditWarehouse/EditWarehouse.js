import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

export default function WarehouseList(props) {
  return (
    <>
      {/* whole  main section */}
      <section>
        {/* header */}
        <h1>Edit Warehouse</h1>
        {/* warehouse and contact container - for desktop & tablet flexbox */}
        <div className="details__container">
          {/* warehouse details */}
          <form>
            <div className="details__container-form">
              <h3>Warehouse Details</h3>
              <label htmlFor="thing">Warehouse Name</label>
              <input
                type="text"
                id="warehouse-name"
                name="warehouse-name"
                value={props.x}
              />
              <label htmlFor="thing">Street Address</label>
              <input
                type="text"
                id="street-address"
                name="street-address"
                value={props.x}
              />
              <label htmlFor="thing">City</label>
              <input type="text" id="city" name="city" value={props.x} />
              <label htmlFor="thing">Country</label>
              <input type="text" id="country" name="country" value={props.x} />
            </div>
            {/* contact details */}
            <div className="details__container-form">
              <h3>Contact Details</h3>
              <label htmlFor="thing">Contact Name</label>
              <input
                type="text"
                id="contact-name"
                name="contact-name"
                value={props.x}
              />
              <label htmlFor="thing">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={props.x}
              />
              <label htmlFor="thing">Phone Number</label>
              <input type="text" id="phone" name="phone" value={props.x} />
              <label htmlFor="thing">Email</label>
              <input type="text" id="email" name="email" value={props.x} />
            </div>
          </form>
        </div>
        {/* save and cancel */}
      </section>
    </>
  );
}
