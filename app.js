// require package used in the project
const express = require("express");
const exphbs = require("express-handlebars");
const hbsHelpers = require('./helpers/handlebars')
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require("./routes")
require('./config/mongoose')

const app = express();
const port = 3000;

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs", helpers: hbsHelpers }));
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
