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
});

app.post('/employees', async (req, res) => {
    try {
        const body = _.pick(req.body, ['name', 'jobTitle', 'email', 'department']);
        const employee = new Employee(body);
        await employee.save();
        res.send(employee);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/department/:id', async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    try {
        const requestedDep = await Department.findOne({
            _id: id
        });
        const employees = await Employee.find({
            department: requestedDep.name
        });
        res.send(employees);
    } catch (e) {
        res.status(400).send(e);
    }
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});