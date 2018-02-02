var net = require('./net.js')
var config = require('../config.js')

module.exports = {
  
  /*获取菜品列表
  data = {
    shopId
  }
  */
  getFoodList: function (data, callback) {
    net.request(data, config.service.getFoodListUrl, function (res) {
      callback(res)
    })
  },

  /*上传菜品
  data = {
    shopId,
    foodTypeId,
    foodName,
    leastPrice,
    priceProperty,
    multiProperty,
    singleProperty,
    foodPhoto,
    remark,
    ifSoldOut
  }
  */
  newFood: function (data, callback) {
    net.request(data, config.service.newFoodUrl, function (res) {
      callback(res)
    })
  },
}