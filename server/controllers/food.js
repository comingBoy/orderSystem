const foodTypedb = require('../db/foodTypedb.js')
const fooddb = require('../db/fooddb.js')
module.exports = {
  getFoodList: async ctx => {
    var req, req0, res, res0, t, t0, status
    var foodList = []
    req = ctx.request.body
    res = await foodTypedb.getFoodTypeList(req)
    console.log(res)
    t = typeof (res)
    if (t == 'object' && res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        res0 = await fooddb.getFoodList(res[i])
        t0 = typeof (res0)
        if (t0 == 'object') {
          foodList[i] = {
            foodTypeName: res[i].foodTypeName,
            foodTypeId: res[i].foodTypeId,
            thisTypeFoodList: res0
          }
        } else {
          status = -1
          break
        }
      }
      status = 1
    } else {
      status = -1
    }

    ctx.body = {
      status: status,
      foodList: foodList
    }
  }
}