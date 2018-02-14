// pages/shopManage/shopManage.js
var food = require('../../utils/food.js')
var foodType = require('../../utils/foodType.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFoodInfo: null,
    foodListIndex: null,
    foodIndex: null,
    chooseProperty: true,
    modifyProperty: true,
    hiddenShoppingCartDetail: true,
    imagesList: [],
    addressName: "绿地缤纷城店",
    tableNum: 1,
    classChooseId: 0,
    orderType: "店内点单(堂食)",
    foodList: [],
    shoppingCart: [],
    shoppingCartNum: 0,
    allPrice: 0,
    allNum: 0,
    orderFood: null,
    finishChooseProperty: false,
    finishModifyProperty: true,
  },

  refresh: function (e) {
    var that = this
    var data = {
      shopId: e
    }
    food.getFoodList(data, function (res) {
      var foodList = res.foodList
      for (var i = 0; i < foodList.length; i++) {
        for (var j = 0; j < foodList[i].thisTypeFoodList.length; j++) {
          foodList[i].thisTypeFoodList[j].hasProperty = false
          if (foodList[i].thisTypeFoodList[j].priceProperty != null && foodList[i].thisTypeFoodList[j].priceProperty != "") {
            foodList[i].thisTypeFoodList[j].hasProperty = true
            var str = foodList[i].thisTypeFoodList[j].priceProperty
            foodList[i].thisTypeFoodList[j].priceProperty = new Array()
            foodList[i].thisTypeFoodList[j].priceProperty = that.getProperty(str)
          } else {
            foodList[i].thisTypeFoodList[j].priceProperty = []
          }
          if (foodList[i].thisTypeFoodList[j].singleProperty != null && foodList[i].thisTypeFoodList[j].singleProperty != "") {
            foodList[i].thisTypeFoodList[j].hasProperty = true
            var str = foodList[i].thisTypeFoodList[j].singleProperty
            foodList[i].thisTypeFoodList[j].singleProperty = new Array()
            foodList[i].thisTypeFoodList[j].singleProperty = that.getProperty(str)
          } else {
            foodList[i].thisTypeFoodList[j].singleProperty = []
          }
          if (foodList[i].thisTypeFoodList[j].multiProperty != null && foodList[i].thisTypeFoodList[j].multiProperty != "") {
            foodList[i].thisTypeFoodList[j].hasProperty = true
            var str = foodList[i].thisTypeFoodList[j].multiProperty
            foodList[i].thisTypeFoodList[j].multiProperty = new Array()
            foodList[i].thisTypeFoodList[j].multiProperty = that.getProperty(str)
            for (var k = 0; k < foodList[i].thisTypeFoodList[j].multiProperty.length; k++) {
              foodList[i].thisTypeFoodList[j].multiProperty[k].required = false
            }
          } else {
            foodList[i].thisTypeFoodList[j].multiProperty = []
          }
        }
      }

      for (var i = 0; i < foodList.length; i++) {
        foodList[i]['className'] = foodList[i]['foodTypeName']
        foodList[i]['classID'] = 'class' + foodList[i]['foodTypeId']
        foodList[i]['list'] = foodList[i]['thisTypeFoodList']
        delete foodList[i]['foodTypeName']
        delete foodList[i]['thisTypeFoodList']
        for (var j = 0; j < foodList[i].list.length; j++) {
          foodList[i].list[j].orderList = new Array()
          foodList[i].list[j]['name'] = foodList[i].list[j]['foodName']
          foodList[i].list[j]['photo'] = foodList[i].list[j]['foodPhoto']
          foodList[i].list[j]['sellOut'] = foodList[i].list[j]['ifSoldOut']
          foodList[i].list[j]['sellOut'] = foodList[i].list[j]['sellOut'] == 1 ? true : false
          foodList[i].list[j]['mulProperty'] = foodList[i].list[j]['multiProperty']
          delete foodList[i].list[j]['foodName']
          delete foodList[i].list[j]['foodPhoto']
          delete foodList[i].list[j]['ifSoldOut']
          delete foodList[i].list[j]['multiProperty']
        }
      }
      that.setData({
        foodList: foodList
      })
      console.log(foodList)
      wx.hideLoading()
    })
  },

  //将属性转换为对象
  getProperty: function (e) {
    var property = new Array()
    var index = 0, len = -1, num = -1, price
    for (var i = 0; i < e.length; i++) {
      if (e[i] == ":") {
        num = -1
        len++
        property[len] = new Object()
        property[len].propertyList = new Array()
        property[len].propertyName = e.substring(index, i)
        property[len].required = true,
          property[len].beChoosed = false
        property[len].isMul = false
        index = i + 1
      }
      if (e[i] == "(") {
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i + 1
      }
      if (e[i] == ")") {
        property[len].propertyList[num].price = parseInt(e.substring(index, i))
        index = i + 1
      }
      if (e[i] == "," && e[i - 1] != ")") {
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i + 1
      } else if (e[i] == "," && e[i - 1] == ")") {
        index = i + 1
      }
      if (e[i] == ";" && e[i - 1] != ")") {
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i + 1
      } else if (e[i] == ";" && e[i - 1] == ")") {
        index = i + 1
      }
    }
    return property
  },

  changeSell: function(e){
    var that = this
    var list = e.currentTarget.id.split("+")
    this.data.foodList[parseInt(list[0])].list[parseInt(list[1])].sellOut= !this.data.foodList[parseInt(list[0])].list[parseInt(list[1])].sellOut  
    var data = {
      foodId: this.data.foodList[parseInt(list[0])].list[parseInt(list[1])].foodId,
      ifSoldOut: this.data.foodList[parseInt(list[0])].list[parseInt(list[1])].sellOut
    }
    food.changeSell(data, function(res) {
      if(res.status == 1) {
        that.setData({
          foodList: that.data.foodList
        })
      } else {
        util.showModel("提示","请求出错")
      }
    })
  },

  back: function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopId = 1
    wx.showLoading({
      title: '读取中，请稍后',
    })
    this.refresh(shopId)
  },

  /**
  * 选择类别
  */
  chooseClass: function (e) {
    var toClass = e.currentTarget.dataset.class
    this.setData({
      classChooseId: e.currentTarget.id,
      toClass: toClass
    })
  },
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imagesList,
      success: function (res) { console.log("成功") },
      fail: function (res) { console.log("失败") },
      complete: function (res) { },
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