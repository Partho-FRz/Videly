const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  Customer,
  validate
} = require('../models/customer');
router.get('/', async (req, res) => {
  try {
    await Customer.find()
      .sort('name')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err.message);
      });
    // res.send(customers);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('Cant find the Customer Please chceck again');
  res.send(customer);
});

router.post('/', auth, async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    number: req.body.number
  });
  customer = await customer.save();
  res.send(customer);
});
router.put('/:id', auth, async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('Cant find the Customer Please chceck again');
  const {
    error
  } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  customer.name = req.body.name;
  customer.isGold = req.body.isGold;
  customer.number = req.body.number;
  customer = await customer.save();
  res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send('Cant find the Customer please check again');
  res.send(customer);
});
module.exports = router;