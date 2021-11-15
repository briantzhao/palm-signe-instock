const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

//array to hold data read from warehouses.json
let warehouseData = [];

//function to populate warehouseData with data from warehouses.json
const getWarehouseData = () => {
  fs.readFile("./data/warehouses.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    warehouseData = JSON.parse(data);
  });
};

//function to update warehouses.json
const postWarehouseData = (videos) => {
  fs.writeFile("./data/warehouses.json", JSON.stringify(videos), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

//post route that adds new warehouse to warehouseData array, then writes to warehouses.json
router.post("/", (req, res) => {
  let warehouses = warehouseData;
  const { name, address, city, country, contact, position, phone, email } =
    req.body;
  if (
    name &&
    address &&
    city &&
    country &&
    contact &&
    position &&
    phone &&
    email
  ) {
    const newWarehouse = {
      id: uniqid(),
      name,
      address,
      city,
      country,
      contact: {
        name: contact,
        position,
        phone,
        email,
      },
    };
    warehouses.push(newWarehouse);
    warehouseData = warehouses;
    postWarehouseData(warehouseData);
    res.status(201).json(newWarehouse);
  }
  res.status(500).send("Warehouse not created.");
});

module.exports = router;
