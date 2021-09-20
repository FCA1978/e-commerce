<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button"/>
          <span>全选</span>
      </div>

      <div class="price">
          合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
          去结算：({{checkLength}})
      </div>

  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
    name:"CartBottomBar",
    components:{
        checkButton
    },
    computed:{
        ...mapGetters (["cartList"]),
        totalPrice(){
            return '￥' + this.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.oldPrice * item.count
            },0)
        },
        checkLength(){
            return this.cartList.filter(item=>{
               item.checked
            }).length
        }
    },
    methods:{
        calcClick(){
            if(!this.isSelectAll){
                this.$toast.show("请选择购买的商品",2000)
            }
        }
    }
}
</script>

<style>
    .bottom-bar{
        height: 40px;
        background-color: #FFF;
        position: absolute;
        bottom: 53px;
        line-height: 40px;
        /* border-color: black; */
        display: flex;
    }

    .check-button{
        width: 20px;
        height: 20px;
        margin-top: 3px;
        margin-right: 5px;
        margin-left: 15px;
    }

    .check-content{
       display: flex;
       
    }

    .price{
        margin-left: 30px;
        width: 98px;
        
    }


    .calculate{
        width: 120px;
         /* margin-left:2px;  */
        background-color: #87ceeb;
        color:#fff
    }
</style>