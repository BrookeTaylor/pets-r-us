/*
============================================================
; Title: Pet-R-Us
; Author: Professor Krasso
; Date: 2/19/2023
; Description: index.js file for our Pets-R-Us site.
;============================================================
*/
// imports 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");


const Customer = require("./models/customers");
const Appointment = require("./models/appointment");


mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 3000;
const conn = "mongodb+srv://web340_admin:pa55word@bellevueuniversity.kqpr8ra.mongodb.net/?retryWrites=true&w=majority";


mongoose
	.connect(conn)
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.log('Database connection error: ' + err.message);
	});


app.engine('html', require('ejs').__express);

// Static Files
app.use(express.static("public"));
app.use("/stylesheets", express.static(__dirname + "public/stylesheets"));
app.use("/images", express.static(__dirname + "public/images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Views
app.set("views", "./views");
app.set("view engine", "html");





app.get("/", (req, res) => {
    res.render("index.html", { title: "Index page"});
});

app.get("/grooming", (req, res) => {
    res.render("grooming", { text: "Grooming Page"});
});

app.get("/boarding", (req, res) => {
    res.render("boarding", { text: "Boarding Page"});
});

app.get("/training", (req, res) => {
    res.render("training", { text: "Training Page"});
});

app.get("/registration", (req, res) => {
    res.render("registration");
});


app.get("/customer-list", (req, res, next) => {
	Customer.find({}, (err, customer) => {
		if (err) {
		  console.error(err);
		  res.status(500).send("error");
		} else {
		  res.render("customer-list", { customers: customer });
		}
	  });
})

app.post("/customers", (req, res, next) => {

    // create a new order
    const newCustomer = new Customer ({
        customerId: req.body.customerId,
        email: req.body.email
    });


	newCustomer
	.save()
	.then(result => {
		console.log(result);
		res.render("index.html");
	})

    .catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
});


app.get("/booking", (req, res) => {

	let jsonFile = fs.readFileSync('./public/data/services.json');
	let services = JSON.parse(jsonFile);

	res.render("booking", { services: services });

});

app.post("/booking", (req, res, next) => {


	const newAppointment = new Appointment ({
 
	   userName: req.body.userName,
	   firstName: req.body.firstName,
	   lastName: req.body.lastName,
	   email: req.body.email,
	   services: req.body.services
	});
 
 
   newAppointment
   .save()
   .then(result => {
	  console.log(result);
	  res.render("index.html");
   })
 
	.catch(err => {
	  console.log(err);
	  res.status(500).json({
		 error: err
	  })
   })
 });


 app.get("/my-appointments", (req, res) => {
	Appointment.find({}, (err, appointment) => {
		if (err) {
		  console.error(err);
		  res.status(500).send("error");
		} else {
		  res.render("my-appointments", { appointments: appointment });
		}
	  });
});

app.get('/api/appointments/:email', (req, res, next) => {
	Appointment.find({'email': req.params.email}, (err, appointments) => {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.json(appointments);
		}
	})
})



// Listen on port 3000
app.listen(PORT, () => console.info(`Listening on port ${PORT}`));