// pages/eatHereOrder/eatHereOrder.js
var period = require('../../utils/period.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFoodList: ["打包自取", "堂食", "打包配送"],
    address: '广州市番禺区兴业大道东855号',
    order: ''
  },

  modifyOrder: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  submit: function () {
    getApp().globalData.order = this.data.order
    //支付接口
    wx.navigateTo({
      url: '../paySuccess/paySuccess',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.order = {
      openId: "objYV0feu9WbSIydHi5LrNlStxlw",
      shopId: 1,
      tableId: 1,
      cost: 76,
      date: '2018-02-18',
      time: '14:00',
      ifEatHere: 1,
      ifFinish: 0,
      orderFood: [
        {
          foodId: 1,
          foodName: "小面",
          singlePrice: 14,
          orderNum: 2,
          foodProperty: '小份,中麻,中辣',
        }, {
          foodId: 2,
          foodName: '摊摊面',
          foodNum: 3,
          singlePrice: 16,
          orderNum: 3,
          foodProperty: '大份,中麻,中辣',
        }
      ]
    }
    getApp().globalData.shop = {
      shopName: '佛系青蛙暨大店'
    }
    var that = this
    var order = getApp().globalData.order
    order.shopName = getApp().globalData.shop.shopName
    period.getPeriod(order.date, order.time, function(res){
      order.period = res
      that.setData({
        order: order
      })
    })
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