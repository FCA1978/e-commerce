<template>
  <div class="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="detailsInfo" @imgLoad="imgLoad" />
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :commentInfo="comment-info"/>
      <goods-list :goods="recommends"/>
      </scroll>
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

 import Scroll from 'components/common/scroll/Scroll'
 import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail.js'
//    import {debounce} from 'common/ultils' 

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
           recommends:[]
        }
    },
    created(){
        // 1.保存传入的iid
        this.iid =this.$route.params.iid
        // 2.根据iid来请求数据
        getDetail(this.iid).then(res=>{
        //   1.获取顶部的图片轮播数据
             console.log(res)
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
        })
    
        // 3.请求推荐数据
        getRecommend().then(res=>{
           this.recommends=res.data.list
            })
    
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
        }
    },
    mounted(){
        // let refresh =debounce(this.$refs.scroll.refresh,100)

        // this.$bus.$on('itemImageLoad',()=>{
        //    refresh()
        // })
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