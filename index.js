const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/customercli',{useNewUrlParser: true});

const Customer = require('./models/customer');

//add customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        mongoose.connection.close();
    });
}

//find customer
const findCustomer = (name) => {
    //make case sensitive
    const search  = new RegExp(name,'i');
    Customer.find({$or:[{firstname: search},{lastname: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        mongoose.connection.close();
    });
}

// update customer
const updateCustomer = (_id, customer) => {
    Customer.update({_id}, customer)
     .then(customer => {
         console.info('Customer Updated');
         mongoose.connection.close();
     });
}
//remove customer
const removeCustomer = (_id) => {
    Customer.remove({_id})
     .then(customer => {
         console.info('Customer Removed');
         mongoose.connection.close();
     });
}

// List customers
const listCustomers = () => {
    Customer.find()
     .then(customers => {
         console.info(customers);
         console.info(`${customers.length} customers`);
         mongoose.connection.close();
     });
}


module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}