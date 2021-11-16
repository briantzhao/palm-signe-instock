const express = require("express");
const router = express.Router();
const fs = require("fs");

let warehouseData = [];

const getWarehouseData = () => {
	fs.readFile("./data/warehouses.json", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
	});
};

getWarehouseData();

router.get("/", (_req, res) => {
	res.json(warehouseData);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	const warehouse = warehouseData.find((warehouse) => {
		return warehouse.id === id;
	});
	if (warehouse) {
		res.json(warehouse);
	} else {
		res.status(404).send("Page not found.");
	}
});

module.exports = router;
