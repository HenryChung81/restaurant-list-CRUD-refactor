// 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// 引用 restaurant model
const RestaurantListModels = require("../../models/restaurant")

// 定義首頁路由
router.get("/", (req, res) => {
  const keyword = req.query.keyword || ''
  const sort = req.query.sort || 'name'
  RestaurantListModels.find(
    {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } }
      ]
    })
    // past the restaurant data into 'index' partial template
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ [sort]: 'asc' })
    .then(RestaurantListModels =>
      res.render("index", { RestaurantListModels, keyword, sort })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) //錯誤處理
})

// 匯出路由模組
module.exports = router