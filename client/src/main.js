import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'   // mixins.js를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mixin(mixins).use(store).mount('#app')  // 선언한 컴포넌트 호출

window.Kakao.init("9db0a9b5d25883d53fb37f9afc62c054");  // kakao developer 애플리케이션 가져오기