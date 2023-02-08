<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{calculations.price}}</b></div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
  <!--提示成功提交订单-->
  <!--通过showSuccess属性控制显示-->
  <div
    class="success"
    v-show="showSuccess"
    @click="() => routeToOrder(shopId)"
  >
    <div class="success__content" @click.stop>
      <h3 class="success__content__title iconfont">&#xe651;</h3>
      <div class="success__content__icon iconfont" @click="() => routeToOrder(shopId)">&#xe6b6;</div>
      <p class="success__content__desc">支付成功，等待配送</p>
    </div>
  </div>
  <Toast v-if="show" :message="toastMessage"/>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import api from '../../api'
import { useCommonCartEffect } from '@/effects/cartEffects'
import Toast, { useToastEffect } from "@/components/Toast";

// 下单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList, showToast, handleShowSuccessChange) => {
  const router = useRouter()
  const store = useStore()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for(let i in productList.value) {
      const product = productList.value[i]
      products.push({id: parseInt(product._id, 10), num: product.count})
    }
    try {
      const result = await api.commitOrder('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        if (isCanceled === true) {
          store.commit('clearCartData', shopId)
          await router.push({name: 'OrderList'})
        } else if (isCanceled === false) {
          handleShowSuccessChange(true);
        }
      }
    } catch (e) {
      // 提示下单失败
      showToast('下单失败，请稍后再试')
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关的逻辑
const useShowMaskEffect = () => {
  const router = useRouter()
  const store = useStore()
  const showConfirm = ref(false)
  const showSuccess = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }

  // 显现成功提交订单
  const handleShowSuccessChange = (status) => {
    showSuccess.value = status;
  }


  // 订单成功提交后，点击蒙层或 X号 跳转至订单页
  const routeToOrder = (shopId) => {
    // 清除购物车
    store.commit('clearCartData', shopId)
    // 跳转至订单页
    router.push({name: 'OrderList'})
  }

  return { showConfirm, handleShowConfirmChange, showSuccess, handleShowSuccessChange, routeToOrder }
}


export default {
  name: 'Order',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    // 获取计算数值，商家名，商品列表
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    // 获取弹窗
    const { show, toastMessage, showToast } = useToastEffect()
    // 蒙层展示相关的逻辑
    const { showConfirm, handleShowConfirmChange,
      showSuccess, handleShowSuccessChange, routeToOrder } = useShowMaskEffect()
    // 下单相关逻辑
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList, showToast, handleShowSuccessChange)


    return { show, toastMessage, shopId, showConfirm, handleShowConfirmChange, calculations,
      handleConfirmOrder, showSuccess, handleShowSuccessChange, routeToOrder, }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666666;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: .01rem solid #4FB0F9;
        color: #4FB0F9;
      }
      &--last {
        margin-left: .12rem;
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}

.success {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: transparent;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #FFF;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .42rem 0 0 0;
      font-size: .3rem;
    }
    &__icon {
      position: absolute;
      top: .06rem;
      right: .06rem;
      color: $medium-fontColor;
      font-size: .2rem;
    }
    &__desc {
      font-size: .18rem;
      font-weight: bold;
      color: $content-fontcolor;
    }
  }

}
</style>
