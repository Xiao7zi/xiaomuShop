# 仿京东到家商城WebApp

## 目的
本项目主页目的是通过新技术栈对某知名电商平台的再实现及全新优化，主要包含登录注册、附近商家、商家详情、购物车、订单、个人地址管理等页面和功能模块。

## 技术栈
Vue3全家桶 + Scss + Axios + Webpack

## 目录结构
```
|-- .gitignore
|-- babel.config.js
|-- package-lock.json
|-- package.json
|-- README.md
|-- vue.config.js
|-- dist
|-- public
|   |-- favicon.ico
|   |-- index.html
|-- src
    |-- App.vue
    |-- main.js
    |-- api    // Api统一管理
    |   |-- index.js
    |-- assets  // 静态资源文件
    |   |-- img
    |       |-- address.png
    |       |-- avatar.jpg
    |       |-- editor.png
    |       |-- help.png
    |       |-- money.png
    |       |-- star.png
    |-- components   // 公共组件
    |   |-- Docker.vue
    |   |-- ShopInfo.vue
    |   |-- Toast.vue
    |-- effects     // 公共逻辑
    |   |-- backEffect.js
    |   |-- cartEffects.js
    |   |-- newCartListEffect.js
    |-- router      // Vue-Router 路由
    |   |-- index.js
    |-- store       // Vuex 存储
    |   |-- index.js
    |-- style       // 样式
    |   |-- base.scss
    |   |-- iconfont.css
    |   |-- index.scss
    |   |-- mixins.scss
    |   |-- viriables.scss
    |-- utils       // 封装的工具函数
    |   |-- request.js
    |-- views       // 页面组件
        |-- cartList    // 购物车
        |   |-- CartList.vue
        |   |-- ProductListOfCart.vue
        |-- editAddress     // 地址编辑
        |   |-- EditAddress.vue
        |-- home    // 首页
        |   |-- Home.vue
        |   |-- Nearby.vue
        |   |-- StaticPart.vue
        |-- login   // 登录页
        |   |-- Login.vue
        |-- myAddress   // 我的地址页
        |   |-- AddressTop.vue
        |   |-- MyAddress.vue
        |-- newAddress      // 新建地址页
        |   |-- NewAddress.vue
        |-- orderConfirmation       //确认订单页
        |   |-- Order.vue
        |   |-- OrderConfirmation.vue
        |   |-- ProductList.vue
        |   |-- TopArea.vue
        |-- orderList       // 订单列表页
        |   |-- OrderList.vue
        |-- personal    // 个人主页
        |   |-- Personal.vue
        |-- register    // 注册页
        |   |-- Register.vue
        |-- shop    // 商家的商品页
            |-- BottomCart.vue
            |-- Content.vue
            |-- Shop.vue
```

## 注意事项
本项目均使用的是mock数据