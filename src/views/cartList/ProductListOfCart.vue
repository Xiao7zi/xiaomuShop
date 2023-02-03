<template>
  <template
    v-for="(item, index) in newCartList"
    :key="index"
  >
    <div class="products">
      <div class="products__title">
        {{item.shopName}}
      </div>
      <div class="products__wrapper">
        <div
          :class="{products__list: true, products__more: !item.isShowAll, allTransition: true}"
          :id="`productListOfShopId${index}`"
        >
          <template
            v-for="(innerItem) in item.productList"
            :key="innerItem._id"
          >
            <div
              class="products__item"
            >
              <img class="products__item__img" :src="innerItem.imgUrl" />
              <div class="products__item__detail">
                <h4 class="products__item__title">{{innerItem.name}}</h4>
                <p class="products__item__price">
                <span>
                  <span class="products__item__yen">&yen; </span>
                  {{innerItem.price}} x {{innerItem.count}}
                </span>
                  <span class="products__item__total">
                  <span class="products__item__yen">&yen; </span>
                  {{(innerItem.price * innerItem.count).toFixed(2)}}
                </span>
                </p>
              </div>
            </div>
          </template>
        </div>
        <div
          class="omitted"
          v-if="Object.keys(item.productList).length > 2"
          @click="(e) => showExcessProducts(item, index, e)"
        >
          共计{{item.totalNumber}}件 / {{item.totalPrice}}元
          <span class="omitted__icon iconfont">&#xe600;</span>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import {useNewCartListEffect} from "../../effects/newCartListEffect";


// 处理购物车列表的逻辑
const useNewCartEffect = () => {

  const {createNewCartList} = useNewCartListEffect()

  // 是否展示多余的部分
  const showExcessProducts = (item, shopId, e) => {
    // 获取product__list 这个DOM节点
    const productsList = document.getElementById(`productListOfShopId${parseInt(shopId)}`)

    // 获取省略ICON的DOM节点
    let getOmittedIcon = e.target?.querySelector('.omitted__icon') || e.target
    // 如果isShowAll 为 false 就是有多余的没展开
    // 就给product__list 一个高度 还有让 ICON旋转
    if (item.isShowAll === false) {
      productsList.style.height = `${(Object.keys(item.productList).length * 62) / 100}rem`
      getOmittedIcon.style.transform = "rotate(90deg)"
    } else {
      // 如果isShowAll 为 true 就是已经展开
      // 就还原product__list的高度 还有让 ICON旋转回来
      productsList.style.height = `${(2 * 62) / 100}rem`
      getOmittedIcon.style.transform = "rotate(270deg)"
    }
    // 每次点击 都对 isShowAll的值取反
    item.isShowAll = !item.isShowAll
  }

  return { createNewCartList, showExcessProducts}
}
export default {
  name: "ProductListOfCart",
  setup() {

    // 处理地址相关的逻辑
    const { createNewCartList, showExcessProducts} = useNewCartEffect();

    // 获取新的的购物车列表
    const newCartList = createNewCartList()

    return {newCartList, showExcessProducts}

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.allTransition {
  transition: all 1s;
}

.products {
  margin: .16rem .18rem .1rem .18rem;
  background: $bgColor;
  &__title {
    padding: .16rem;
    font-size: .16rem;
    font-weight: bold;
    color: $content-fontcolor;
  }
  &__wrapper {
    overflow-y: scroll;
  }
  &__list {
    overflow-y: hidden;
    background: $bgColor;
  }
  &__more {
    height: 1.24rem;
    overflow: hidden;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0 .16rem 0.16rem .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontColor;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}

.omitted {
  height: .28rem;
  text-align: center;
  background: $search-bgColor;
  line-height: .28rem;
  font-size: .14rem;
  color: $light-fontColor;
  margin: 0 .16rem .16rem;
  overflow: hidden;
  &__icon {
    display: inline-block;
    transition: transform 1s;
    transform: rotate(270deg);
  }
}
</style>
