const express = require('express'); // express 웹서버 관련 모듈 불러오기
const app = express();  // express() 함수 호출
const session = require('express-session'); // express-session 로그인 관련 모듈 불러오기
const fs = require('fs');   // filesystem으로 디렉토리에 접근할 수 있게 해주는 모듈 불러오기

app.use(session({   // session 처리 방법
    secret: 'secret code',  // session에 대한 key(secret code)
    resave: false,  // resave: request 요청이 왔을 때, session에 수정사항이 생기지 않더라도, 다시 저장하는 기능
    saveUninitialized: false,   // saveUninitialied: session에 저장할 내역이 없더라도, session을 항상 재저장을 하는 기능
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60  // 쿠기 유효시간 (1시간)
    }
}));

app.use(express.json({  // body request 요청을 할 때 파라미터를 json형태의 최대 50mb 파라미터로 전송
    limit: '50mb'
}));    

const server = app.listen(3000, () => { // 3000번 포트로 웹서버 구동
    console.log('Server Started. port 3000.');  // 웹서버 구동 시, console로 메세지를 남김
});

let sql = require('./sql.js');    // sql.js 불러오기

// nodemon 모듈로 대체 가능
fs.watchFile(__dirname + '/sql.js', (curr, prev) => {   // file 레파지토리를 감시하다가 변경되는 것을 감지
    console.log('sql 변경시 재시작 없이 반영되도록 함.');
    delete require.cache[require.resolve('./sql.js')];  // 이미 올라가 있는 sql.js의 cache 삭제
    sql = require('./sql.js');  // sql.js 다시 불러오기
});

const db = {    // 데이터베이스 불러오기
    database: "dev",
    connectionLimit: 10,
    host: "172.20.10.4",
    user: "root",
    password: "mariadb"
};

const dbPool = require('mysql').createPool(db); // mariadb 모듈 불러오기, createPool로 db와 연동시키기

app.post('/api/login', async (request, res) => {    // client에서 server쪽으로 axios post()방식으로 login api 가져오기
    // request.session['email'] = 'hslee7231@gmail.com';
    // res.send('ok');
    try {
        await req.db('signUp', request.body.param); // signUp sql 호출하고, request시 body에 파라미터도 함께 들어오도록 설정
        if(request.body.param.length > 0) {
            for(let key in request.body.param[0]) request.session[key] = request.body.param[0][key];    // 받아온 파리미터의 첫번째 인자를 key값에 넣어줌
            res.send(request.body.param[0]);    // 받아왔던 파라미터를 보내줌
        }else { // 파라미터 없이 api를 호출했을 시
            res.send({error: "Please try again or contact system manager ."});
        }
    } catch(err) {  // DB에 저장 도중 error가 났을 시
        res.send({
            error: "DB access error"
        });
    }
}); 

app.post('/api/logout', async (request, res) => {   // client에서 server쪽으로 axios post()방식으로 logout api가져오기
    request.session.destroy();
    res.send('ok');
});

app.post('/upload/:productId/:type/:fileName', async (request, res) => {

    let {
      productId,
      type,
      fileName
    } = request.params;
    const dir = `${__dirname}/uploads/${productId}`;
    const file = `${dir}/${fileName}`;
    if (!request.body.data) return fs.unlink(file, async (err) => res.send({
      err
    }));
    const data = request.body.data.slice(request.body.data.indexOf(';base64,') + 8);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFile(file, data, 'base64', async (error) => {
      await req.db('productImageInsert', [{
        product_id: productId,
        type: type,
        path: fileName
      }]);
  
      if (error) {
        res.send({
          error
        });
      } else {
        res.send("ok");
      }
    });
  });
  
  app.get('/download/:productId/:fileName', (request, res) => {
    const {
      productId,
      type,
      fileName
    } = request.params;
    const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
    res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
    if (!fs.existsSync(filepath)) res.send(404, {
      error: 'Can not found file.'
    });
    else fs.createReadStream(filepath).pipe(res);
  });

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
        res.send(await req.db(request.params.alias, request.body.param));    // alias에 뭐가 들어올 지 모르기 때문에 경로를 설정, request시 body에 파라미터도 함께 들어오도록 설정
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