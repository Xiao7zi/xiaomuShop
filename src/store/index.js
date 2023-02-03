import Vuex from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  localStorage.cartList = JSON.stringify(cartList)
}

const getLocalCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList);
  } catch(e) {
    return {}
  }
}

const setLocalAddressList = (state) => {
  const {addressList} = state
  localStorage.addressList = JSON.stringify(addressList)
}

const getLocalAddressList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.addressList);
  } catch(e) {
    return {}
  }
}

export default Vuex.createStore({
  state: {
    cartList: getLocalCartList(),
    addressList: getLocalAddressList()
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList:{}
      }
      let product = shopInfo.productList[productId]
      if(!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + payload.num
      if(payload.num > 0) { product.check = true }
      if(product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList:{}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if(products) {
        for(let key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
    },
    addAddressItemInfo(state, payload) {
      // 获取新增的模板
      const {addressTemplate} = payload
      const addressList = state?.addressList || {addressList: {}}
      if (!addressTemplate?.addr_id) {
        let addr_id = Object.keys(addressList).length + 1
        addressTemplate.addr_id = addr_id
        state.addressList[addr_id] = addressTemplate
      }
      setLocalAddressList(state)
    },
    editAddressList(state, payload) {
      const {addr_id, addressTemplate} = payload
      for (let i in state.addressList) {
        if (state.addressList[i].addr_id === addr_id) {
          state.address[i] = addressTemplate
        }
      }
      setLocalAddressList(state)
    },
    delAddressItem(state, payload) {
      const {addr_id} = payload;
      for (let i in state.addressList) {
        if (state.addressList[i].addr_id === addr_id) {
          Reflect.deleteProperty(state.addressList, addr_id)
        }
      }
      setLocalAddressList(state)
    }
  }
})
