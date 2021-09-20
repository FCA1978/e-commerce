<template>
  <div class="toast"  v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    namme:"Toast",
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // show:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message='默认文字',duration=2000){
            this.isShow=true;
            this.message=message

            setTimeout(()=>{
                this.isShow=false;
                this.message=''
            },duration)
        }
    }
}
</script>

<style>
    .toast{
        position: fixed;
        top: 40%;
        left: 35%;
        width: 120px;
        height: 50px;
        padding: 8px 10px;

        z-index:99;
        color: #fff;
        background-color: rgba(31, 84, 99, 0.4);
        
    }


</style>