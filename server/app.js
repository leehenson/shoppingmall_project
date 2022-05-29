const express = require("express"); // express 웹서버 관련 모듈 불러오기
const history = require("connect-history-api-fallback"); // redirect 에러 해결 모듈
const app = express(); // express() 함수 호출
const port = process.env.PORT || 3000; // 포트 선언
const bodyParser = require("body-parser"); // body-parser 호출
const bcrypt = require("bcryptjs"); // bcrypt 호출
const session = require("express-session"); // express-session 로그인 관련 모듈 불러오기
const fs = require("fs"); // filesystem으로 디렉토리에 접근할 수 있게 해주는 모듈 불러오기
const http = require("http"); // http 모듈 불러오기

setInterval(() => {
  // heroku sleep mode 방지를 위해 10분 간격으로 트래픽 생성
  http.get("http://kongshop.herokuapp.com/");
}, 600000);

app.use(
  session({
    // session 처리 방법
    secret: "secret code", // session에 대한 key(secret code)
    resave: false, // resave: request 요청이 왔을 때, session에 수정사항이 생기지 않더라도, 다시 저장하는 기능
    saveUninitialized: false, // saveUninitialied: session에 저장할 내역이 없더라도, session을 항상 재저장을 하는 기능
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 쿠기 유효시간 (1시간)
    },
  })
);

app.use(
  express.json({
    // body request 요청을 할 때 파라미터를 json형태의 최대 50mb 파라미터로 전송
    limit: "50mb",
  })
);

app.use(bodyParser.json());

let sql = require("./sql.js"); // sql.js 불러오기

// nodemon 모듈로 대체 가능
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  // file 레파지토리를 감시하다가 변경되는 것을 감지
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")]; // 이미 올라가 있는 sql.js의 cache 삭제
  sql = require("./sql.js"); // sql.js 다시 불러오기
});

const db = {
  // heroku jawsdb 데이터베이스 연동
  database: "m65p7x5zbrhxlzye",
  connectionLimit: 10,
  host: "cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ujp658q30bbihu1v",
  password: "rv0mz9y0xv6gpd3e",
};

const dbPool = require("mysql").createPool(db); // mysql 모듈 불러오기, createPool로 db와 연동시키기

app.post("/api/memberJoin", async (request, res) => {
  // 회원가입 api
  const signUp = await req.db("memberJoin", request.body.user.email); // body에서 받아온 data를 sql memberJoin을 통해 똑같은 email이 있는지 확인
  if (signUp == 0) {
    // 똑같은 email이 없을 시
    const salt = bcrypt.genSaltSync(); // 비밀번호 암호화를 위한 bcrypt salt 선언
    const encryptedPassword = bcrypt.hashSync(request.body.user.password, salt); // body에서 받아온 비밀번호 data에 salt를 넣어 암호화
    dbPool.query(
      'INSERT INTO t_user (email, password, name, address, phone, account_holder, bank_name, bank_account_number) VALUES ("' +
        request.body.user.email +
        '", "' +
        encryptedPassword +
        '", "' +
        request.body.user.name +
        '", "' +
        request.body.user.address +
        '", "' +
        request.body.user.phone +
        '", "' +
        request.body.user.account_holder +
        '", "' +
        request.body.user.bank_name +
        '", "' +
        request.body.user.bank_account_number +
        '")',
      (err, row2) => {
        // body에서 받아온 data들을 sql를 통해 Insert
        if (err) throw err;
      }
    );
    res.json({
      // 성공 시
      success: true,
      message: "회원가입 성공!",
    });
  } else {
    // 실패 시
    res.send(401);
  }
});

app.post("/api/userInfoUpdate", async (request, res) => {
  // 회원정보 수정 api
  const salt = bcrypt.genSaltSync(); // 비밀번호 암호화를 위한 bcrypt salt 선언
  const encryptedPassword = bcrypt.hashSync(request.body.user.password, salt); // body에서 받아온 data를 sql memberJoin을 통해 똑같은 email이 있는지 확인
  dbPool.query(
    'UPDATE t_user SET email = "' +
      request.body.user.email +
      '", password = "' +
      encryptedPassword +
      '", name = "' +
      request.body.user.name +
      '", address = "' +
      request.body.user.address +
      '", phone = "' +
      request.body.user.phone +
      '", account_holder = "' +
      request.body.user.account_holder +
      '", bank_name = "' +
      request.body.user.bank_name +
      '", bank_account_number = "' +
      request.body.user.bank_account_number +
      '" WHERE email = "' +
      request.body.user.email +
      '"',
    (err, row2) => {
      // body에서 받아온 data들을 sql를 통해 update
      if (err) throw err;
    }
  );
  res.json({
    // 성공 시
    success: true,
    message: "회원정보 수정 완료!",
  });
});

