<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" v-if="$route.meta.keepAlive" /> 
      </keep-alive>     
    </router-view>
    <router-view v-if="!$route.meta.keepAlive" />
  <main-tab-bar></main-tab-bar>
  </div>
  
</template>

<script>

import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'


export default {
  name:'app',
  components:{
    MainTabBar
  }
}
</script>

<style>
/* css引入方式 */
@import "assets/css/base.css";
</style>

