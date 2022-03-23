import { createStore } from "vuex";

const store = createStore({ // 상태관리 정의(상태관리 할 것)
    state() {
        return {
            user: {}     // 유저정보 오브젝트 타입으로 선언
        }
    },
    mutations: {    // 현재 로그인한 유저의 정보를 모든 컴포넌트가 쓸 수 있도록 해줌
        user(state, data) { // 유저의 상태와 정보를 받았을 때
            state.user = data;
        }
    }
});

export default store;