<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__background"></div>
      <img class="top__editor" src="../../assets/img/editor.png" alt=""/>
      <div class="top__profile">
        <img class="top__profile__image" src="../../assets/img/avatar.jpg" alt="">
        <p class="top__profile__name">
          慕小梓
        </p>
        <div class="top__profile__stars">
          <img src="../../assets/img/star.png" class="top__profile__stars__icon" alt="">
          <span class="top__profile__stars__number">16</span>
        </div>
        <p class="top__profile__id">ID: 1069643013</p>
        <div class="top__profile__tags">
          <div class="top__profile__tag" v-for="item in tagList" :key="item.title">
            <p class="top__profile__tag__title">{{item.title}}</p>
            <p class="top__profile__tag__number">{{item.number}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <template  v-for="item in optionList" :key="item.name">
        <router-link :to="item?.to || 'Personal'">
          <div class="option">
            <div :class="item.style" >
              <img
                class="option__icon__img"
                :src="item.imgUrl"
                alt=""
              >
            </div>
            <p class="option__name">{{item.name}}</p>
            <div class="option__detail iconfont">&#xe600;</div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import Docker from "@/components/Docker";
export default {
  name: "Personal",
  components: {
    Docker
  },
  setup() {
    const tagList = [
      {title: '红包', number: '218'},
      {title: '优惠券', number: '12张'},
      {title: '鲜豆', number: '88'},
      {title: '白条', number: '1000'},
    ]


    const optionList = [
      {imgUrl: require('../../assets/img/money.png'), style: 'option__icon red', name: '我的钱包',},
      {imgUrl: require('../../assets/img/address.png'), style: 'option__icon blue', name: '我的地址', to: 'MyAddress'},
      {imgUrl: require('../../assets/img/help.png'), style: 'option__icon purple', name: '客服与帮助'},
    ]

    return {tagList, optionList}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .49rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.top {
  position: relative;
  height: 3.11rem;
  overflow: hidden;
  &__background {
    position: absolute;
    width: 120%;
    //椭圆左边隐藏 10%，右边隐藏 10%
    left: -10%;
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
    //左上角，右上角，右下角，左下角
    border-radius: 0 0 50% 50%
  }
  &__editor {
    position: absolute;
    width: .3rem;
    height: .3rem;
    top: .57rem;
    right: .21rem;
  }
  &__profile {
    position: absolute;
    height: 2.03rem;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    background: $bgColor;
    box-shadow: .08rem .08rem .16rem 0 rgba(0,0,0,0.08);
    border-radius: .08rem;
    text-align: center;
    &__image {
      position: absolute;
      left: 50%;
      margin-left: -.47rem;
      top: -.47rem;
      width: .94rem;
      height: .94rem;
      border-radius: 50%;
    }
    &__name {
      position: relative;
      display: inline-block;
      margin: .59rem 0 0 0 ;
      font-size: .24rem;
      color: #262628;
      line-height: .36rem;
    }
    &__stars {
      position: absolute;
      display: flex;
      top: .7rem;
      right: .37rem;
      width: .35rem;
      height: .15rem;
      background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
      border-radius: .175rem;
      &__icon {
        position: relative;
        top: .03rem;
        left: .04rem;
        width: .09rem;
        height: .09rem;
      }
      &__number {
        flex: 1;
        text-align: right;
        font-size: .2rem;
        line-height: .15rem;
        color: $bgColor;
        transform: scale(0.5);
      }
    }
    &__id {
      margin: .02rem 0 0 0;
      font-size: .14rem;
      color: #C1C0C9;
    }
    &__tags {
      display: flex;
      margin-top: .12rem;
      padding-top: .12rem;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid $content-bgColor;
      }
    &__tag {
      &__title, &__number {
        margin: 0;
      }
      &__title {
        font-size: .12rem;
        color: #C1C0C9;
        margin-bottom: .03rem;
      }
      &__number {
        font-size: .2rem;
        line-height: .28rem;
        color: #262628;
      }
    }
  }
}

.options {
  display: flex;
  flex-direction: column;
  margin: .16rem .18rem 0;
  background: $bgColor;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  a {
    text-decoration: none;
  }
}
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__icon {
    position: relative;
    width: .22rem;
    height: .22rem;
    background: #ED4A47;
    border-radius: .08rem;
    text-align: center;
    margin-left: .16rem;
    &__img {
      position: absolute;
      width: .12rem;
      height: .12rem;
      top: 50%;
      margin-top: -.06rem;
      left: 50%;
      margin-left: -.06rem;
    }
  }
  &__name {
    flex: 1;
    font-size: .14rem;
    color: #262626;
    margin-left: .12rem;
  }
  &__detail {
    transform: rotate(180deg);
    font-size: .12rem;
    color: #C2C4CA;
    margin-right: .16rem;
  }
}

.red {
  background: #ED4A47;
}

.blue {
  background: #32C5FF;
}

.purple {
  background: #9013FE;
}
</style>
