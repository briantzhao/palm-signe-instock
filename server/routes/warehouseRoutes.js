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
const postWarehouseData = (warehouses) => {
  fs.writeFile("./data/warehouses.json", JSON.stringify(warehouses), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
getWarehouseData();

//post route that adds new warehouse to warehouseData array, then writes to warehouses.json
router.post("/", (req, res) => {
  let warehouses = warehouseData;
  const { name, address, city, country, contact, position, phone, email } =
    req.body;
  //validate phone number
  const phoneRGEX = new RegExp(
    /^[\+]?[1]?[ ]?[(]?[0-9]{3}[)]?[ ]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
  //validate email
  const emailRGEX = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
  );
  if (
    name &&
    address &&
    city &&
    country &&
    contact &&
    position &&
    phone &&
    email &&
    phoneRGEX.test(phone) &&
    emailRGEX.test(email)
  ) {
    //create new warehouse object
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

// patch to make edits to single warehouse
router.patch("/:id", (req, res, next) => {
  let warehouses = warehouseData;

  let individualWarehouse = warehouses.find((warehouse) => {
    return warehouse.id === req.params.id;
  });

  if (individualWarehouse) {
    individualWarehouse = { ...individualWarehouse, ...req.body };

    let index = warehouses.findIndex(
      (warehouse) => warehouse.id === individualWarehouse.id
    );

    warehouses[index] = individualWarehouse;

    fs.writeFile(
      "./data/warehouses.json",
      JSON.stringify(warehouses),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log("File updated successfully");
        res.status(201).json(individualWarehouse);
      }
    );
  } else {
    res.status(404).send("Sorry, couldn't find that warehouse.");
  }
});

module.exports = router;
