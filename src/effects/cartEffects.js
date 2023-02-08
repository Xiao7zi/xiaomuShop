import { computed } from 'vue'
import { useStore } from 'vuex'
/**
 * 购物车相关逻辑
 * @param {Number} shopId 商家id
 */
export const useCommonCartEffect = (shopId) => {
  // 获取Store
  const store = useStore()
  // 获取state里的购物车列表
  const cartList = store.state.cartList;
  // 触发 修改购物车里的商品
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }

  // 商品列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (let i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // 商家名称
  const shopName = computed(() => {
    return cartList[shopId]?.shopName || ''
  })

  // 算总数 和 总价
  const calculations = computed((shopid = shopId) => {
    const productList = cartList[shopid]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, shopName, productList, calculations, changeCartItemInfo }
}
