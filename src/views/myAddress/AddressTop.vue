<template>
  <div class="top">
    <div class="top__back iconfont" @click="handleBackClick">&#xe600;</div>
    <p class="top__title">{{title}}</p>
      <div class="top__action" @click="click">{{action}}</div>
  </div>
</template>

<script>
import {useBackRouterEffect} from "../../effects/backEffect";

export default {
  name: "AddressTop",
  props: ['title', 'action', 'click'],
  setup() {
    const {handleBackClick} = useBackRouterEffect()

    return {handleBackClick}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";
.top {
  display: flex;
  align-items: center;
  background: $bgColor;
  &__back {
    font-size: .18rem;
    color: #B6B6B6;
    margin-left: .184rem;
  }
  &__title {
    flex: 1;
    text-align: center;
    font-size: .16rem;
    color: $content-fontcolor;
  }
  &__action {
    font-size: .14rem;
    color: $content-fontcolor;
    margin-right: .18rem;
  }
  a {
    text-decoration: none;
  }
}
</style>
