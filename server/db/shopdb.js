var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //获取店铺信息
  async getShopInfo(args) {
    let sql = 'SELECT * FROM shopdb where shopId = ?'
    let params = [args.shopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  },


//修改营业时间
  async changeShopTime(args) {
    let sql = 'UPDATE shopdb SET openTime = ?, closeTime = ? where shopId = ?'
    let params = [args.openTime,args.closeTime,args.shopId]
    let result = await mysqlHelper.query(sql, params)
    return result
  }
}
