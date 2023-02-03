<template>
  <div class="wrapper">
    <AddressTop title="新建收货地址" action="保存" :click="editAddressList"/>
    <div class="input">
      <div class="inputList" >
        <div class="input__item">
          所在城市：<input type="text" class="input__item__text" v-model="addressItem.city">
        </div>
        <div class="input__item">
          小区/大厦/学校：<input type="text" class="input__item__text"  v-model="addressItem.main">
        </div>
        <div class="input__item">
          楼号-门牌号：<input type="text" class="input__item__text" v-model="addressItem.house">
        </div>
        <div class="input__item">
          收货人：<input type="text" class="input__item__text" v-model="addressItem.user_name">
        </div>
        <div class="input__item">
          联系电话：<input type="text" class="input__item__text" v-model="addressItem.phone">
        </div>
      </div>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {useBackRouterEffect} from '../../effects/backEffect'
import Toast, { useToastEffect } from '../../components/Toast'
import AddressTop from "../myAddress/AddressTop.vue";

export default {
  name: "EditAddress",
  components: {
    Toast,
    AddressTop
  },
  setup() {
    const router = useRouter()
    const store = useStore();
    const route = useRoute();
    const { show, toastMessage, showToast } = useToastEffect()

    const addr_id = route.params.id

    const addressList = store.state.addressList;

    const addressItem = addressList[addr_id]

    const {handleBackClick} = useBackRouterEffect()


    const editAddressList = () => {

      const addressTemplate = {
        user_name: addressItem.user_name,
        phone: addressItem.phone,
        city: addressItem.city,
        main: addressItem.main,
        house: addressItem.house,
      }


      store.commit('editAddressList', {
        addr_id,
        addressTemplate
      })
      showToast('保存成功！')
      setTimeout(()=> {
        router.back()
      }, 500)
    }

    return { handleBackClick, addressItem, editAddressList,
      show, toastMessage, showToast
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(248, 248, 248);
}

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

.input {
  margin-top: .12rem;
  padding: 0 .18rem;
  background: $bgColor;
  &__item {
    display: flex;
    align-items: center;
    height: .44rem;
    font-size: .14rem;
    color: $medium-fontColor;
    line-height: .2rem;
    border-bottom: 1px solid $content-bgColor;
    &__text {
      outline: none;
      border: none;
      color: $content-fontcolor;
      line-height: .2rem;
    }
  }
}
</style>
