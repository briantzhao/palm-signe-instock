const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

//array to hold data read from inventories.json
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

//post route that adds new inventory item to inventoryData, then writes to inventories.json
router.post("/", (req, res) => {
  let inventory = inventoryData;
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
    //create new inventory object
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
