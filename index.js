// imports 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const Schema = mongoose.Schema;

const Customer = require("./models/customers.js");


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




// Static Files
app.use(express.static("public"));
app.use("/stylesheets", express.static(__dirname + "public/stylesheets"));
app.use("/images", express.static(__dirname + "public/images"));


// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");





app.get("", (req, res) => {
    res.render("index", { text: "Index page"});
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




app.post("/registration", (req, res) => {


	const newCustomer = new Customer({
		customerId: req.body.customerId,
		email: req.body.email
	});




	Customer.create(newCustomer, (err, Customer) => {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render("index", {
				pageHeader: "Welcome to Pets-R-Us!",
				title: "Pets-R-Us: Home"
			})
		}
	});


})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Listen on port 3000
app.listen(PORT, () => console.info("Listening on port ${port}"));