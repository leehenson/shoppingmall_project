import axios from 'axios';      // axios 호출

export default {
    methods: {      // async와 await을 기반으로 서로 데이터를 주고 받을 수 있게 공통(모든 vue 컨포넌트에서 사용 가능한 모듈) 메소드 선언
        async $api(url, data) {     // url을 받고, data를 파라미터로 주고 받음
            return (await axios({   // axios로 서버를 호출하고, 그 결과를 return하는 방식
                method: 'post',     // 전부 post 방식으로 호출
                url,                // url 호출
                data                // data 받음
            }).catch(e => {         // 예외처리
                console.log(e);     // 일단 console.log로 에러 표현
            })).date;               // data retrun
        }
    }
}