import { createRouter, createWebHistory } from "vue-router";


const Home=()=>import('views/home/Home')
const Category=()=>import('views/category/Category')
const Cart=()=>import('views/cart/Cart')
const Profile=()=>import('views/profile/Profile')
const Detail=()=>import('views/detail/Detail')

const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      keepAlive:true
    }
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
