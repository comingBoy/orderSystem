// pages/welcome/welcome.js
var util = require('../../utils/util.js')
var shop = require('../../utils/shop.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    width: '',
    tapList: [0,0,0,0],
    inputCode: false,
    shopInfo: ''
  },

  eatHere: function () {
    getApp().globalData.ifEatHere = 1
    /*调用扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
    */
    wx.navigateTo({
      url: '../index/index',
    })
  },

  eatOut: function () {
    getApp().globalData.ifEatHere = 0
    wx.navigateTo({
      url: '../index/index',
    })
  },

  tap: function (e) {
    this.data.tapList[e.currentTarget.id] = 1
    this.toBackend()
  },

  toBackend: function () {
    var that = this
    if (this.data.tapList[0] == 1 && this.data.tapList[1] == 1 && this.data.tapList[2] == 1 && this.data.tapList[3] == 1) {
      that.setData({
        inputCode: true,
        tapList: [0,0,0,0]
      })
    } else {
      that.setData({
        inputCode: false,
      })
    }
  },

  formSubmit: function(e) {
    if (e.detail.value.code == "123456") {
      wx.reLaunch({
        url: '../unFinishOrder/unFinishOrder',
      })
    } else {
      util.showModel("提示","密码错误！")
    }
  },

  shopManage: function () {
    wx.reLaunch({
      url: '../shopManage/shopManage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth
        })
      }
    })
    var shopId = 1
    var data = {
      shopId: shopId
    }
    wx.showLoading({
      title: '读取中，请稍后',
    })
    shop.getShopInfo(data, function (res) {
      if (res.status == 1) {
        getApp().globalData.shopInfo = res.shopInfo[0]
        that.setData({
          shopInfo: res.shopInfo[0]
        })
      } else if (res.status == -1) {
        util.showModel("提示", "获取店铺信息失败，请重试！")
      } else {
        util.showModel("提示", "请求失败！")
      }
      wx.hideLoading()
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