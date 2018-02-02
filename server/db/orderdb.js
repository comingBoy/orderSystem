var mysqlHelper = require("./mysqlHelper.js")

module.exports = {

  //提交订单
  async newOrder(args) {
    let sql = 'INSERT INTO orderdb(orderId, shopId, tableId, cost, date, time, ifEatHere, ifFinish) VALUE(?,?,?,?,?,?,?,?)'
    let params = [args.orderId, args.shopId, args.tableId, args.cost, args.date, args.time, args.ifEatHere, args.ifFinish]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //获取订单ID
  async getOrderId(args) {
    let sql = 'SELECT orderId FROM orderdb where shopId= ?, tableId= ?, cost= ?, date= ?, time= ?, ifEatHere= ?, ifFinish= ?'
    let params = [args.shopId, args.tableId, args.cost, args.date, args.time, args.ifEatHere, args.ifFinish]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //删除订单
  async delOrder(args) {
    let sql = 'DELETE FROM orderdb WHERE orderId = ? and shopId = ? and date = ?'
    let params = [args.orderId, args.shopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },

  //获取上一个订单
  async getLastOrder(args) {
    let sql = 'SELECT * FROM orderdb where id in(select max(id) from orderdb WHERE shopId = ? and date = ?)'
    let params = [args.shopId, args.date]
    let result = await mysqlHelper.query(sql, params)
    return result
  },  

  //获取未完成订单
  async getUnfinishOrder(args) {
    let sql = 'SELECT * FROM orderdb where ifFinish = 0 and shopId = ? and date = ? '
    let params = [args.shopId,args.date] 
    let result = await mysqlHelper.query(sql, params)
    return result
  },
}