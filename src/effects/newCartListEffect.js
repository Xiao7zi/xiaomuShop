import {useStore} from "vuex";
import {useCommonCartEffect} from "./cartEffects";
import {reactive} from "vue";

// 创建新的CartList相关逻辑
export const useNewCartListEffect = () => {
  const store = useStore();

// 获取cartList
  const cartList = store.state.cartList;

// 创建新的CartList商品 与 原有的同步数据
  const createNewCartList = () => {

    // 深克隆
    const newCartList = JSON.parse(JSON.stringify(cartList));

    // 对 cartList 进行循环
    for (let shopId in newCartList) {

      // 获取计算属性
      const {calculations} = useCommonCartEffect(shopId);

      // 删除count=0的商品
      for (let i in newCartList[shopId]?.productList) {
        // 只要购物车内 count > 0 的商品
        if (newCartList[shopId]?.productList[i].count <= 0) {
          // 删除该商品
          Reflect.deleteProperty(newCartList[shopId]?.productList, i);
        }
      }

      // 是否全部展示
      // 否就是有多余
      newCartList[shopId].isShowAll = (Object.getOwnPropertyNames(newCartList[shopId].productList).length <= 2);

      // 获取总数 和 总价钱
      newCartList[shopId].totalNumber = calculations.value.total;

      newCartList[shopId].totalPrice = calculations.value.price;

      // 将总数为0的商家去掉
      if (newCartList[shopId].totalNumber === 0) {
        Reflect.deleteProperty(newCartList, shopId)
      }

    }
    return reactive(newCartList)
  }

  return {createNewCartList}
}
