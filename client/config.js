/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://yzuw06ep.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        getFoodTypeListUrl: `${host}/weapp/getFoodTypeList`,

        getFoodListUrl: `${host}/weapp/getFoodList`,

        getShopInfoUrl: `${host}/weapp/getShopInfo`,

        newOrderUrl: `${host}/weapp/newOrder`,

        newFoodTypeUrl: `${host}/weapp/newFoodType`,

        changeShopTimeUrl: `${host}/weapp/changeShopTime`
    }
};

module.exports = config;
