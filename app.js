// require package used in the project
const express = require("express");
const mongoose = require("mongoose")
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const RestaurantListModels = require("./models/restaurant")

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

app.use(methodOverride('_method'))

// setting static files
app.use(express.static("public"));

// index
app.get("/", (req, res) => {
  // past the restaurant data into 'index' partial template
  RestaurantListModels.find() // 取出 RestaurantListModels 裡面的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(RestaurantListModels => res.render("index", { RestaurantListModels })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) //錯誤處理
});

// new
app.get("/new", (req, res) => {
  return res.render("new")
})

app.post("/restaurant", (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;

  return RestaurantListModels
    .create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// detail
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch((error) => console.log(error))
})

// edit
app.get("/restaurant/:id/edit", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch((error) => console.log(error))
})

app.put("/restaurant/:id/", (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;
  return RestaurantListModels.findById(id)
    .then(restaurant => {
      restaurant.name = name;
      restaurant.name_en = name_en
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(err => console.log(error))
})

// delete
app.delete("/restaurant/:id", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .then((restaurants => restaurants.remove()))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  RestaurantListModels
    .find()
    .lean()
    .then((RestaurantListModels) => {
      const searchRestaurant = RestaurantListModels.filter(RestaurantListModels => {
        return (RestaurantListModels.name.toLowerCase().includes(keyword) || RestaurantListModels.category.toLowerCase().includes(keyword))
      })
      res.render("index", { RestaurantListModels: searchRestaurant, keyword: keyword })
    })
    .catch(error => console.log(error))
})

// start and listen the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
