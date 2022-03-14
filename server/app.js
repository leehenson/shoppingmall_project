const express = require('express'); // express 웹서버 관련 모듈 불러오기
const app = express();  // express() 함수 호출
const session = require('express-session'); // express-session 로그인 관련 모듈 불러오기

app.use(session({   // session 처리 방법
    secret: 'secret code',  // session에 대한 key(secret code)
    resave: false,  // resave: request 요청이 왔을 때, session에 수정사항이 생기지 않더라도, 다시 저장하는 기능
    saveUninitialized: false,   // saveUninitialied: session에 저장할 내역이 없더라도, session을 항상 재저장을 하는 기능
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60  // 쿠기 유효시간 (1시간)
    }
}));

const server = app.listen(3000, () => { // 3000번 포트로 웹서버 구동
    console.log('Server Started. port 3000.');  // 웹서버 구동 시, console로 메세지를 남김
});

const db = {    // 데이터베이스 불러오기
    database: "dev",
    connectionLimit: 10,
    host: "172.29.0.100",
    user: "root",
    password: "mariadb"
};

const dbPool = require('mysql').createPool(db); // mariadb 모듈 불러오기, createPool로 db와 연동시키기

app.post('/api/login', async (request, res) => {    // client에서 server쪽으로 axios post()방식으로 login api 가져오기
    request.session['email'] = 'hslee7231@gmail.com';
    res.send('ok');
});

app.post('/api/logout', async (request, res) => {   // client에서 server쪽으로 axios post()방식으로 logout api가져오기
    request.session.destroy();
    res.send('ok');
});

const sql = require('./sql.js');    // sql.js 불러오기

app.post('/apirole/:alias', async (request, res) => {   // 사용자가 서버로 지정되지 않는 데이터 요청을 할 때, 경유하게 만듬
    if(!request.session.email) {
        return res.status(401).send({error:'You need to login.'});
    }

    try{
        res.send(await req.db(request.params.alias))    // alias에 뭐가 들어올 지 모르기 때문에 경로를 설정
    } catch (err) {  // err라는 에러문이 뜨도록 예외처리
        res.status(500).send({
            error: err
        });
    }
});

app.post('/api/:alias', async (request, res) => {   // 사용자가 서버로 지정되지 않는 데이터 요청을 할 때, 경유하게 만듬
    try{
        res.send(await req.db(request.params.alias))    // alias에 뭐가 들어올 지 모르기 때문에 경로를 설정
    } catch (err) {  // err라는 에러문이 뜨도록 예외처리
        res.status(500).send({
            error: err
        });
    }
});


const req = {   // query라는 함수를 통해 mariadb의 원하는 쿼리를 실행하고 데이터를 가져오기
    async db(alias, param = [], where = '') {   
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if (error) {
                if (error.code != 'ER_DUP_ENTRY')
                console.log(error);
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    }
};