// pages/unFinishOrder/unFinishOrder.js
var order = require('../../utils/order.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getFoodList: ["打包自取", "堂食", "打包配送"],
    unfinishOrder: []
  },

  refresh: function () {
    var that = this
    var shopId = 1
    var ifFinish = 0
    var date = util.getCurrentDateYMD()
    var data = {
      shopId: shopId,
      date: date,
      ifFinish: ifFinish
    }
    wx.showLoading({
      title: '读取中，请稍后',
    })
    order.getOrder(data, function (res) {
      if (res.status == 1 && res.order.length > 0) {
        res.order.reverse
        that.setData({
          unfinishOrder: res.order
        })
      } else if (res.status == 1 && res.myOrder.length == 0) {
        util.showModel("提示", "尚无订单")
      } else {
        util.showModel("提示", "请求出错，请重试")
      }
      wx.hideLoading()
    })
  },

  sleep: function(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },


  finishOrder: function (e) {
    var that = this
    var id = that.data.unfinishOrder[e.currentTarget.id].id
    var data = {
      id: id
    }
    order.finishOrder(data, function(res) {
      if (res.status == 1) {
        util.showSuccess('操作成功！')
        setTimeout(function(){
          that.refresh()
        } , 500)      
      } else {
        util.showModel("提示", "请求出错，请重试")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh()
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