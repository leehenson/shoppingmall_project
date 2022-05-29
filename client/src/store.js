import { createStore } from "vuex";

import persistedstate from "vuex-persistedstate"; // 웹화면을 리프레쉬를 하여도 사용자 정보가 그대로 유지되도록 설정

const store = createStore({
  // 상태관리 정의(상태관리 할 것)
  state() {
    return {
      user: {}, // 유저정보 오브젝트 타입으로 선언
    };
  },
  mutations: {
    // 현재 로그인한 유저의 정보를 모든 컴포넌트가 쓸 수 있도록 해줌
    user(state, data) {
      // 유저의 상태와 정보를 받았을 때
      state.user = data;
    },
  },
  plugins: [
    persistedstate({
      paths: ["user"], // paths에 유지하고 싶은 state 값을 넣어주면 화면을 리프레쉬를 하여도 자동으로 state를 유지시켜줌
    }),
  ],
});

export default store;
