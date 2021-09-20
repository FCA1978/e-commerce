import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app =createApp(App);
// import Bus from './bus'
import toast from  'components/common/toast';

import  FastClick  from "fastclick";
import lazyPlugin from 'vue3-lazy'

// createApp(App).prototype.bus=Bus;

// 安装事务总线
import mitt from "mitt";

app.config.globalProperties.$bus=new mitt();

// 安装toast插件
app.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
app.use(lazyPlugin,{
    // loading:''
})

app.use(store).use(router).mount("#app");
  

    


