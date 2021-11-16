import React from "react";
import { Link } from "react-router-dom";

export default function WarehouseDetails(props) {
	return (
		<div className="warehouse__container">
			{props.warehouse.map((res) => (
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
	);
}
