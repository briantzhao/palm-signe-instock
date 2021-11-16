const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
	const { id } = req.params;
	const inventory = inventory.find((inventory) => {
		return inventory.id === id;
	});
	if (inventory) {
		res.json(inventory);
	} else {
		res.status(404).send("Page not found.");
	}
});

module.exports = router;
