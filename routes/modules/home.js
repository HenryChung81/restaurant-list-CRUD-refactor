// 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// 引用 restaurant model
const RestaurantListModels = require("../../models/restaurant")

// 定義首頁路由
router.get("/", (req, res) => {
  // past the restaurant data into 'index' partial template
  RestaurantListModels.find() // 取出 RestaurantListModels 裡面的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(RestaurantListModels => res.render("index", { RestaurantListModels })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) //錯誤處理
});

// 匯出路由模組
module.exports = router