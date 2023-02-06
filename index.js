// imports 
const express = require("express");
const app = express();
const port = 3000; 


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






// Listen on port 3000
app.listen(port, () => console.info("Listening on port ${port}"));