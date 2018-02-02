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
  }
}