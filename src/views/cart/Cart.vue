<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- 顶部 -->
        <template v-slot:center>
          <div >购物车({{length}})</div>
          </template>
     
    </nav-bar>
     <!-- 商品的列表 -->
        <cart-list />
      <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'

import { mapGetters } from 'vuex'

export default {
   name:"Cart",
  components: { 
    NavBar,
    CartList 
    },
  computed:{
    ...mapGetters({
      length:'cartLength'
      
    })
  },
 
 
}
</script>

<style>
  .nav-bar{
    background-color: #87ceeb;
    color:#fff;
    text-align: center;
    font-weight: 700px;
    
  }
   .cart{
    height:100vh
  }
</style>