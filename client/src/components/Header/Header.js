import "./Header.scss";
import Logo from "../../assets/logo/InStock-Logo_1x.png";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Header() {
  return (
    <>
      <main className="header">
        <div className="header__section-logo">
          <NavLink to="/">
            <img className="header__logo" src={Logo} alt="instock logo" />
          </NavLink>
        </div>

        <section className="header__section-container">
          <div className="header__link-container">
            {" "}
            <h3 className="header__link">
              <NavLink exact to="/" activeClassName="true">
                Warehouses
              </NavLink>
            </h3>
          </div>
          <div className="header__link-container">
            <h3 className="header__link">
              <NavLink to="/inventory/" activeClassName="true">
                Inventory
              </NavLink>
            </h3>
          </div>
        </section>
      </main>
    </>
  );
}
