var net = require('./net.js')
var config = require('../config.js')

module.exports = {
  /*
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