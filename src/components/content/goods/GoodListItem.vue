<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>

// import bus from "./bus";

export default {
    name:'GoodsListItem',
    components:{
      
    },
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
      imageLoad(){ 
         if(this.$route.path.indexOf('/home')!=-1){  
         this.$bus.emit('homeItemImageLoad')
        
      }else if(this.$route.path.indexOf('/detail')){
         this.$mybus.emit('detailItemImageLoad') 
       }
      }, 
      itemClick(){
        // console.log("跳转到详情页")
        // $router是全局的路由器对象，可以通过$router.push直接跳转到对应的链接与router-link跳转相同
        this.$router.push("/detail/"+this.goodsItem.iid)
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
}
</script>

<style>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid #fff;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: blue;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.png") 0 0/14px 14px;
  }
</style>