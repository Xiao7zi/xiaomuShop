/**
 * @description 接口统一管理
 * @author ZiSharp
 */

// 导入封装好的请求方法
import { get, post } from "../utils/request" 

export default {
    // 用户注册
    userRegister(url, params) {
        return post(url, params)
    },
    // 用户登录
    userLogin(url, params) {
        return post(url, params)
    },
    // 获取附近商家列表
    getNearByList(url) {
        return get(url)
    },
    // 获取商家信息
    getShopInfo(url) {
        return get(url)
    },
    // 获取对应商家的商品信息
    getProducts(url, params) {
        return get(url, params)
    },
    // 提交订单
    commitOrder(url, params) {
        return post(url, params)
    },
    // 获取订单列表
    getOrderList(url) {
        return get(url)
    }
}