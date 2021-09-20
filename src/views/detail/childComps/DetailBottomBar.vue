<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar {
    background-color: #fff;
    height: 49px;
    position: fixed;
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
  }
  .left {
    width: 50%;
  }
  .left,.right {
    display: flex;
  }
  .left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 2px 14px 3px;
   
  }
  .left .shop {
    background-position: center center;
    background:url('../../../assets/img/bottom/shopcart.png') no-repeat;
    background-size: 24px 26px;
  }
  .left .service {
    background-position: center center;
    background:url('../../../assets/img/bottom/man.png') no-repeat;
    background-size: 23px 25px;
  }
   .left .select{
    background-position: center center;
    background:url('../../../assets/img/bottom/collect.png')no-repeat ;
    background-size: 25px 26px;
  }
  .text {
    font-size: 14px;
  }
  .cart {
    height: 49px;
    width: 84px;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }
  .buy {
    height: 49px;
    width: 82px;
    background-color:#87ceeb;
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
  }
</style>
