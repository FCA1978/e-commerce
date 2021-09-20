<template>
  <div class="detail">
     
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imageLoad" />
      <detail-param-info  ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="comment-info"/>
      <goods-list ref="recommend" :goods="recommends"/>
      
      
     
      </scroll>
      <detail-bottom-bar @addCart="addToCart"/>
   <back-top @click="backClick"  v-show="isShowBackTop"></back-top>
   <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailImagesInfo from './childComps/DetailImagesInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


 import Scroll from 'components/common/scroll/Scroll'
 import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
// import toast from 'components/common/toast/Toast'

  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail.js'
   import {debounce} from 'common/ultils' 

   import { mapActions } from 'vuex'

export default {
   name:"Detail",
    components: { 
        DetailNavBar,
        DetailSwiper ,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImagesInfo, 
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // toast
        
        },
    data(){
        return {
            iid:null,
           topImages:[],
           goods:{},
           shop:{},
           detailsInfo:{},
           paramInfo:{},
           commentInfo:{},
           recommends:[],
           themeTopYs:[],
           getThemeTopY:null,
           currentIndex:0,
           isShowBackTop:false,
        //    message:'',
        //    show:false
        }
    },
    created(){
        // 1.保存传入的iid
        this.iid =this.$route.params.iid
        // 2.根据iid来请求数据
        getDetail(this.iid).then(res=>{
        //   1.获取顶部的图片轮播数据
            //  console.log(res)
             const data =res.result

            this.topImages=data.itemInfo.topImages

            // 2.获取商品信息
            this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        
            // 3.创建店铺信息的对象
            this.shop=new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailsInfo=data.detailInfo

            // 5.获取参数信息
            this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)
        
            // 7.取出评论的信息
            if(data.rate.cRate !== 0){
                this.commentInfo =data.rate.list[0];
            }

            this.$nextTick(()=>{
                // 根据最新的数据 对应的的Dom已经渲染出来的，但是图片还没加载完
                // offsetTop都是因为图片不对的问题
               
               
            })
                
        })
    
        // 3.请求推荐数据
        getRecommend().then(res=>{
           this.recommends=res.data.list
            })
    
        // 给getThemeTopY赋值
        this.getThemeTopY=debounce(()=>{
              this.themeTopYs=[];
                 this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

             console.log(this.themeTopYs);
        },100
        )
    },
    methods:{
        ...mapActions(['addCart']),

        imageLoad(){
            this.$refs.scroll.refresh()
           this.getThemeTopY()
            
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
            
        },
        contentScroll(position){
            // 获取y值
            const positionY= - position.y

            // 2.positionY和主题中的值进行对比
            let length=this.themeTopYs.length
        for(let i=0;i<length;i++){
            // if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
            // }
            if(this.currentIndex!=i&&((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
            ||(i===length-1&&positionY>=this.themeTopYs[i] ))){
               this.currentIndex=i;
                // console.log(this.currentIndex);
                this.$refs.nav.currentIndex=this.currentIndex;
            }
        }
            // 3.是否显示回到顶部
         this.isShowBackTop= - position.y>1000
        },
         backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
        // 1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        product.price=this.newPrice

        // 2.将商品添加到购物车里面
        //  this.$store.commit('addCart',product)

        // 这里是通过直接调用Vuex里面的action里面的addCart方法
        //  this.$store.dispatch('addCart',product).then(res=>{
        //      console.log(res);
        //  })

        // 这里是采用mapActions调用vuex里面的方法当作当前页面的方法，可以直接使用
        this.addCart(product).then(res=>{
        //    this.show=true;
        //    this.message=res;

        //    setTimeout(()=>{
        //        this.show=false;
        //        this.message=''
        //    },1500)
            
             this.$toast.show(res,2000)
        })
        
        // 3.添加到购物车成功
    }
    },
    mounted(){
         let refresh =debounce(this.$refs.scroll.refresh,200)
        this.$bus.on('detailItemImageLoad',()=>{
           this.$refs.scroll.refresh();
        })
    },
    updated(){
       
      
    }
}
</script>

<style scoped>

    .detail{
        position: relative;
        z-index: 11;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav{
        position: relative;
        background-color: #fff;
        z-index: 9;
    }

    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }

</style>