// pages/test/test.js
var food = require('../../utils/food.js')
var shop = require('../../utils/shop.js')
var order = require('../../utils/order.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  test: function () {
    var data = {
      shopId: 1,
      tableId: 1,
      cost: 52,
      date: "2018-02-02",
      time: "23:57",
      ifEatHere: 1,
      ifFinish: 0,
      orderFood:[
        {
          foodId: 1,
          foodName: "小面",
          singlePrice: 18,
          orderNum: 2,
          foodProperty: "大碗,微辣,微麻,少油"
        },{
          foodId: 2,
          foodName: "摊摊面",
          singlePrice: 14,
          orderNum: 1,
          foodProperty: "小碗"
        }
      ]
    }
    order.newOrder(data, function (res) {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})