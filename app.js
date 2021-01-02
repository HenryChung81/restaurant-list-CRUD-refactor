// require package used in the project
const express = require("express");
const mongoose = require("mongoose")
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./routes")
const app = express();
const port = 3000;

// connection
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));

// setting static files
app.use(express.static("public"));

app.use(methodOverride('_method'))

app.use(routes)

// start and listen the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
