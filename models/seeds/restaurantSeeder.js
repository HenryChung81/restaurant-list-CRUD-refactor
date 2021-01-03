const restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantListDB = require('../../restaurant.json').results

db.once('open', () => {
  console.log('mongodb connected!')
})

for (let i = 0; i < restaurantListDB.length; i++) {
  restaurant.create(restaurantListDB[i])

  console.log('done!')
}