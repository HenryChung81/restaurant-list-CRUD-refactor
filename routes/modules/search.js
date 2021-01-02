const express = require('express')
const router = express.Router()
const RestaurantListModels = require('../../models/restaurant')


router.get("/", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  RestaurantListModels
    .find()
    .lean()
    .then((RestaurantListModels) => {
      const searchRestaurant = RestaurantListModels.filter(
        RestaurantListModels => {
          return (
            RestaurantListModels.name.toLowerCase().includes(keyword) || RestaurantListModels.category.toLowerCase().includes(keyword))
        })
      res.render("index", { RestaurantListModels: searchRestaurant, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router