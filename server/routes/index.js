/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

router.post('/getFoodTypeList', controllers.foodType.getFoodTypeList)

router.post('/getFoodList', controllers.food.getFoodList)

router.post('/getShopInfo', controllers.shop.getShopInfo)

router.post('/newOrder', controllers.order.newOrder)

router.post('/newFood', controllers.food.newFood)

router.post('/newFoodType', controllers.foodType.newFoodType)

router.post('/changeShopTime', controllers.shop.changeShopTime)

router.post('/ getUnfinishOrder', controllers.shop.changeShopTime)

module.exports = router
