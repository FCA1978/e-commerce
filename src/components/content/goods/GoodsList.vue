<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :key="item" :goods-item="item" />
     {{goods}}

  </div>
</template>

<script>
import GoodsListItem from './GoodListItem.vue'

export default {
        name:'GoodsList',
        components:{
            GoodsListItem
        },
        props:{
            goods:{
                type:Array,
                default(){
                return[]
                }

            }
        }
}
</script>

<style>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
      
    }

   
</style>