<template>
  <div class="check-button" :class="{check:isChecked}"  @click="checkClick" >
      <img src="../../../assets/img/cart/check.png" alt="">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
    props:{
        isChecked:{
            type:Boolean,
            default:false
        }
    },
    methods:{
         checkClick(){
      this.itemInfo.checked=! this.itemInfo.checked;
    }
    }
}
</script>

<style>
    .check-button{
        background-color: #fff;
        border-radius: 60%;
        

    }

    .check-button>img{
        width: 20px;
        height: 20px;
    }

    .check{
       background-color: aqua;
        
    }
</style>