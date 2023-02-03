<template>
  <div class="wrapper">
    <AddressTop title="管理收货地址" action="新建" :click="handleRouteToNew"/>
    <div class="address">
      <p class="address__title">我的收货地址</p>
      <div class="address__list">
        <template
          v-for="item in addressList"
          :key="item.addr_id"
        >
          <!--<router-link :to="`/EditAddress/${item.addr_id}`">-->
            <div class="address__item" @click="() => handleRouteToEdit(item.addr_id)">
              <p class="address__item__name">{{item.user_name}}</p>
              <p class="address__item__phone">{{item.phone}}</p>
              <div
                class="address__item__del iconfont"
                @click.stop
                @click="() => delAddressItem(item.addr_id)">&#xe6b6;</div>
              <div class="address__item__edit iconfont">&#xe600;</div>
              <div class="address__item__info">
                <span class="address__city">{{item.city}}</span>
                <span class="address__main">{{item.main}}</span>
                <span class="address__house">{{item.house}}</span>
              </div>
            </div>
          <!--</router-link>-->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import AddressTop from "./AddressTop.vue";


// 处理地址相关的逻辑
const useAddressEffect = () => {

  const store = useStore();

  const delAddressItem = (addr_id) => {
    if (confirm('确认删除该地址？')) {
      store.commit('delAddressItem', {
        addr_id
      })
    }
  }

  return { delAddressItem }
}
// 跳转相关的逻辑
const handleRouteToWhere = () => {
  const router = useRouter();
  const handleRouteToEdit = (addr_id) => {
    router.push(`/EditAddress/${addr_id}`)
  }

  const handleRouteToNew = () => {
    router.push('/NewAddress')
  }

  return {handleRouteToEdit, handleRouteToNew}
}

export default {
  name: "MyAddress",
  components: {
    AddressTop
  },
  setup() {
    const store = useStore();

    const addressList = store.state.addressList;

    const {delAddressItem} = useAddressEffect()

    const {handleRouteToEdit, handleRouteToNew} = handleRouteToWhere()

    return {addressList, handleRouteToEdit, handleRouteToNew, delAddressItem}
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

.address {
  padding: .16rem .18rem 0;
  &__title {
    margin: 0;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__list {
    a {
      text-decoration: none;
    }
  }
  &__item {
    position: relative;
    margin-top: .12rem;
    background: $bgColor;
    border-radius: .04rem;
    padding: .18rem .16rem;
    &__name, &__phone {
      display: inline-block;
      margin: 0;
      font-size: .14rem;
      color: $light-fontColor;
    }
    &__phone{
      margin: 0 0 0 .66rem;
    }
    &__edit {
      position: absolute;
      transform: rotate(180deg);
      color: $light-fontColor;
      font-size: .18rem;
      right: .16rem;
    }
    &__info {
      width: 2.6rem;
      font-size: .14rem;
      margin-top: .08rem;
      color: $content-fontcolor;
    }
    &__del {
      position: absolute;
      top: .05rem;
      right: .05rem;
    }
  }
}


</style>
