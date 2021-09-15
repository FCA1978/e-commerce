<template>
       <div class="tab-bar-item" @click="itemClick">
         <slot v-if="!isActive" name="item-icon"></slot>
           <slot v-else name="item-icon-actived"></slot>
           <div :style="activeStyle"><slot name="item-text"></slot></div>
           <!-- <slot name="item-text-actived"></slot> -->
       </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:{
            type:String
        },
        
        activeColor:{
            type:String,
            default:'#00bfff'
        }
    },
    data(){
        return{
            // isActive:true
        }
    },
    computed:{
        isActive(){
            // /home ->item1(/home)=true
            // /category ->item1(/category)=true
            // /cart ->item1(/cart)=true
            // /profile->item1(/profile)=true
            // 动态判断活跃路由里面是否包含上面传参的path
            return this.$route.path.indexOf(this.path) !==-1
        },
        activeStyle(){
            // 判断是否处于活跃 是的话传给它动态的颜色 否的话传一个默认的值
            return this.isActive ?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path);
        }
    }
}
</script>

<style>
     .tab-bar-item{
    flex: 1;
    text-align: center;
    /* 将项目均等分 */
    height: 49px;
    margin-top: 3px;
    
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: center;
  }

  .tab-bar-item>div{
      font-size: 14px;
  }
  /* .active{
      color:blue
  } */

</style>