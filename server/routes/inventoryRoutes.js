const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

let inventoryData = [];

//function to populate InventoryData with data from inventories.json
const getInventoryData = () => {
  fs.readFile("./data/inventories.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    inventoryData = JSON.parse(data);
  });
};

//function to update inventories.json
const postInventoryData = (inventories) => {
  fs.writeFile(
    "./data/inventories.json",
    JSON.stringify(inventories),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
getInventoryData();

router.post("/", (req, res) => {
  const {
    warehouseID,
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity,
  } = req.body;
  if (
    warehouseID &&
    warehouseName &&
    itemName &&
    description &&
    category &&
    status &&
    quantity
  ) {
    let inventory = inventoryData;
    const newItem = {
      id: uniqid(),
      warehouseID,
      warehouseName,
      itemName,
      description,
      category,
      status,
      quantity,
    };
    inventory.push(newItem);
    inventoryData = inventory;
    postInventoryData(inventoryData);
    res.status(201).json(newItem);
  }
  res.status(500).send("Inventory item not created");
});
module.exports = router;
