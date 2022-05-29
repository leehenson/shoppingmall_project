import { createApp } from "vue"; // vue 호출
import App from "./App.vue"; // App.vue를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import router from "./router"; // router를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import mixins from "./mixins"; // mixins.js를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import store from "./store"; // store.js를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import VueSweetalert2 from "vue-sweetalert2"; // sweetalert2를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import "sweetalert2/dist/sweetalert2.min.css"; // sweetalert2 css를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언

import "bootstrap"; // bootstrap를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap css를 모든 컴포넌트에서 호출하여 사용할 수 있도록 선언

const app = createApp(App); // 선언한 컴포넌트 호출
app.use(router);
app.mixin(mixins);
app.use(store);
app.use(VueSweetalert2);
app.mount("#app");

window.Kakao.init("9db0a9b5d25883d53fb37f9afc62c054"); // kakao developer 애플리케이션 가져오기
