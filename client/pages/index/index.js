//index.js
var food = require('../../utils/food.js')
var foodType = require('../../utils/foodType.js')
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
    imagesList:['../../images/xiaomian.jpg',
      '../../images/tantanmian.jpg',
    ],
    addressName : "绿地缤纷城店",
    tableNum: 1,
    classChooseId: 0,
    orderType: "店内点单(堂食)",
    foodList : [
      {
        className: "面",
        classID: "class0",
        list: [
          {
            name: "小面",
            photo: "../../images/xiaomian.jpg",
            sellOut: false,
            leastPrice: 14,
            price: 14,
            remark: "汤面",
            hasProperty: true,
            priceProperty: [
              {
                propertyName: "规格",
                required: true,//必选
                beChoosed: false,
                isMul: false,
                propertyList:[
                  {
                    name: '大碗',
                    price: 16,
                    beChoosed: false,
                  },
                  {
                    name: '小碗',
                    price: 14,
                    beChoosed: false,
                  }
                ]
              }
            ],
            singleProperty: [
              {
                propertyName: "做法",
                required: true,//必选
                beChoosed: false,
                isMul: false,
                propertyList: [
                  {
                    name: '无麻辣',
                    beChoosed: false,
                  },
                  {
                    name: '微微麻辣',
                    beChoosed: false,
                  },
                  {
                    name: '正常麻辣',
                    beChoosed: false,
                  },
                  {
                    name: '超麻辣',
                    beChoosed: false,
                  }
                ]
              }
            ],
            mulProperty: [
              {
                propertyName: "忌口",
                required: false,
                beChoosed: false,
                isMul: true,
                propertyList: [
                  {
                    name: '少油',
                    beChoosed: false,
                  },
                  {
                    name: '不要葱',
                    beChoosed: false,
                  },
                  {
                    name: '清真',
                    beChoosed: false,
                  },
                  {
                    name: '软面',
                    beChoosed: false,
                  },
                  {
                    name: '硬面',
                    beChoosed: false,   
                  }
                ]
              }
            ],
            orderList:[
        
            ],
          },
          {
            name: "摊摊面",
            photo: "../../images/tantanmian.jpg",
            sellOut: false,
            leastPrice: 14,
            price: 14,
            remark: "汤面",
            hasProperty: true,
            priceProperty: [
              {
                propertyName: "规格",
                propertyList: [
                  {
                    name: '大碗',
                    price: 16,
                  },
                  {
                    name: '小碗',
                    price: 14,
                  }
                ]
              }
            ],
            singleProperty: [

            ],
            mulProperty: [

            ],
            orderList: [
              
            ],
          }
        ]
      },
      {
        className: "特色小吃",
        classID: 'class1',
        list: [
          {
            name: "极品上上签",
            photo: "",
            fixedPrice: true,
            leastPrice: 30,
            remark: "15串",
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
          },
          {
            name: "极品上上签",
            photo: "",
            fixedPrice: true,
            leastPrice: 30,
            remark: "15串",
            spec: [],
            way: [],
            Taboos: [],
          },
        ]
      }
    ],
    shoppingCart:[
      
    ],
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
      var foodList = res.data.foodList
      for(var i=0; i<foodList.length; i++) {
        for(var j=0; j<foodList[i].thisTypeFoodList.length; j++) {
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

      for (var i=0; i<foodList.length; i++) {
        foodList[i]['className'] = foodList[i]['foodTypeName']
        foodList[i]['classID'] = foodList[i]['foodTypeId']
        foodList[i]['list'] = foodList[i]['thisTypeFoodList']
        delete foodList[i]['foodTypeName']
        delete foodList[i]['foodTypeId']
        delete foodList[i]['thisTypeFoodList']
        for (var j=0; j<foodList[i].list.length; j++) {
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
      console.log(foodList)
      
      that.setData({
        foodList: foodList
      })
      
    })
  },

  //将属性转换为对象
  getProperty: function (e) {
    var property = new Array()
    var index = 0, len = -1, num = -1, price
    for(var i=0; i<e.length; i++) {
      if(e[i] == ":") {
        num = -1
        len++
        property[len] = new Object()
        property[len].propertyList = new Array()
        property[len].propertyName = e.substring(index,i)
        property[len].required = true,
        property[len].beChoosed = false
        property[len].isMul = false
        index = i+1
      }
      if(e[i] == "(") {
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i+1
      }
      if(e[i] == ")") {
        property[len].propertyList[num].price = parseInt(e.substring(index, i))
        index = i+1
      }
      if(e[i] == "," && e[i-1] != ")"){
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i+1
      } else if (e[i] == "," && e[i-1] == ")") {
        index = i+1
      }
      if (e[i] == ";" && e[i-1] != ")"){
        num++
        property[len].propertyList[num] = new Object()
        property[len].propertyList[num].name = e.substring(index, i)
        property[len].propertyList[num].beChoosed = false
        index = i+1
      } else if(e[i] == ";" && e[i-1] == ")"){
        index = i+1
      }
    }
    return property
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = { key: '值' };
    obj['abc'] = obj['key'];
    delete obj['key'];
    console.log(obj);
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
    //传入shopId
    var shopId = 1
    this.refresh(shopId)
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
    var toClass = e.currentTarget.dataset.class
    this.setData({
      classChooseId: e.currentTarget.id,
      toClass: toClass
    })
  },
  /**
   * 预览图片
   */
  previewImage: function(e) {
    var current = e.currentTarget.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imagesList,
      success: function(res) {console.log("成功")},
      fail: function(res) {console.log("失败")},
      complete: function(res) {},
    })
  },
  /**
   * 打开选择商品属性窗口
   */
  chooseProperty: function(e){
    var status = e.currentTarget.dataset.status
    var chooseFoodInfo
    if(status == 'open'){
      var foodListIndex = e.currentTarget.dataset.foodlistindex
      var foodIndex = e.currentTarget.dataset.foodindex
      chooseFoodInfo = this.data.foodList[foodListIndex].list[foodIndex]
      //如果没有属性选项不会弹窗
      if (chooseFoodInfo.hasProperty) {
        this.setData({
          chooseFoodInfo: chooseFoodInfo,
          foodListIndex: foodListIndex,
          foodIndex: foodIndex,
        })
      } else {
        return
      }
    }

    //第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,
      transformOrigin: '50% 100% 0'
    })

    //第2步：这个动画实例赋给当前动画实例
    this.animation = animation

    //第3步：执行第一组动画
    animation.opacity(0).scaleY(0).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    }) 

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })
    }.bind(this), 200) 

    if(status == 'open'){
      this.setData({
        chooseProperty: false
      })
    }
    if(status == 'close'){
      this.setData({
        chooseProperty: true,
        finishChooseProperty: false,
      })
    }
  },
  /**
   * 选择商品属性
   */
  choosePro: function(e){
    var src = e.currentTarget.dataset.src
    var propertyindex = e.currentTarget.dataset.propertyindex
    var index = e.currentTarget.dataset.index
    var chooseFoodInfo = this.data.chooseFoodInfo
    var finishChooseProperty = this.data.finishChooseProperty
    if(src == 'single'){
      chooseFoodInfo.singleProperty[propertyindex].beChoosed = true
      for (var i = 0; i < chooseFoodInfo.singleProperty[propertyindex].propertyList.length; i++){
        if(i == index){
          chooseFoodInfo.singleProperty[propertyindex].propertyList[i].beChoosed = true
        }else{
          chooseFoodInfo.singleProperty[propertyindex].propertyList[i].beChoosed = false
        }
      }
    }else if(src == 'mul'){
      chooseFoodInfo.mulProperty[propertyindex].propertyList[index].beChoosed = !chooseFoodInfo.mulProperty[propertyindex].propertyList[index].beChoosed
      for (var i; i < chooseFoodInfo.mulProperty[propertyindex].propertyList.length; i++){
        if (chooseFoodInfo.mulProperty[propertyindex].propertyList[i].beChoosed == true){
          chooseFoodInfo.mulProperty[propertyindex].beChoosed = true
          break;
        }else{
          chooseFoodInfo.mulProperty[propertyindex].beChoosed = false
        }
      }
    }else if(src == 'price'){
      chooseFoodInfo.priceProperty[propertyindex].beChoosed = true
      for (var i = 0; i < chooseFoodInfo.priceProperty[propertyindex].propertyList.length; i++) {
        if (i == index) {
          chooseFoodInfo.priceProperty[propertyindex].propertyList[i].beChoosed = true
        } else {
          chooseFoodInfo.priceProperty[propertyindex].propertyList[i].beChoosed = false
        }
      }
      chooseFoodInfo.price = chooseFoodInfo.priceProperty[propertyindex].propertyList[index].price
    }
    for(var i=0; i<chooseFoodInfo.priceProperty.length; i++){
      if(chooseFoodInfo.priceProperty[i].required == false){
        continue
      }else{
        if (chooseFoodInfo.priceProperty[i].beChoosed == false){
          finishChooseProperty = false
          break
        }else{
          finishChooseProperty = true
        }
      }
    }
    if(finishChooseProperty == true){
      for (var i = 0; i < chooseFoodInfo.singleProperty.length; i++) {
        if (chooseFoodInfo.singleProperty[i].required == false) {
          continue
        } else {
          if (chooseFoodInfo.singleProperty[i].beChoosed == false) {
            finishChooseProperty = false
            break
          } else {
            finishChooseProperty = true
          }
        }
      }
    }
    if(finishChooseProperty == true){
      for (var i = 0; i < chooseFoodInfo.mulProperty.length; i++) {
        if (chooseFoodInfo.mulProperty[i].required == false) {
          continue
        } else {
          if (chooseFoodInfo.mulProperty[i].beChoosed == false) {
            finishChooseProperty = false
            break
          } else {
            finishChooseProperty = true
          }
        }
      }
    }

    this.setData({
      chooseFoodInfo: chooseFoodInfo,
      finishChooseProperty: finishChooseProperty
    })
  },
  /**
   * 将选择好的商品加入购物车
   */
  addToShoppingCart: function(e){
    var allNum = this.data.allNum
    allNum++
    var finishChooseProperty = this.data.finishChooseProperty
    if(!finishChooseProperty) return
    var shoppingCart = this.data.shoppingCart
    var foodList = this.data.foodList
    var orderID = shoppingCart.length
    var chooseFoodInfo = this.data.chooseFoodInfo
    var foodListIndex = this.data.foodListIndex
    var foodIndex = this.data.foodIndex
    var allPrice = this.data.allPrice
    allPrice += chooseFoodInfo.price
    var foodOrder = {
      orderID: orderID,
      foodName: chooseFoodInfo.name,
      num: 1,
      priceProperty: [],
      singleProperty: [],
      mulProperty: [],
      propertyString: "",
      price: chooseFoodInfo.price,
    }
    for(var i=0; i<chooseFoodInfo.priceProperty.length; i++){
      for(var j=0; j<chooseFoodInfo.priceProperty[i].propertyList.length; j++){
        if (chooseFoodInfo.priceProperty[i].propertyList[j].beChoosed == true){
          foodOrder.priceProperty.push(chooseFoodInfo.priceProperty[i].propertyList[j].name)
        }
      }
    }
    for (var i = 0; i < chooseFoodInfo.singleProperty.length; i++) {
      for (var j = 0; j < chooseFoodInfo.singleProperty[i].propertyList.length; j++) {
        if (chooseFoodInfo.singleProperty[i].propertyList[j].beChoosed == true) {
          foodOrder.singleProperty.push(chooseFoodInfo.singleProperty[i].propertyList[j].name)
        }
      }
    }
    for (var i = 0; i < chooseFoodInfo.mulProperty.length; i++) {
      for (var j = 0; j < chooseFoodInfo.mulProperty[i].propertyList.length; j++) {
        if (chooseFoodInfo.mulProperty[i].propertyList[j].beChoosed == true) {
          foodOrder.mulProperty.push(chooseFoodInfo.mulProperty[i].propertyList[j].name)
        }
      }
    }
    //遍历查找是否有相同属性的商品在购物车中,有的话把Num加1，并且跳出函数
    for (var item of foodList[foodListIndex].list[foodIndex].orderList){
      foodOrder.orderID = item.orderID
      foodOrder.num = item.num
      foodOrder.propertyString = item.propertyString
      if(JSON.stringify(item) == JSON.stringify(foodOrder)){
        item.num++
        shoppingCart[item.orderID].num++
        this.setData({
          foodList: foodList,
          shoppingCart: shoppingCart,
          chooseProperty: true,
          finishChooseProperty: false,
          allNum: allNum,
          allPrice: allPrice,
        })
        console.log(shoppingCart)
        return
      }
    }
    //购物车中没有时的操作
    foodOrder.orderID = shoppingCart.length
    if(foodOrder.singleProperty.length != 0){
      foodOrder.propertyString = foodOrder.singleProperty.join(",")
      if(foodOrder.mulProperty.length != 0)
        foodOrder.propertyString = foodOrder.propertyString + "," + foodOrder.mulProperty.join(",")
    }else if(foodOrder.mulProperty.length != 0){
      foodOrder.propertyString = foodOrder.mulProperty.join(",")
    }

    foodOrder.num = 1
    foodList[foodListIndex].list[foodIndex].orderList.push(foodOrder)
    shoppingCart.push(foodOrder)
    this.setData({
      foodList: foodList,
      shoppingCart: shoppingCart,
      chooseProperty: true,
      finishChooseProperty: false,
      allNum: allNum,
      allPrice: allPrice,
    })
  },
  /**
   * 修改购物车中商品的数量
   */
  modifyFoodNum: function(e){
    var foodIndex = e.currentTarget.dataset.foodindex
    var foodListIndex = e.currentTarget.dataset.foodlistindex
    var orderIndex = e.currentTarget.dataset.orderindex
    var foodList = this.data.foodList
    var shoppingCart = this.data.shoppingCart
    var orderID = foodList[foodListIndex].list[foodIndex].orderList[orderIndex].orderID
    var src = e.currentTarget.dataset.src   
    var allNum = this.data.allNum
    var allPrice = this.data.allPrice
    if(src == 'del'){
      foodList[foodListIndex].list[foodIndex].orderList[orderIndex].num--
      shoppingCart[orderID].num--
      allNum --
      allPrice -= shoppingCart[orderID].price
      this.setData({
        foodList: foodList,
        shoppingCart: shoppingCart,
        allNum: allNum,
        allPrice: allPrice,
      })
    }else if(src == 'add'){
      foodList[foodListIndex].list[foodIndex].orderList[orderIndex].num++
      shoppingCart[orderID].num++
      allNum++
      allPrice += shoppingCart[orderID].price
      this.setData({
        foodList: foodList,
        shoppingCart: shoppingCart,
        allNum: allNum,
        allPrice: allPrice,
      })
    }
  },
  /**
   * 打开修改购物车中的属性的窗口
   */
  modifyProperty: function(e){
    var status = e.currentTarget.dataset.status
    var chooseFoodInfo
    var chooseOrder
    if (status == 'open') {
      var foodListIndex = e.currentTarget.dataset.foodlistindex
      var foodIndex = e.currentTarget.dataset.foodindex
      var orderIndex = e.currentTarget.dataset.orderindex
      chooseFoodInfo = this.data.foodList[foodListIndex].list[foodIndex]
      this.setData({
        chooseFoodInfo: chooseFoodInfo
      })
      chooseOrder = chooseFoodInfo.orderList[orderIndex]
      console.log(chooseOrder)
      
      chooseFoodInfo = this.data.chooseFoodInfo
      chooseFoodInfo.pricePropertyString = ''
      chooseFoodInfo.foodListIndex = foodListIndex
      chooseFoodInfo.foodIndex = foodIndex
      chooseFoodInfo.orderIndex = orderIndex
      chooseFoodInfo.orderID = chooseOrder.orderID
      console.log(chooseFoodInfo)
      chooseFoodInfo.pricePropertyString = chooseOrder.priceProperty.join(',') 
      for (var propertyList of chooseFoodInfo.priceProperty) {
        for (var property of propertyList.propertyList) {
          if (chooseFoodInfo.pricePropertyString.indexOf(property.name) != -1) {
            property.beChoosed = true
            chooseFoodInfo.price = property.price 
          }
        }
      }
      for(var propertyList of chooseFoodInfo.singleProperty){
        for(var property of propertyList.propertyList){
          if(chooseOrder.propertyString.indexOf(property.name) != -1){
            property.beChoosed = true
          }
        }
      }
      for (var propertyList of chooseFoodInfo.mulProperty) {
        for (var property of propertyList.propertyList) {
          if (chooseOrder.propertyString.indexOf(property.name) != -1) {
            property.beChoosed = true
          }
        }
      }
      //如果没有属性选项不会弹窗
      if (chooseFoodInfo.hasProperty) {
        this.setData({
          chooseFoodInfo: chooseFoodInfo,
          foodListIndex: foodListIndex,
          foodIndex: foodIndex,
        })
      } else {
        return
      }
    }

    //第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,
      transformOrigin: '50% 100% 0'
    })

    //第2步：这个动画实例赋给当前动画实例
    this.animation = animation

    //第3步：执行第一组动画
    animation.opacity(0).scaleY(0).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).scaleY(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })
    }.bind(this), 200)

    if (status == 'open') {
      this.setData({
        modifyProperty: false
      })
    }
    if (status == 'close') {
      this.setData({
        modifyProperty: true,
        finishModifyProperty: true,
      })
    }  
  },
  /**
   * 修改商品属性
   */
  modifyPro: function (e) {
    var src = e.currentTarget.dataset.src
    var propertyindex = e.currentTarget.dataset.propertyindex
    var index = e.currentTarget.dataset.index
    var chooseFoodInfo = this.data.chooseFoodInfo
    var finishModifyProperty = this.data.finishModifyProperty
    if (src == 'single') {
      chooseFoodInfo.singleProperty[propertyindex].beChoosed = true
      for (var i = 0; i < chooseFoodInfo.singleProperty[propertyindex].propertyList.length; i++) {
        if (i == index) {
          chooseFoodInfo.singleProperty[propertyindex].propertyList[i].beChoosed = true
        } else {
          chooseFoodInfo.singleProperty[propertyindex].propertyList[i].beChoosed = false
        }
      }
    } else if (src == 'mul') {
      chooseFoodInfo.mulProperty[propertyindex].propertyList[index].beChoosed = !chooseFoodInfo.mulProperty[propertyindex].propertyList[index].beChoosed
      for (var i; i < chooseFoodInfo.mulProperty[propertyindex].propertyList.length; i++) {
        if (chooseFoodInfo.mulProperty[propertyindex].propertyList[i].beChoosed == true) {
          chooseFoodInfo.mulProperty[propertyindex].beChoosed = true
          break;
        } else {
          chooseFoodInfo.mulProperty[propertyindex].beChoosed = false
        }
      }
    } 
    this.setData({
      chooseFoodInfo: chooseFoodInfo,
      finishModifyProperty: finishModifyProperty
    })
  },
  /**
   * 确认修改商品属性
   */
  confirmModifyPro: function(e){
    var chooseFoodInfo = this.data.chooseFoodInfo
    var foodListIndex = chooseFoodInfo.foodListIndex
    var foodIndex = chooseFoodInfo.foodIndex
    var orderIndex = chooseFoodInfo.orderIndex
    var orderID = chooseFoodInfo.orderID
    var foodList = this.data.foodList
    var shoppingCart = this.data.shoppingCart
    foodList[foodListIndex].list[foodIndex].orderList[orderIndex].propertyString = ""
    foodList[foodListIndex].list[foodIndex].orderList[orderIndex].singleProperty = []
    foodList[foodListIndex].list[foodIndex].orderList[orderIndex].mulProperty = []
    shoppingCart[orderID].singleProperty = []
    shoppingCart[orderID].mulProperty = []
    shoppingCart[orderID].propertyString = ""
    for (var i = 0; i < chooseFoodInfo.singleProperty.length; i++) {
      for (var j = 0; j < chooseFoodInfo.singleProperty[i].propertyList.length; j++) {
        if (chooseFoodInfo.singleProperty[i].propertyList[j].beChoosed == true) {
          foodList[foodListIndex].list[foodIndex].orderList[orderIndex].singleProperty.push(chooseFoodInfo.singleProperty[i].propertyList[j].name)
          shoppingCart[orderID].singleProperty.push(chooseFoodInfo.singleProperty[i].propertyList[j].name)
        }
      }
    }
    for (var i = 0; i < chooseFoodInfo.mulProperty.length; i++) {
      for (var j = 0; j < chooseFoodInfo.mulProperty[i].propertyList.length; j++) {
        if (chooseFoodInfo.mulProperty[i].propertyList[j].beChoosed == true) {
          foodList[foodListIndex].list[foodIndex].orderList[orderIndex].mulProperty.push(chooseFoodInfo.mulProperty[i].propertyList[j].name)
          shoppingCart[orderID].mulProperty.push(chooseFoodInfo.mulProperty[i].propertyList[j].name)
        }
      }
    }
    if (shoppingCart[orderID].singleProperty.length != 0) {
      shoppingCart[orderID].propertyString = shoppingCart[orderID].singleProperty.join(",")
      if (shoppingCart[orderID].mulProperty.length != 0)
        shoppingCart[orderID].propertyString = shoppingCart[orderID].propertyString + "," + shoppingCart[orderID].mulProperty.join(",")
    } else if (shoppingCart[orderID].mulProperty.length != 0) {
      shoppingCart[orderID].propertyString = shoppingCart[orderID].mulProperty.join(",")
    }
    foodList[foodListIndex].list[foodIndex].orderList[orderIndex].propertyString = shoppingCart[orderID].propertyString
    this.setData({
      foodList: foodList,
      shoppingCart: shoppingCart,
      modifyProperty: true,
    })
  }
})

   
