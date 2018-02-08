const orderdb = require('../db/orderdb.js')
const orderFooddb = require('../db/orderFooddb.js')

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {

  //提交订单
  newOrder: async ctx => {
    while (!canOrder) {
      pending = parseInt(1000 * Math.random())
      await sleep(pending)
    }
    canOrder = 0
    var req, req0, res, res0, t, t0, status, pending
    req = ctx.request.body
    res = await orderdb.getLastOrder(req)
    t = typeof (res)
    status = 1
    if (t == 'object' && res.length > 0) {
      req.orderId = res[0].orderId + 1
    } else if (t == 'object' && res.length == 0) {
      req.orderId = 1
    } else {
      status = -1
    }
    if (status != -1) {
      res = await orderdb.newOrder(req)
      t = typeof (res)
      if (t == 'object') {
        for (var i = 0; i < req.orderFood.length; i++) {
          req0 = req.orderFood[i]
          req0.shopId = req.shopId
          req0.orderId = req.orderId
          req0.date = req.date
          res0 = await orderFooddb.newOrderFood(req0)
          t0 = typeof (res0)
          if (t0 != 'object') {
            res = await orderdb.delOrder(req0)
            res0 = await orderFooddb.delOrderFood(req0)
            t = typeof (res)
            t0 = typeof (res0)
            if (t == 'object' && t0 == 'object') {
              status = -1
              break
            } else {
              status = 0
              break
            }
          }
        }
      } else {
        status = -1
      }
    }

    canOrder = 1

    ctx.body = {
      status: status
    }
  },

  //完成订单
  finishOrder: async ctx => {
    let req = ctx.request.body
    let res = await orderdb.finishOrder(req)
    let t = typeof (res)
    let status = t == 'object' ? 1 : -1
    
    ctx.body = {
      status: status
    }
  },

  //获取未完成订单
  getUnfinishOrder: async ctx => {
    var req, req0, res, res0, status
    var unfinishOrder = []
    req = ctx.request.body
    res = await orderdb.getUnfinishOrder(req)
    let t = typeof(res)
    if(t == 'object' ){
      status = 1
      for(var i = 0; i < res.length;i++){
        req0={
        shopId : res[i].shopId,
        orderId : res[i].orderId,
        date : res[i].date
        }
        
        res0 = await orderFooddb.getOrderFood(req0)
        let t0=typeof(res0)
        if(t0 == 'object'){
          unfinishOrder[i] = {
          order:res[i],
          orderFood:res0
          }
        }else{
          status = -1
          break
        }
      }
    }else{
      status = -1
    }

   
    ctx.body = {
      status: status,
      unfinishOrder: unfinishOrder
    }
  },
}