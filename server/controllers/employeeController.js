const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');

const getEmployees = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const employees = await Employee.find({ _id });
  res.status(200).json(employees);
});

const setEmployee = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const data = req.body;
  const user = await Employee.findOne({ _id });

  if (!user) {
    const newUser = await Employee.create(data);
    res.status(201).json(newUser.employees.pop());
    return;
  }

  const employeeId = data.employees[0]._id;
  const employeeEmail = data.employees[0].email;
  const employee = user.employees.find(
    (employee) =>
      employee._id === employeeId || employee.email === employeeEmail
  );

  if (employee) {
    res.status(400);
    throw new Error('Employee with that id or email already exists');
  }

  const modifyUser = await Employee.findOneAndUpdate(
    { _id },
    { $addToSet: { employees: data.employees[0] } },
    {
      new: true,
    }
  );
  res.status(201).json(modifyUser.employees.pop());
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const employeeId = req.params.id;
  const user = await Employee.findOne(
    { _id },
    { employees: { $elemMatch: { _id: employeeId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.employees.length === 0) {
    res.status(400);
    throw new Error('No employee found');
  }

  res.status(201).json(user.employees[0]);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const employeeId = req.params.id;
  const user = await Employee.findOne(
    { _id },
    { employees: { $elemMatch: { _id: employeeId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.employees.length === 0) {
    res.status(400);
    throw new Error('No employee found');
  }

  const data = req.body.employees[0];
  await Employee.updateOne(
    { 'employees._id': employeeId },
    { $set: { 'employees.$': data } }
  );

  const modifyUser = await Employee.findOne(
    { _id },
    { employees: { $elemMatch: { _id: employeeId } } }
  );
  res.status(201).json(modifyUser.employees.pop());
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const _id = req.user.uid;
  const employeeId = req.params.id;
  const user = await Employee.findOne(
    { _id },
    { employees: { $elemMatch: { _id: employeeId } } }
  );

  if (!user) {
    res.status(400);
    throw new Error('No user found');
  } else if (user.employees.length === 0) {
    res.status(400);
    throw new Error('No employee found');
  }

  await Employee.updateOne(
    { 'employees._id': employeeId },
    { $pull: { employees: { _id: employeeId } } }
  );
  res.status(200).json({ employeeId });
});

module.exports = {
  getEmployees,
  setEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
