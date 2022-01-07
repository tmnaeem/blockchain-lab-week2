'use strict'
require("dotenv").config();
const express = require("express")
require("./db/mongoose")
const Edu = require("./models/edu")

/**
 * @constants
 * @setHostAt "0.0.0.0" instead or localhost
 */
const HOST = "0.0.0.0";
const PORT = 8485;

const app = express();
app.use(express.json())
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @getEdu endpoint - fetch data from our mongoDB 
 */
app.get('/', async (req, res) => {
    try {
        const edu = await Edu.find()
        res.json(edu)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

/**
 * @createEdu endpoint - creates and appends the mongoDB
*/
app.post('/', async (req, res) => {
    const edu = new Edu({
        name: req.body.name,
        location: req.body.location,
        field: req.body.email
    })
    try {
      await edu.save()
      res.status(201).send({edu});
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