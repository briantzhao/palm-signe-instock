import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import detailIcon from "../../assets/icons/chevron_right-24px.svg";

import "../WarehouseList/WarehouseList.scss";

export default function WarehouseList({ warehouseList }) {
	console.log(warehouseList);
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
					<button className="warehouse__button--add">
						+ Add New Warehouse
					</button>
				</form>
			</div>
			<div className="warehouse__container">
				{warehouseList.map(({ id, address, city, country, name, contact }) => (
					<>
						<div key={id} className="warehouse__card">
							<div className="warehouse__container--left">
								<div className="warehouse__wrapper">
									<h4 className="warehouse__subheading">WAREHOUSE</h4>
									<Link to={`/warehouse/${id}`}>
										<span className="warehouse--name">{name}</span>
										<img src={detailIcon} alt="detail" />
									</Link>
								</div>
								<div className="warehouse__wrapper">
									<h4 className="warehouse__subheading">ADDRESS</h4>
									<p className="warehouse--address">
										{address}, {city}, {country}
									</p>
								</div>
							</div>
							<div className="warehouse__container--right">
								<div className="warehouse__wrapper">
									<h4 className="warehouse__subheading">CONTACT NAME</h4>
									<p className="warehouse--contact-name">{contact.name}</p>
								</div>
								<div className="warehouse__wrapper">
									<h4 className="warehouse__subheading">CONTACT INFORMATION</h4>
									<p className="warehouse--contact-phone">{contact.phone}</p>
									<p className="warehouse--contact-email">{contact.email}</p>
								</div>
							</div>
						</div>
						<div className="warehouse__container--icons">
							<figure>
								<img src={deleteIcon} alt="delete icon"></img>
							</figure>
							<figure>
								<img src={editIcon} alt="edit icon"></img>
							</figure>
						</div>
					</>
				))}
			</div>
		</section>
	);
}
