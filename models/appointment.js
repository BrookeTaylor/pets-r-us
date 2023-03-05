/*
============================================
; Title: Assignment appointment.js 
; Author: Professor Krasso 
; Date: 02/26/2023
; Modified By: Brooks
; Description: Schema for appointments.
============================================
*/ 


/**
 * 
  Design and develop a mongoose model for appointments.  
  Be sure to include the following fields: 
  userName, firstName, lastName, email, service
 * 
 */
const mongoose = require("mongoose");

let appointmentSchema  = new mongoose.Schema({

    userName: { type: String, required: true },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true }, 
    email: { type: String, required: true },
    services: { type: String, required: true }

});

// Every mongoose model needs to be exported as a mongoose model. PP 
module.exports = mongoose.model("Appointment", appointmentSchema);