// pages/eatHereOrder/eatHereOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFoodList: ["打包自取", "堂食", "打包配送"],
    address: '广州市番禺区兴业大道东855号',
    order: {
      shopName:'佛系青蛙暨大店',
      period: '2月6日（周二） 晚餐',
      ifEatHere: 1,
      cost: 76,
      orderFood: [
        {
          foodName: '小面',
          foodNum: 2,
          singlePrice: 14,
          foodProperty: '小份,中麻,中辣'
        }, {
          foodName: '摊摊面',
          foodNum: 3,
          singlePrice: 16,
          foodProperty: '大份,中麻,中辣'
        }
      ]
    }
  },

  modifyOrder: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  submit: function () {
    //支付接口
    wx.navigateTo({
      url: '../paySuccess/paySuccess',
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