<template>
  <div class="wrapper">
    <div class="topArea">
      <p class="topArea__title">我的全部购物车（{{shopCount}}）</p>
    </div>
    <ProductListOfCart />
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from "../../components/Docker.vue";
import ProductListOfCart from "./ProductListOfCart.vue";
import {useNewCartListEffect} from "../../effects/newCartListEffect";

export default {
  name: 'CartList',
  components: {
    Docker,
    ProductListOfCart
  },
  setup() {
    const {createNewCartList} = useNewCartListEffect()

    // 返回页面顶部的商家数量
    return {shopCount: Object.keys(createNewCartList()).length}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.allTransition {
  transition: all 1s;
}

.wrapper {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  background: rgb(248, 248, 248);
}

.topArea {
  height: .44rem;
  text-align: center;
  line-height: .44rem;
  background: $bgColor;
  &__title {
    margin: 0;
    font-size: .16rem;
    color: $content-fontcolor;
  }
}
</style>
