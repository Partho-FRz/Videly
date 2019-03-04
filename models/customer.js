const mongoose = require('mongoose');
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    number: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 11
    }
});

const Customer = mongoose.model("Customer", customerSchema);

function ValidateCustomers(customer) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        isGold: Joi.boolean().required(),
        number: Joi.string().min(11).max(11).required()
    };
    return Joi.validate(customer, schema);
}
module.exports.Customer = Customer;
module.exports.validate = ValidateCustomers;
module.exports.customerSchema = customerSchema;