var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  async getFoodList(args) {
    let sql = 'SELECT * FROM fooddb where foodTypeId = ? and shopId = ?'
    let params = [args.foodTypeId, args.shopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

}