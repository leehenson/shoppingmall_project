import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'   // mixins.js를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);  // 선언한 컴포넌트 호출
app.use(router);
app.mixin(mixins);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');

window.Kakao.init("9db0a9b5d25883d53fb37f9afc62c054");  // kakao developer 애플리케이션 가져오기