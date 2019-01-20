const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Department} = require('./models/department');
const {Employee} = require('./models/employee');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/departments', async (req, res) => {
    try {
        const body = _.pick(req.body, ['name', 'purpose']);
        const department = new Department(body);
        await department.save();
        res.send(department);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/departments', async (req, res) => {
    try {
        const departments = await Department.find();
        res.send(departments)
    } catch (e) {
        res.status(400).send(e);
    }
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});