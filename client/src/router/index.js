import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductCreate from '../views/ProductCreate.vue'
import ProductUpdate from '../views/ProductUpdate.vue'
import SalesList from '../views/SalesList.vue'
import ImageInsert from '../views/ImageInsert.vue'
import OuterList from '../views/OuterList.vue'
import TopList from '../views/TopList.vue'
import BottomList from '../views/BottomList.vue'
import AccList from '../views/AccList.vue'
import MemberLogin from '../views/MemberLogin.vue'
import MemberJoin from '../views/MemberJoin.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductList
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate
  },
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert
  },
  {
    path: '/outer',
    name: 'OuterList',
    component: OuterList
  },
  {
    path: '/top',
    name: 'TopList',
    component: TopList
  },
  {
    path: '/bottom',
    name: 'BottomList',
    component: BottomList
  },
  {
    path: '/acc',
    name: 'AccList',
    component: AccList
  },
  {
    path: '/login',
    name: 'MemberLogin',
    component: MemberLogin
  },
  {
    path: '/join',
    name: 'MemberJoin',
    component: MemberJoin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
