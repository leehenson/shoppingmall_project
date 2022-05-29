import { createRouter, createWebHistory } from "vue-router"; // 해당 경로들을 라우팅할 수 있도록 import
import ProductList from "../views/ProductList.vue";
import ProductDetail from "../views/ProductDetail.vue";
import ProductCreate from "../views/ProductCreate.vue";
import ProductUpdate from "../views/ProductUpdate.vue";
import SalesList from "../views/SalesList.vue";
import ImageInsert from "../views/ImageInsert.vue";
import OuterList from "../views/OuterList.vue";
import TopList from "../views/TopList.vue";
import BottomList from "../views/BottomList.vue";
import AccList from "../views/AccList.vue";
import MemberLogin from "../views/MemberLogin.vue";
import MemberJoin from "../views/MemberJoin.vue";
import MemberCart from "../views/MemberCart.vue";
import ProductOrder from "../views/ProductOrder.vue";
import MemberPage from "../views/MemberPage.vue";
import MemberPageOrder from "../views/MemberPageOrder.vue";
import MemberProfile from "../views/MemberProfile.vue";
import ManagementPage from "../views/ManagementPage.vue";
import MemberManagement from "../views/MemberManagement.vue";
import OrderManagement from "../views/OrderManagement.vue";
import OrderDetail from "../views/OrderDetail.vue";

const routes = [
  // import한 경로들의 path를 지정하여 라우팅할 수 있게끔 선언
  {
    path: "/",
    name: "home",
    component: ProductList,
  },
  {
    path: "/detail",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/create",
    name: "ProductCreate",
    component: ProductCreate,
  },
  {
    path: "/update",
    name: "ProductUpdate",
    component: ProductUpdate,
  },
  {
    path: "/sales",
    name: "SalesList",
    component: SalesList,
  },
  {
    path: "/image_insert",
    name: "ImageInsert",
    component: ImageInsert,
  },
  {
    path: "/outer",
    name: "OuterList",
    component: OuterList,
  },
  {
    path: "/top",
    name: "TopList",
    component: TopList,
  },
  {
    path: "/bottom",
    name: "BottomList",
    component: BottomList,
  },
  {
    path: "/acc",
    name: "AccList",
    component: AccList,
  },
  {
    path: "/login",
    name: "MemberLogin",
    component: MemberLogin,
  },
  {
    path: "/join",
    name: "MemberJoin",
    component: MemberJoin,
  },
  {
    path: "/cart",
    name: "MemberCart",
    component: MemberCart,
  },
  {
    path: "/order",
    name: "ProductOrder",
    component: ProductOrder,
  },
  {
    path: "/mypage",
    name: "MemberPage",
    component: MemberPage,
  },
  {
    path: "/mypage_order",
    name: "MemberPageOrder",
    component: MemberPageOrder,
  },
  {
    path: "/mypage_profile",
    name: "MemberProfile",
    component: MemberProfile,
  },
  {
    path: "/management",
    name: "ManagementPage",
    component: ManagementPage,
  },
  {
    path: "/user_management",
    name: "MemberManagement",
    component: MemberManagement,
  },
  {
    path: "/order_management",
    name: "OrderManagement",
    component: OrderManagement,
  },
  {
    path: "/order_detail",
    name: "OrderDetail",
    component: OrderDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 기존 path에 import한 경로들의 path를 추가해 라우팅
  routes,
});

export default router;
