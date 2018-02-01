//index.js
var foodType = require('../../utils/foodType.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressName : "绿地缤纷城店",
    classChooseId: 0,
    orderType: "店内点单(堂食)",
    foodList : [
      {
        className: "面",
        list: [
          {
            name: "小面",
            photo: "../../images/xiaomian.jpg",
            leastPrice: 14,
            remark: "汤面",
            priceProperty: {
              spec: [
                {
                  name: "小碗",
                  price: 14
                },
                {
                  name: "大碗",
                  price: 16,
                }
              ]
            },
            
            way: ["无麻辣", "微麻辣"],
            Taboos: ["少油"],
          },
          {
            name: "摊摊面",
            photo: "",
            leastPrice: 14,
            remark: "热拌面,没有汤",
            remainNum: -1,
            spec: ["大碗", "小碗"],
            way: ["无麻辣", "微麻辣"],
            Taboos: ["少油"],
          }
        ]
      },
      {
        className: "特色小吃",
        list: [
          {
            name: "极品上上签",
            photo: "",
            leastPrice: 30,
            remark: "15串",
            remainNum: 8,
            spec: [],
            way: [],
            Taboos: [],
          },
          {
            name: "手抓饼",
            photo: "",
            leastPrice: 5,
            remark: "",
            remainNum: 0,
            spec: [],
            way: [],
            Taboos: [],
          }
        ]
      }
    ]
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
    
  },
  /**
   * 选择类别
   */
  chooseClass: function(e) {
    this.setData({
      classChooseId: e.currentTarget.id
    })
  }
})

   
