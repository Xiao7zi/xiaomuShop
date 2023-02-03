<template>
  <div class="wrapper">
    <AddressTop title="新建收货地址" action="保存" :click="addAddressItemInfo"/>
    <div class="input">
      <div class="inputList" ref="add_address">
        <div class="input__item" >
          所在城市：<input
          type="text"
          class="input__item__text"
          v-model="add_address.city"
          placeholder="如北京市"
        >
        </div>
        <div class="input__item">
          小区/大厦/学校：<input
          type="text"
          class="input__item__text"
          v-model="add_address.main"
          placeholder="如理工大学国防科技园"
        >
        </div>
        <div class="input__item">
          楼号-门牌号：<input
          type="text"
          class="input__item__text"
          v-model="add_address.house"
          placeholder="A号楼B层"
        >
        </div>
        <div class="input__item">
          收货人：<input
          type="text"
          class="input__item__text"
          v-model="add_address.user_name"
          placeholder="请填写收货人的姓名"
        >
        </div>
        <div class="input__item">
          联系电话：<input
          type="text"
          class="input__item__text"
          v-model="add_address.phone"
          placeholder="请填写收货手机号"
        >
        </div>
      </div>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>

import {useRouter} from "vue-router";
import {useStore} from "vuex";
import { ref} from "vue";
import {useBackRouterEffect} from '../../effects/backEffect'
import Toast, { useToastEffect } from '../../components/Toast'
import AddressTop from "../myAddress/AddressTop.vue";

export default {
  name: "NewAddress",
  components: {
    Toast,
    AddressTop
  },
  setup() {
    const store = useStore();
    const router = useRouter()

    const { show, toastMessage, showToast } = useToastEffect()

    const add_address = ref({
      user_name: '',
      phone: '',
      city: '',
      main: '',
      house: ''
    })

    const addAddressItemInfo = () => {
      const addressTemplate = {
        user_name: add_address.value.user_name,
        phone: add_address.value.phone,
        city: add_address.value.city,
        main: add_address.value.main,
        house: add_address.value.house,
      }

      let empty = 0;
      for (let i in addressTemplate) {
        if (addressTemplate[i] === undefined) {
          empty += 1
        }
      }
      if (empty > 0) {
        alert('请正确填写信息！')
      }

      if (empty === 0) {
        store.commit('addAddressItemInfo', {
          addressTemplate
        })
        showToast('新建成功！')
        setTimeout(()=> {
          router.back()
        }, 500)

      }
    }

    const {handleBackClick} = useBackRouterEffect()

    return { handleBackClick, add_address, addAddressItemInfo,
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
  background: $content-bgColor;
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
      &::placeholder {
        font-size: .14rem;
        color: $light-fontColor;
      }
    }
  }
}
</style>
