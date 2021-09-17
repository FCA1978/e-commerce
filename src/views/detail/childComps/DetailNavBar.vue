<template>
  <div>
      <nav-bar>
          <template v-slot:left class="back" >
             <img src="../../../assets/img/detail/back-history.png" alt="" id="detail-back" @click="backClick()">          
           </template>

          <template v-slot:center>
              <div class="title">
                  <div v-for="(item,index) in titles" 
                  :key="(item,index)" class="title-item"
                  @click="titleClick(index)"
                  :class="{active:index === currentIndex}"
                  >
                      {{item}}
                  </div>
              </div>
          </template>
          
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex=index;
            this.$emit('titleClick',index);
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>

    .title{
        display: flex;
        font-size: 13px;
    }

    .title-item{
        flex: 1;
    }

    .active{
        color: #87ceeb;
    }

    #detail-back{
        width: 23px;
        height: 23px;
        margin-top: 10px;
        margin-left: 15px;
    }
</style>