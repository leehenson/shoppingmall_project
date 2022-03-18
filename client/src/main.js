import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'   // mixins.js를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mixin(mixins).mount('#app')  // 선언한 컴포넌트 호출
