/*
============================================
; Title: Assignment customers.js 
; Author: Professor Krasso 
; Date: 02/12/2023
; Modified By: Brooks
; Description: 
============================================
*/ 

/**
 * And, create a new mongoose model named Customer 
 * with properties for customerId and email.  
 * Set both properties data types to strings, make them unique, and required.
 */

// DOUBLE CHECK THIS!! book pg 126
const mongoose = require("mongoose");


// Define the customer schema with fields for customerId and email

let customerSchema  = new mongoose.Schema({
	customerId: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true }
});

// Every mongoose model needs to be exported as a mongoose model. PP 
module.exports = mongoose.model("Customer", customerSchema);