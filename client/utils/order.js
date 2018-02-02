var net = require('./net.js')
var config = require('../config.js')

module.exports = {
  
  /*提交订单
  data = {
    shopId,
    tableId,
    cost,
    date,
    time,
    ifEatHere,
    ifFinish(0),
    orderFood:[
      {
        foodId,
        foodName,
        singlePrice,
        orderNum,
        foodProperty
      },
      ...
    ]
  }
  */
  newOrder: function (data, callback) {
    net.request(data, config.service.newOrderUrl, function (res) {
      callback(res)
    })
  },

  //获取未完成订单
  getUnfinishOrder: function (data, callback) {
    net.request(data, config.service.getUnfinishOrderUrl, function (res) {
      callback(res)
    })
  },
}