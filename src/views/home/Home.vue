<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center><div>运动商城</div></template>
      </nav-bar>  
       <tab-control class="fade-tab-control"  
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      >
      </tab-control>

      <scroll class="content" ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" 
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
      <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control class="tab-control"  
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
     
      >
      </tab-control>
      <good-list :goods="showGoods"/>
       </scroll>

       <back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>
     
     
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import TabControl from 'components/content/tabControl/TabControl'
import NavBar from 'components/common/navbar/NavBar'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// import bus from "/bus";

import {
  getHomeMultidata,
  getHomeGoods
  } from 'network/home'

import {debounce} from "common/ultils.js"


export default {
  name:"Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    
   
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    // 1.请求多个数据
      this.getHomeMultidata()
     // 2.请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
  },
  mounted(){
    // 1.图片加载完成的事件监听
    const refresh = debounce('this.$refs.scroll.refresh',200)
       this.$bus.on('homeItemImageLoad',()=>{
      this.$refs.scroll.refresh();
     
    })

    
  },
  destroyed(){
    // console.log("has destroyed")
  },
  activated(){
    // console.log("active")
    this.$refs.scroll.scrollTo(0,this.saveY,20),
     this.$refs.scroll.refresh();
  },
  deactivated(){
    // console.log("disactive")
    // 1.保存y值
    this.saveY= this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    // this.$bus.$off()
  },
  methods:{
    // 事件监听相关的方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index
       this.$refs.tabControl2.currentIndex=index
    },
    contentScroll(position){
      // 1.判断backto是否显示
      this.isShowBackTop= -position.y>1000
      // 2.决定tabcontrol是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    // 网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // console.log(res);
      // this.result=res;
      this.banners=res.data.banner;
      this.recommends=res.data.recommend;
    })
    },
    getHomeGoods(type){
      const page =this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page +=1

          // 完成了下拉加载更多
            this.$refs.scroll.finishPullUp()
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    swiperImageLoad(){
    // 2.获取tabcontrol的offsetTop
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }

    
  }


 

}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    /* vh->viewpoint */
  }

  .home-nav{
    background-color: #87ceeb;
    color: #fff;

    /* position: fixed;
    z-index: 9;
    left:0;
    right: 0;
    top: 0; */

  }

  .tab-control{
    /* position: sticky; */
    /* top: 44px; */
    background-color: #fff;
    /* z-index: 9; */
  }

  .fade-tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    height: calc(100% - 93px);
    overflow: hidden;
     /* margin-top: px;  */ 
     /* position: fixed; */
  }

  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
  } */

 
</style>