app.post("/api/login", async (request, res) => {
  // login api
  await dbPool.query(
    'SELECT email, password FROM t_user WHERE email = "' +
      request.body.user.email +
      '"',
    (err, row) => {
      // body에서 받아온 data와 동일한 data가 있는지 확인
      if (err) {
        // 동일한 data가 없을 시 에러 호출
        res.json({
          success: false,
          message: "Login failed please check your email or pasword",
        });
      }
      if (row[0] !== undefined && row[0].email === request.body.user.email) {
        // data가 undefined가 아니고, body에서 받아온 email과 select한 email이 같은 경우
        bcrypt.compare(
          request.body.user.password,
          row[0].password,
          (err, res2) => {
            // body에서 받아온 password와 select한 password를 비교
            if (res2) {
              // 같은 경우 success
              res.json({
                success: true,
                message: "Login successful",
              });
            } else {
              // 다른 경우 에러 호출
              res.send(401);
            }
          }
        );
      }
    }
  );
});

app.post("/api/kakaoLogin", async (request, res) => {
  // client에서 server쪽으로 axios post방식으로 login api 가져오기
  // request.session['email'] = 'hslee7231@gmail.com';
  // res.send('ok');
  try {
    await req.db("signUp", request.body.param); // signUp sql 호출하고, request시 body에 파라미터도 함께 들어오도록 설정
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0])
        request.session[key] = request.body.param[0][key]; // 받아온 파리미터의 첫번째 인자를 key값에 넣어줌
      res.send(request.body.param[0]); // 받아왔던 파라미터를 보내줌
    } else {
      // 파라미터 없이 api를 호출했을 시
      res.send({ error: "Please try again or contact system manager ." });
    }
  } catch (err) {
    // DB에 저장 도중 error가 났을 시
    res.send({
      error: "DB access error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  // client에서 server쪽으로 axios post()방식으로 logout api가져오기
  request.session.destroy(); // session 없애기
  res.send("ok");
});

app.post("/upload/:productId/:type/:fileName", async (request, res) => {
  // file 업로드 api

  let { productId, type, fileName } = request.params; // 받아온 파라미터
  const dir = `${__dirname}/uploads/${productId}`; // dir 경로 선언
  const file = `${dir}/${fileName}`; // file 경로 선언
  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        // body에서 받아온 data 이상 시 에러 호출
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  ); // body에서 받아온 data를 base64를 통해 인코딩
  if (!fs.existsSync(dir)) fs.mkdirSync(dir); // dir 파일경로가 없을 시 폴더 만들기
  fs.writeFile(file, data, "base64", async (error) => {
    // file 경로로 data를 base64기반으로 wirteFile
    await req.db("productImageInsert", [
      {
        // sql productImageInsert를 통해 받아온 파라미터를 Insert
        product_id: productId,
        type: type,
        path: fileName,
      },
    ]);

    if (error) {
      // 에러 발생 시
      res.send({
        error,
      });
    } else {
      // 에러 없을 시
      res.send("ok");
    }
  });
});

app.get("/download/:productId/:fileName", (request, res) => {
  // upload한 data dawnload
  const { productId, type, fileName } = request.params; // 받아온 파라미터
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // file 경로 선언
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      // 받아온 파라미터와 같은 data가 경로에 없을 시 에러 발생
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res); // 에러 없을 시, 해당 경로의 file 읽기
});

app.post("/apirole/:alias", async (request, res) => {
  // 사용자가 서버로 지정되지 않는 데이터 요청을 할 때, 경유하게 만듬
  if (!request.session.email) {
    return res.status(401).send({ error: "You need to login." });
  }

  try {
    res.send(await req.db(request.params.alias)); // alias에 뭐가 들어올 지 모르기 때문에 경로를 설정
  } catch (err) {
    // err라는 에러문이 뜨도록 예외처리
    res.status(500).send({
      error: err,
    });
  }
});

app.post("/api/:alias", async (request, res) => {
  // 사용자가 서버로 지정되지 않는 데이터 요청을 할 때, 경유하게 만듬
  try {
    res.send(await req.db(request.params.alias, request.body.param)); // alias에 뭐가 들어올 지 모르기 때문에 경로를 설정, request시 body에 파라미터도 함께 들어오도록 설정
  } catch (err) {
    // err라는 에러문이 뜨도록 예외처리
    res.status(500).send({
      error: err,
    });
  }
});

const req = {
  // 받아온 alias, param, where를 받아 alias와 같은 sql문을 데이터베이스에 query
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          // 에러 시
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows); // 에러 없을 시, rows resolve
      })
    );
  },
};

app.use(history());

app.use(express.static(__dirname + "/dist")); // dist에 있는 정적인 file들을 사용

app.listen(port, () => {
  // 3000번 포트로 웹서버 구동
  console.log(`Server Started. port ${port}.`); // 웹서버 구동 시, console로 메세지를 남김
});
