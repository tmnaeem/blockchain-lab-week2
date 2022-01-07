'use strict'
require("dotenv").config();
const express = require("express")
require("./db/mongoose")
const Job = require("./models/job")

/**
 * @constants
 * @setHostAt "0.0.0.0" instead or localhost
 */
const HOST = "0.0.0.0";
const PORT = 8485;

const app = express();
app.use(express.json())
const bodyParser = require("body-parser")

console.log("DDDDD", process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @getJobs endpoint - fetch data from our mongoDB 
 */
app.get('/', async (req, res) => {
    try {
        const job = await Job.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

/**
 * @createJObs endpoint - creates and appends the mongoDB
*/
app.post('/', async (req, res) => {
    const job = new Job({
        position: req.body.position,
        experience: req.body.experience,
        skill: req.body.skill
    })
    try {
      await job.save()
      res.status(201).send({job});
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