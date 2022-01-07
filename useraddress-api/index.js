'use strict'
require("dotenv").config();
const express = require("express")
require("./db/mongoose")
const Address = require("./models/address")

/**
 * @constants
 * @setHostAt "0.0.0.0" instead or localhost
 */
const HOST = "0.0.0.0";
const PORT = 8446;

const app = express();
app.use(express.json())
const bodyParser = require("body-parser")

console.log("DDDDD", process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @getAddress endpoint - fetch data from our mongoDB 
 */
app.get('/', async (req, res) => {
    try {
        const address = await Address.find()
        res.json(address)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

/**
 * @createAddress endpoint - creates and appends the mongoDB
*/
app.post('/', async (req, res) => {
    const address = new Address({
        city: req.body.city,
        street: req.body.street,
        postcode: req.body.postcode
    })
    try {
      await address.save()
      res.status(201).send({address});
    } catch (error) {
      res.status(400).send(error)
    }
  }
);

/** 
* @listen 
*/
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});