var net = require('./net.js')
var config = require('../config.js')

module.exports = {
  
  /*提交订单
  data = {
    openId,
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
      callback(res.data)
    })
  },

  /*完成订单
  data = {
    orderId
  }
  */
  finishOrder: function (data, callback) {
    net.request(data, config.service.finishOrderUrl, function (res) {
      callback(res.data)
    })
  },

  //获取未完成订单
  getUnfinishOrder: function (data, callback) {
    net.request(data, config.service.getUnfinishOrderUrl, function (res) {
      callback(res.data)
    })
  },

  //获取我的订单
  getMyOrder: function (data, callback) {
    net.request(data, config.service.getMyOrderUrl, function (res) {
      callback(res.data)
    })
  },
}