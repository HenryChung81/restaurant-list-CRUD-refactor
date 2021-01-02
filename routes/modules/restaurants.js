const express = require('express')
const router = express.Router()
const RestaurantListModels = require('../../models/restaurant')

// new
router.get("/new", (req, res) => {
  return res.render("new")
})

router.post("/", (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;

  return RestaurantListModels
    .create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// detail
router.get("/:id", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch((error) => console.log(error))
})

// edit
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch((error) => console.log(error))
})

router.put("/:id/", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const id = req.params.id
  return RestaurantListModels.findById(id)
    .then((restaurants => restaurants.remove()))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router