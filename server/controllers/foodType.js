const foodTypedb = require('../db/foodTypedb.js')
module.exports = {

  //获取菜品种类列表
  getFoodTypeList: async ctx => {
    let req = ctx.request.body
    let res = await foodTypedb.getFoodTypeList(req)
    let t = typeof (res)
    let status = t == 'object' ? 1 : -1
    ctx.body = {
      status: status,
      foodTypeList: res
    }
  },

    newFoodType: async ctx => {
    let req = ctx.request.body
    let res = await foodTypedb.newFoodType(req)
    let t = typeof (res)
    let status = t == 'object' ? 1 : -1
    ctx.body = {
      status: status
      }
  }


/*
  module.exports = {
    getCheckpoint: async ctx => {
      let req = ctx.request.body
      let res = await checkpointdb.getCheckpointInfo(req)
      var status, result0
      let t = typeof (res)
      if (t == 'object') {
        res.length > 0 ? status = 1 : status = 0
      } else {
        status: -1
      }
      result0 = {
        status: status,
        res: res
      }
      ctx.body = {
        result: result0
      }
    },
  }
  */
}