var net = require('./net.js')
var config = require('../config.js')

//获取食物清单

module.exports = {
   getFoodList: function(data, callback) {
    net.request(data, config.service.testUrl, function (res) {
      callback(res)
    })
  }
}