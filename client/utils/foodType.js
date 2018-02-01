var net = require('./net.js')
var config = require('../config.js')

//获取食物清单

module.exports = {
  /*
  data = {
    shopId
  }
  */
   getFoodTypeList: function(data, callback) {
    net.request(data, config.service.getFoodTypeUrl, function (res) {
      callback(res)
    })
  }
}