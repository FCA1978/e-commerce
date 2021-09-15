<template>
  <tab-bar>
        <tab-bar-item path="/home">
        <template v-slot:item-icon ><img src="~assets/img/tabbar/Badminton.png"></template>
           <template v-slot:item-icon-actived><img  src="~assets/img/tabbar/Badminton-actived.png"></template>
            <template v-slot:item-text><div >首页</div></template>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <template v-slot:item-icon ><img src="~assets/img/tabbar/Basketball.png"></template>
           <template v-slot:item-icon-actived><img  src="~assets/img/tabbar/Basketball-actived.png"></template>
            <template v-slot:item-text><div >分类</div></template>
        </tab-bar-item>
        <tab-bar-item path="/cart">
            <template v-slot:item-icon ><img src="~assets/img/tabbar/Boxing.png"></template>
           <template v-slot:item-icon-actived><img  src="~assets/img/tabbar/Boxing-actived.png"></template>
            <template v-slot:item-text><div >购物车</div></template>
        </tab-bar-item>
        <tab-bar-item path="/profile">
           <template v-slot:item-icon ><img src="~assets/img/tabbar/Diving.png"></template>
           <template v-slot:item-icon-actived><img  src="~assets/img/tabbar/Diving-actived.png"></template>
            <template v-slot:item-text><div >我的</div></template>
        </tab-bar-item>
      </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
    name:"MainTabBar",
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>