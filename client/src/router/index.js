import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductCreate from '../views/ProductCreate.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
