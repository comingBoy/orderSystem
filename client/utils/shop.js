var net = require('./net.js')
var config = require('../config.js')

//获取食物清单

module.exports = {
  /*
  data = {
    shopId
  }
  */
  getShopInfo: function (data, callback) {
    net.request(data, config.service.getShopInfoUrl, function (res) {
      callback(res)
    })
  }
}