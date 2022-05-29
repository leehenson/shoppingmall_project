# 쇼핑몰 만들기

옷과 패션에 관심이 많기도 하고, 쇼핑몰에는 회원가입, 로그인, 주문조회, 배송조회, 등의 기능이 있어 만들어보면서 많은 것도 배우고 알아갈 수 있을 거라고 생각해 만들어 보게됐습니다.

---

## 구현하고 싶은 기능

1. 회원가입 기능
2. 로그인 기능
3. 상품 리스트 기능
4. 상품 상세보기 기능
5. 상품 등록 기능
6. 상품 수정 기능
7. 상품 삭제 기능
8. 회원 프로필 확인 및 수정 기능
9. 회원 주문내역 기능
10. 택배 조회 기능
11. 회원 관리 기능
12. 주문 관리 기능
13. 장바구니 기능
14. 상품 주문 기능

---

## 사용 스킬

### Frontend

- HTML
- CSS
- Bootstrap
- Vue.js

### Backend

- node.js
- mariadb
- heidiSQL

### ETC

- heroku
- jawsdb maria

---

## DB 정보

![db정보](https://ifh.cc/g/5xTS43.jpg)
![db정보](https://ifh.cc/g/W9LAzd.jpg)
![db정보](https://ifh.cc/g/CO2crO.jpg)
![db정보](https://ifh.cc/g/6szyVD.jpg)
![db정보](https://ifh.cc/g/Qr7j1X.jpg)
![db정보](https://ifh.cc/g/H2JXJP.jpg)
![db정보](https://ifh.cc/g/HXSYH7.jpg)
![db정보](https://ifh.cc/g/aLMcm0.jpg)
![db정보](https://ifh.cc/g/VNKVL3.jpg)
![db정보](https://ifh.cc/g/Yq9mg3.jpg)

---

## 구현한 웹페이지

Click [here](http://kongshop.herokuapp.com/)

## 로그인 정보

### SELLER 정보

EMAIL: seller  
PASSWORD: seller

### USER 정보

EMAIL: test  
PASSWORD: test

## 구현 방법

### 백엔드 처리

```javascript
* app.js

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
```

따로 구현하지 않은 post방식 api는 alias와 param, where을 받고, sql.js에 alias와 동일한 이름을 가진 객체의 sql문을 쿼리하는 형태로 구현하였습니다.  
그리고 session에 이메일이 없을 시 에러가 뜨게 하였고, alias와 동일한 객체가 sql.js에 없을 시 에러가 발생하도록 구현하였습니다.

### 회원가입

```javascript
* MemberJoin.vue

<script>
export default {
  data() {
    return {
      t_user: {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        account_holder: "",
        bank_name: "",
        bank_account_number: "",
      },
      bankList: [],
      // bank_name: [],
      // bank: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  created() {
    this.getBankList(); // created 단계에서 bankList data 미리 호출
  },
  methods: {
    goToLogin() {
      // 해당 메소드 실행시 /login로 라우팅
      this.$router.push({ path: "/login" });
    },
    async getBankList() {
      // bankList sql를 통해 bankList 데이터 호출
      let bankList = await this.$api("/api/bankList", {});
      this.bankList = bankList;

      // let oBank = {};
      // bankList.forEach(item => {
      //   oBank[item.bank_name] = item.id;
      // });

      // let bank_name = [];
      // for(let key in oBank) {
      //   bank_name.push(key);
      // }
      // console.log(bank_name);

      // this.bank_name = bank_name;
    },
    memberJoin() {
      if (this.t_user.email == "") {
        // 이메일에 값이 없을 시 해당 alert 출력
        return this.$swal("이메일은 필수 입력값입니다.");
      }

      if (this.t_user.password == "") {
        // 비밀번호에 값이 없을 시 해당 alert 출력
        return this.$swal("비밀번호는 필수 입력값입니다.");
      }

      if (this.t_user.name == "") {
        // 이름에 값이 없을 시 해당 alert 출력
        return this.$swal("이름은 필수 입력값입니다.");
      }

      if (this.t_user.address == "") {
        // 주소에 값이 없을 시 해당 alert 출력
        return this.$swal("주소는 필수 입력값입니다.");
      }

      if (this.t_user.mobile == "") {
        // 휴대폰 번호에 값이 없을 시 해당 alert 출력
        return this.$swal("폰 번호는 필수 입력값입니다.");
      }

      if (this.t_user.account_holder == "") {
        // 예금주에 값이 없을 시 해당 alert 출력
        return this.$swal("예금주는 필수 입력값입니다.");
      }

      if (this.t_user.bank_account_number == "") {
        // 계좌번호에 값이 없을 시 해당 alert 출력
        return this.$swal("계좌번호는 필수 입력값입니다.");
      }

      // this.t_user.bank_name_id = this.bankList.filter(c => {
      //   return (c.bank_name == this.bank);
      // })[0].id;

      // console.log(this.t_user.bank_name_id);

      this.$swal
        .fire({
          // 위의 조건이 만족 시 sweetAlert2를 통해 alert 띄움
          title: "정말 가입하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "JOIN",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/memberJoin", { user: this.t_user }) // t_user의 데이터를 memberJoin sql를 통해 Insert
              .then(() => {
                // api가 정상적으로 실행될 시 저장되었다는 alert를 띄우고 /login으로 라우팅
                this.$swal.fire("Saved.", "", "success");
                this.$router.push({ path: "/login" });
              })
              .catch(() => {
                // 오류 발생 시, 해당 alert를 띄움
                alert("이메일이 중복됩니다. 다른 이메일을 사용해 주세요.");
              });
          }
        });
    },
  },
};
</script>

해당 sql
bankList: `SELECT bank_name FROM t_bank_name`
memberJoin: `SELECT email FROM t_user WHERE email = ?`

```

우선 회원가입 페이지 script 부분입니다. 은행 정보가 있는 t_bank 데이터베이스 테이블 데이터를 불러와 select로 선택할 수 있게끔 호출해주고, input의 data들을 파라미터로 백엔드로 전송해줍니다.

```javascript
* app.js

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
```

회원가입 백엔드 부분입니다. 프론트엔드에서 받아온 파라미터를 `INSERT INTO t_user (email, password, name, address, phone, account_holder, bank_name, bank_account_number) VALUES ("' + request.body.user.email + '", "' + encryptedPassword + '", "' + request.body.user.name + '", "' + request.body.user.address + '", "' + request.body.user.phone + '", "' + request.body.user.account_holder + '", "' + request.body.user.bank_name + '", "' + request.body.user.bank_account_number + '")'` sql문을 통해 t_user 테이블에 Insert해줍니다. 비밀번호는 bcrypt를 활용하여 암호화를 해주었습니다.

---

### 로그인 & 로그아웃

```javascript
* MemberLogin.vue

<script>
export default {
  data() {
    return {
      t_user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  methods: {
    async login() {
      await this.$api("/api/login", { user: this.t_user }) // t_user 데이터를 login sql를 통해 확인
        .then(() => {
          alert("로그인 성공!"); // api가 정상적으로 작동할 시 해당 alert를 띄움
          this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          this.$store.commit("user", this.t_user); // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
        })
        .catch(() => {
          // api 오류 발생 시 해당 alert 띄움
          alert("계정 정보를 확인해주세요.");
        });
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email, gender", // 카카오계정에서 받아올 정보
        success: this.getProfile, // 로그인 성공시 getProfile() 호출
      });
    },
    getProfile(authObj) {
      // authObj라는 이름으로 파라미터 받아오기
      console.log(authObj);
      window.Kakao.API.request({
        // 로그인한 유저의 정보 가져오기
        url: "/v2/user/me",
        success: (res) => {
          // 성공시 콜백함수
          const kakao_account = res.kakao_account; // 로그인한 유저의 계정 정보를 받아오기
          console.log(kakao_account); // 계정 정보 확인
          this.kakao_login(kakao_account); // 계정 정보를 kakao_login으로 보냄
          this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          alert("로그인 성공!"); // 해당 alert 호출
        },
      });
    },
    async kakao_login(kakao_account) {
      // login겸 signup
      await this.$api("/api/kakaoLogin", {
        // 게정 정보를 kakaoLogin sql 파라미터로 보냄
        param: [
          { email: kakao_account.email, name: kakao_account.profile.nickname },
          { name: kakao_account.profile.nickname },
        ],
      });

      this.$store.commit("user", kakao_account); // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {}); // store에 user 정보의 data를 빈값으로 만듬
        // this.$router.go();
        alert("로그아웃");
      });
    },
  },
};
</script>
```

로그인 페이지 script 부분입니다. 저는 kakao developer api를 통해 카카오 계정으로도 로그인을 할 수 있게끔 구현하였습니다.  
우선 회원가입한 회원정보로 로그인하는 방법은 input 적힌 email과 password 데이터를 백엔드로 전송합니다.  
카카오 로그인은 카카오 로그인 버튼을 누르면 카카오 계정으로 로그인할 수 있는 창이 뜨고 카카오 계정으로 로그인 시 카카오 계정 정보를 백엔드로 전송합니다.  
로그아웃은 상태관리 되어있는 이메일이 있을 시 navbar에 활성화가 되며 로그아웃 버튼이 눌릴 시 상태관리가 되어있는 이메일을 빈값으로 만들어줍니다.

```javascript
* app.js

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

해당 sql
signUp: `INSERT INTO t_user SET ? ON DUPLICATE KEY UPDATE ?`

```

로그인 & 로그아웃 백엔드 부분입니다. 기본 로그인 같은 경우 받아온 email과 같은 email 데이터베이스에 있는 select를 하고 같은 email이 있다면 bcrypt로 암호화된 password를 `bcrypt.compare`를 통해 비교하여 password도 동일하면 로그인을 성공시키고, 틀릴 경우 error가 발생하도록 하였습니다.

카카오 로그인 같은 경우 받아온 카카오 계정 정보를 signUp sql를 통해 같은 정보가 없으면 Insert 있으면 Update가 되도록 로그인과 회원가입이 같이 되도록 구현하였습니다.

로그아웃 같은 경우 session을 없애서 로그아웃 하는 방식으로 구현하였습니다.

---

### 상품리스트

```javascript
* ProductList.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productList: [],
    };
  },
  created() {
    this.getProductList(); // created 단계에서 getProductList를 실행시켜 data 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getProductList() {
      // getProductList 메소드 호출
      this.productList = await this.$api("/api/productList", {}); // url를 따라 app.js의 /api/:alias를 타고 sql productList의 data 호출
      console.log(this.productList); // 데이터를 잘 받아오는지 확인
    },
    goToDetail(product_id) {
      // 제품 이미지 클릭시 product_id를 받아 제품 상세페이지로 router되도록 설정
      this.$router.push({ path: "/detail", query: { product_id: product_id } }); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
  },
};
</script>

해당 sql
productList: `SELECT t1.*, t2.path
        FROM t_product t1, t_image t2
        WHERE t1.id = t2.product_id AND t2.type = 1`

```

제품리스트 페이지 script 부분입니다. productList sql문을 통해 제품 정보들과 썸네일 이미지를 가져와 카드형태로 보여주고, 제품 이미지 클릭 시 해당 제품의 id를 path에 넣어주어 해당 id를 가진 제품의 상세페이지로 라우팅 되도록 구현하였습니다.

---

### 상품 상세페이지

```javascript
* ProductDetail.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderId: 0,
      orderDetail: {},
      statusList: [],
    };
  },
  created() {
    this.orderId = this.$route.query.order_id; // path의 order_id를 orderId로 선언
    this.getOrderDetail(); // created 단계에서 getOrderDetail를 실행시켜 data를 미리 호출
    this.getStatusList(); // created 단계에서 getStatusList를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getOrderDetail() {
      // getCartList 메소드 호출
      let orderDetail = await this.$api("/api/orderDetail", {
        param: [this.orderId],
      }); // url를 따라 app.js의 /api/:alias를 타고 orderId를 보내고 sql cartList를 통해 data 호출
      this.orderDetail = orderDetail;
      console.log(this.orderDetail); // 데이터를 잘 받아오는지 확인
    },
    async getStatusList() {
      let statusList = await this.$api("/api/statusList"); // 해당 sql를 통해 status data 호출
      this.statusList = statusList;
    },
    goToList() {
      this.$router.push({ path: "/order_management" }); // 해당 메소드 실행 시, /order_management로 라우팅
    },
    async goToUpdate(order_id) {
      // order_id를 받아 sweetAlert2 실행
      this.$swal
        .fire({
          title: "정말 수정하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "MODIFY",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderUpdate", {
              param: [
                this.orderDetail[0].delivery_status,
                this.orderDetail[0].transport_document_number,
                order_id,
              ],
            }); // status, 운송장 번호, order_id data를 파라미터로 보내고 sql orderUpdate를 통해 주문정보 수정
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/order_management" }); // /order_management로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
productDetail: `SELECT t1.*, t2.path, t3.category
        FROM t_product t1, t_image t2, t_category t3
        WHERE t1.id = ? AND t1.id = t2.product_id AND t2.type = 3 AND t1.category_id = t3.id`
productMainImages: `SELECT * FROM t_image WHERE product_id = ? AND type = 2`
cartInsert: `INSERT INTO t_cart (product_id, user_email, quantity, totalPrice) VALUES (?, ?, ?, ?)`

```

제품 상세페이지 script 부분입니다. productDetail sql문을 통해 제품들의 정보들을 가져오고, productMainImages sql문을 통해 type이 2인 메인이미지들 가져옵니다.

그리고 cartInsert sql문을 통해 장바구니에 해당 데이터들을 Insert해줍니다.

---

### 상품 등록 수정 삭제

```javascript
* Sales.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productList: [],
    };
  },
  created() {
    this.getProductList(); // created 단계에서 getProductList를 실행시켜 data 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getProductList() {
      // getProductList 메소드 호출
      this.productList = await this.$api("/api/productList2", {}); // url를 따라 app.js의 /api/:alias를 타고 sql productList2의 data 호출
      console.log(this.productList); // 데이터를 잘 받아오는지 확인
    },
    goToInsert() {
      this.$router.push({ path: "/create" }); // /create로 라우팅
    },
    goToDetail(product_id) {
      // 제품 등록 버튼 클릭시 제품 등록페이지로 router되도록 설정
      this.$router.push({ path: "/detail", query: { product_id: product_id } }); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
    goToUpdate(product_id) {
      // 수정 버튼 클릭시 제품 수정페이지로 router되도록 설정
      this.$router.push({ path: "/update", query: { product_id: product_id } });
    },
    goToImageInsert(product_id) {
      // 사진 등록 버튼 클릭시 사진 등록페이지로 router되도록 설정
      this.$router.push({
        path: "/image_insert",
        query: { product_id: product_id },
      });
    },
    deleteProduct(product_id) {
      // 삭제 버튼 클릭시 sweetAlert 실행
      this.$swal
        .fire({
          title: "정말 삭제하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "DELETE",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/productDelete", { param: [product_id] }); // product_id data를 파라미터로 보내고, sql productDelete를 통해 data 삭제
            this.getProductList(); // getProductList를 실행시켜 갱신
            this.$swal.fire("Deleted.", "", "success");
          }
        });
    },
  },
};
</script>

해당 sql
productList2: `SELECT t3.*, t4.path FROM (SELECT t1.*, t2.category
          FROM t_product t1, t_category t2
          WHERE t1.category_id = t2.id) t3
          LEFT JOIN (SELECT * FROM t_image WHERE type=1) t4
          on t3.id = t4.product_id`
productDelete: `DELETE FROM t_product WHERE id=?`

```

제품 관리 페이지의 script 부분입니다.
여기서는 우선 productList2 sql문을 통해 등록된 전체 제품 정보를 가져옵니다.

그리고 제품 등록 버튼을 누르면 제품을 등록할 수 있는 페이지로 라우팅할 수 있고, 사진 등록 버튼을 누르면 이미지를 등록할 수 있는 페이지로 라우팅되고, 수정 버튼을 누르면 해당 제품의 id를 보내 해당 제품의 수정 페이지로 라우팅할 수 있습니다.

그리고 삭제 버튼을 누르면 해당 제품 id를 보내 productDelete sql문을 통해 해당 제품을 삭제할 수 있습니다.

```javascript
* ProductCreate.vue

<script>
export default {
  data() {
    return {
      product: {
        product_name: "",
        product_price: 0,
        product_description: "",
        product_color: "",
        product_fabric: "",
        product_model: "",
        product_size: "",
        product_sizeGuide: "",
        tags: "",
        seller_id: 1,
        category_id: 1,
      },
      categoryList: [],
      category: [],
      cate: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  created() {
    this.getCategoryList(); // created 단계에서 getCategoryList를 실행시켜 data 미리 호출
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    goToList() {
      this.$router.push({ path: "/sales" }); // 해당 메소드 실행 시, /sales로 라우팅
    },
    async getCategoryList() {
      let categoryList = await this.$api("/api/categoryList", {}); // sql categoryList를 통해 data 호출
      this.categoryList = categoryList;

      let oCategory = {}; // oCategory를 오브젝트로 선언
      categoryList.forEach((item) => {
        oCategory[item.category] = item.id; // oCategory에 categoryList data를 forEach를 통해 넣어주고, item.id로 선언
      });

      let category = []; // category를 배열로 선언
      for (let key in oCategory) {
        category.push(key); // category에 oCategory의 key값을 넣어줌
      }
      console.log(category);

      this.category = category;
    },
    productInsert() {
      if (this.product.product_name == "") {
        // 제품명에 값이 없을 시 해당 alert 출력
        return this.$swal("제품명은 필수 입력값입니다.");
      }

      if (this.product.product_price == "" || this.product.product_price == 0) {
        // 제품가격에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("제품가격을 입력하세요.");
      }

      if (this.product.product_description == "") {
        // 제품설명에 값이 없을 시 해당 alert 출력
        return this.$swal("제품설명은 필수 입력값입니다.");
      }

      if (this.product.product_color == "") {
        // 색상에 값이 없을 시 해당 alert 출력
        return this.$swal("색상은 필수 입력값입니다.");
      }

      if (this.product.product_fabric == "") {
        // 소재에 값이 없을 시 해당 alert 출력
        return this.$swal("소재는 필수 입력값입니다.");
      }

      if (this.product.product_model == "") {
        // 모델 착용 정보에 값이 없을 시 해당 alert 출력
        return this.$swal("모델 착용 정보는 필수 입력값입니다.");
      }

      if (this.product.product_size == "") {
        // 사이즈에 값이 없을 시 해당 alert 출력
        return this.$swal("사이즈는 필수 입력값입니다.");
      }

      if (this.product.product_sizeGuide == "") {
        // 사이즈 가이드에 값이 없을 시 해당 alert 출력
        return this.$swal("사이즈 가이드는 필수 입력값입니다.");
      }

      this.product.category_id = this.categoryList.filter((c) => {
        // product의 category_id는 category와 cate가 같은 값을 가지는 categoryList의 data의 0번째 id 선언
        return c.category == this.cate;
      })[0].id;

      console.log(this.product.category_id);

      this.$swal
        .fire({
          // 위의 조건들이 충족 시 sweetAlert2 실행
          title: "정말 등록하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "REGISTRATION",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/productInsert", { param: [this.product] }); // product data를 파라미터로 보내고, sql productInsert를 통해 data Insert
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/sales" }); // /sales로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
categoryList: `SELECT * FROM t_category`
productInsert: `INSERT INTO t_product SET ?`

```

제품 등록 페이지 script 부분입니다. categoryList sql문을 통해 카테고리 정보를 v-for을 통해 select에 띄워줍니다.
그리고 각 input에 등록할 제품 정보들을 입력하고 save 버튼을 눌러 productInsert sql문을 통해 제품 정보를 Insert해줍니다.

```javascript
* ImageInsert.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productId: 0,
      productName: "",
      productDetail: {},
      productImage: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  created() {
    // created 단계에서 해당 메소드를 실행시켜 data를 받아오게 설정
    this.productId = this.$route.query.product_id; // path에 있는 product_id 값을 불러옴
    this.getProductDetail();
    this.getProductImage();
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    goToList() {
      // confirm 버튼을 누르면 /sales 화면으로 라우팅되게 함
      this.$router.push({ path: "/sales" });
    },
    async getProductDetail() {
      // getProductDetail 메소드 호출
      let productDetail = await this.$api("/api/productDetail", {
        param: [this.productId],
      }); // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productDatail의 data 호출
      if (productDetail.length > 0) {
        // productDetail의 데이터를 가져왔을 때 data가 있으면
        this.productDetail = productDetail[0]; // productDetail의 첫번째만 가져옴
      }
    },
    async getProductImage() {
      // getProductImage 메소드 호출
      this.productImage = await this.$api("/api/imageList", {
        param: [this.productId],
      }); // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql imageList의 data 호출
      console.log(this.productImage);
    },
    deleteImage(id) {
      // productImage의 id를 받고, sweetAlert2를 활용하여 이미지 삭제에 대해 alert를 띄움
      this.$swal
        .fire({
          title: "정말 삭제 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: `삭제`,
          cancelButtonText: `취소`,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/imageDelete", { param: [id] }); // productImage의 id를 imageDelete sql에 파라미터로 보내 productImage 데이터 delete
            this.getProductImage(); // delete후 getProductImage 갱신
            this.$swal.fire("삭제되었습니다!", "", "success");
          }
        });
    },
    async uploadFile(files, type) {
      // 이미지 files와 type을 받아 업로드하는 메소드
      let name = "";
      let data = null;
      if (files) {
        // files이 있다면
        name = files[0].name; // 0번쨰 파일의 이름
        data = await this.$base64(files[0]); // files를 $base64를 통해 비동기적으로 읽음
      }
      const { error } = await this.$api(
        `/upload/${this.productId}/${type}/${name}`,
        { data }
      ); // 데이터의 productId와 type, name, data를 api로 전송
      if (error) {
        // 문제 발생 시
        return this.$swal("이미지 업로드 실패했습니다. 다시 시도하세요.");
      }
      this.$swal("이미지가 업로드 되었습니다."); // 문제 없을 시
      setTimeout(() => {
        // 1초 후 getProudctImage() 호출
        this.getProductImage();
      }, 1000);
    },
  },
};
</script>
```

사진등록페이지 script 부분입니다. 받아온 files를 $base64를 통해 비동기적으로 읽게 하고, `await this.$api('/upload/${this.productId}/${type}/${name}', { data });`를 통해 백엔드로 전송해줍니다.

```javascript
* app.js

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

해당 sql
productImageInsert: `INSERT INTO t_image SET ?`

```

이미지 등록 백엔드 부분입니다. 받아온 데이터로 경로를 설정해주고, 해당 경로에 폴더가 없으면 만들어주게 구현하고, base64를 통해 인코딩을 하여 writeFile로 파일을 생성해줍니다.

그리고 받아온 데이터를 productImageInsert sql문을 통해 Insert해줍니다. 그리고 받아온 파라미터 데이터에 따라 경로로 찾아가 file을 읽어 download를 해줍니다.

```javascript
* ProductUpdate.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      productId: 0,
      productDetail: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.productId = this.$route.query.product_id; // path에 있는 product_id 값을 불러옴
    this.getProductDetail(); // created 단계에서 getProductDetail를 실행시켜 data 미리 호출
  },
  methods: {
    goToList() {
      this.$router.push({ path: "/sales" }); // /sales로 라우팅
    },
    async getProductDetail() {
      // getProductDetail 메소드 호출
      let productDetail = await this.$api("/api/productDetail2", {
        param: [this.productId],
      }); // url를 따라 app.js의 /api/:alias를 타고 productId의 파라미터를 받아 해당 sql productDatail의 data 호출
      if (productDetail.length > 0) {
        // productDetail의 데이터를 가져왔을 때
        this.productDetail = productDetail[0]; // productDetail의 첫번째만 가져옴
      }
    },
    productUpdate() {
      if (this.productDetail.product_name == "") {
        // 제품명에 값이 없을 시 해당 alert 출력
        return this.$swal("제품명은 필수 입력값입니다.");
      }

      if (
        this.productDetail.product_price == "" ||
        this.productDetail.product_price == 0
      ) {
        // 제품가격에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("제품가격을 입력하세요.");
      }

      if (this.productDetail.product_description == "") {
        // 제품 설명에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("제품설명은 필수 입력값입니다.");
      }

      if (this.productDetail.product_color == "") {
        // 색상에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("색상은 필수 입력값입니다.");
      }

      if (this.productDetail.product_fabric == "") {
        // 소재에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("소재는 필수 입력값입니다.");
      }

      if (this.productDetail.product_model == "") {
        // 모델 착용 정보에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("모델 착용 정보는 필수 입력값입니다.");
      }

      if (this.productDetail.product_size == "") {
        // 사이즈에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("사이즈는 필수 입력값입니다.");
      }

      if (this.productDetail.product_sizeGuide == "") {
        // 사이즈 가이드에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal("사이즈 가이드는 필수 입력값입니다.");
      }
      this.$swal
        .fire({
          title: "정말 수정하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "MODIFY",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/productUpdate", {
              param: [this.productDetail, this.productId],
            }); // productDetail, productId data를 파라미터로 보내고, sql productUpdate를 통해 data 수정
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/sales" }); // /sales로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
productDetail2: `SELECT t1.product_name, t1.product_price, t1.product_description, t1.product_color, t1.product_fabric, t1.product_model, t1.product_size, t1.product_sizeGuide, t1.tags
        FROM t_product t1 WHERE t1.id = ?`
productUpdate: `UPDATE t_product SET ? WHERE id = ?`

```

제품 수정 페이지 script 부분입니다. productDetail2 sql문을 통해 해당 id를 가진 제품의 상세 정보를 가져옵니다.

가져온 데이터들을 수정 후 productUpdate sql문을 통해 update를 해줍니다.

---

### 회원 정보 관리 기능

```javascript
* MemberProfile.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      user_email: "",
      userInfo: {},
      bankList: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.user_email = this.$store.state.user.email; // 상태관리 되어있는 email를 user_email로 선언
    this.getUserInfo(); // created 단계에서 getUserInfo를 실행시켜 data를 미리 호출
    this.getBankList(); // created 단계에서 getBankList를 실행시켜 data를 미리 호출
  },
  methods: {
    goToList() {
      this.$router.push({ path: "/mypage" }); // 해당 메소드가 실행될 시 /mymage로 라우팅
    },
    async getUserInfo() {
      // getUserInfo 메소드 호출
      let userInfo = await this.$api("/api/userInfo", {
        param: [this.user_email],
      }); // url를 따라 app.js의 /api/:alias를 타고 user_email를 파라미터로 받아 해당 sql userInfo의 data 호출
      if (userInfo.length > 0) {
        // userInfo 데이터를 가져왔을 때
        this.userInfo = userInfo[0]; // userInfo 첫번째만 가져옴
      }
    },
    async getBankList() {
      let bankList = await this.$api("/api/bankList", {}); // sql bankList를 통해 bank data 호출
      this.bankList = bankList;
    },
    productUpdate() {
      if (this.userInfo.password == "") {
        // 비밀번호에 값이 없을 시 해당 alert 출력
        return this.$swal("비밀번호는 필수 입력값입니다.");
      }

      if (this.userInfo.name == "") {
        // 이름에 값이 없을 시 해당 alert 출력
        return this.$swal("이름은 필수 입력값입니다.");
      }

      if (this.userInfo.address == "") {
        // 주소에 값이 없을 시 해당 alert 출력
        return this.$swal("주소는 필수 입력값입니다.");
      }

      if (this.userInfo.phone == "") {
        // 휴대폰 번호에 값이 없을 시 해당 alert 출력
        return this.$swal("핸드폰 번호는 필수 입력값입니다.");
      }

      if (this.userInfo.account_holder == "") {
        // 예금주에 값이 없을 시 해당 alert 출력
        return this.$swal("예금주는 필수 입력값입니다.");
      }

      if (this.userInfo.bank_account_number == "") {
        // 계좌번호에 값이 없을 시 해당 alert 출력
        return this.$swal("계좌번호는 필수 입력값입니다.");
      }
      this.$swal
        .fire({
          title: "정말 수정하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "MODIFY",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/userInfoUpdate", { user: this.userInfo }); // userInfo의 데이터를 받아 sql userInfoUpdate를 통해 회원정보 수정
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/mypage" }); // /mypage로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
userInfo: `SELECT * FROM t_user WHERE email = ?`
bankList: `SELECT bank_name FROM t_bank_name`

```

회원이 회원정보를 확인할 수 있는 페이지의 script 부분입니다.

userInfo sql문을 통해 해당 email를 가진 회원의 정보를 가져옵니다. 그리고 은행정보도 수정할 수 있게 bankList sql문을 통해 은행 이름 정보도 가져옵니다.

```javascript
* app.js

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
```

비밀번호 변경할 때에도 bcrypt로 암호화를 해줘야하기 때문에 update도 회원가입과 동일하게 따로 api를 구현해주었습니다.

---

### 주문내역 페이지 & 택배조회 기능

```javascript
* MemberPageOrder.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderList: {},
      user_email: "",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
    };
  },
  created() {
    this.user_email = this.$store.state.user.email; // 상태관리 되어있는 email를 user_email로 선언
    this.getCartList(); // created 단계에서 getCartList를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {
      // getCartList 메소드 호출
      let orderList = await this.$api("/api/orderList", {
        param: [this.user_email],
      }); // url를 따라 app.js의 /api/:alias를 타고 sql orderList를 통해 해당 회원의 주문정보 data 호출
      this.orderList = orderList;
      console.log(this.orderList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      orderList.forEach((item) => {
        total += item.totalPrice; // 장바구니에 담긴 제품들 모두 합친 가격
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        // total의 가격이 10만원이 넘어가면 배송료는 0
        deliveryPrice = 0;
      } else {
        deliveryPrice = 3000; // 그 외에는 배송료 3000원
      }
      this.deliveryPrice = deliveryPrice;

      let paymentAmount = total + deliveryPrice; // total 가격과 배송료를 모두 합친 총 결제 금액
      this.paymentAmount = paymentAmount;
    },
    goToOrder() {
      this.$router.push({ path: "/order" }); // 해당 메소드 실행 시, /order로 라우팅
    },
    goToDelivery(delivery_address) {
      // 운송장 번호 클릭 시, 배송조회가 가능한 웹페이지 새창으로 열기
      window.open(
        "http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=" +
          delivery_address
      );
    },
    async goToCancle(cart_id) {
      // cart_id를 받아 sweetAlert2 실행
      this.$swal
        .fire({
          title: "취소를 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "YES",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderCancle", { param: [cart_id] }); // 해당 cart_id의 data를 sql orderCancle를 통해 주문취소상태로 변경
            this.$swal.fire("Saved.", "", "success");
            this.$router.go(); // 새로고침
          }
        });
    },
  },
};
</script>

해당 sql
orderList: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t5.payment_amount, t3.order_id, t5.delivery_status, t5.created_date, t5.transport_document_number, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t4.email = ?`
orderCancle: `UPDATE t_orders SET delivery_status = 3 WHERE cart_id = ?`

```

회원의 주문내역을 확인할 수 있는 페이지입니다. orderList sql문을 통해 해당 email을 가진 주문 정보를 가져옵니다.

상품을 준비중 전 단계까지는 주문을 취소할 수 있게 취소 버튼이 활성화가 되게 구현하였고, 취소 버튼을 누르면 orderCancle sql문을 통해 delivery_status를 취소 단계인 3으로 변경되게 구현하였습니다.

그리고 운송장 번호를 입력해주면 운송장 번호인 `delivery_address`가 누를 수 있게 활성화가 되고 그 운송장 번호를 누르면 해당 운송장 번호를 path에 넣어 새창으로 CJ대한통운 택배조회가 되도록 구현하였습니다.

---

### 회원 관리 기능

```javascript
* MemberManagement.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo(); // created 단계에서 getUserInfo를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    async getUserInfo() {
      // getUserInfo 메소드 호출
      let userInfo = await this.$api("/api/userManagement"); // url를 따라 app.js의 /api/:alias를 타고 sql userManagement를 통해 data 호출
      this.userInfo = userInfo;
      console.log(this.userInfo); // 데이터를 잘 받아오는지 확인
    },
  },
};
</script>
```

회원 관리 페이지 script 부분입니다. 회원가입이 된 모든 회원 정보를 userManagement sql문을 통해 확인할 수 있도록 구현하였습니다.

---

### 주문 관리 기능

```javascript
* OrderManagement.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderList: {},
      statusList: [],
    };
  },
  created() {
    // created 단계에서 해당 메소드들을 실행시켜 data를 미리 호출
    this.getOrderList();
    this.getStatusList();
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getOrderList() {
      // getOrderList 메소드 호출
      let orderList = await this.$api("/api/orderManagement"); // url를 따라 app.js의 /api/:alias를 타고 sql orderManagement를 통해 data 호출
      this.orderList = orderList;
      console.log(this.orderList); // 데이터를 잘 받아오는지 확인
    },
    async getStatusList() {
      let statusList = await this.$api("/api/statusList"); // url를 따라 app.js의 /api/:alias를 타고 sql statusList를 통해 data 호출
      this.statusList = statusList;
    },
    goToDetail(order_id) {
      this.$router.push({
        path: "/order_detail",
        query: { order_id: order_id },
      }); // 해당 order_id를 path 주소에 넣어 해당 회원의 주문 상세페이지로 라우팅
    },
    // async goToCancle(cart_id) {
    //   this.$swal.fire({
    //     title: '취소를 하시겠습니까?',
    //     showCancelButton: true,
    //     confirmButtonText: 'YES',
    //     cancelButtonText: 'CANCEL'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       await this.$api("/api/orderCancle",{param:[cart_id]});
    //       this.$swal.fire('Saved.', '', 'success');
    //       this.$router.go();
    //     }
    //   });
    // }
  },
};
</script>

해당 sql
orderManagement: `SELECT t1.created_date, t1.order_id, t1.user_email, t1.name_of_depositor, t1.payment_amount, t1.delivery_status, t1.transport_document_number, t2.*
        FROM t_order t1, t_status t2
        WHERE t1.delivery_status = t2.status`
statusList: `SELECT status FROM t_status`

```

주문 관리 페이지의 script 부분입니다.

orderManagement, statusList sql문을 통해 모든 회원의 주문의 간략한 정보를 확인할 수 있게 구현하였습니다.

그리고 주문 상세 버튼을 통해 해당 주문에 대한 상세한 정보를 볼 수 있는 페이지로 라우팅되게 구현하였습니다.

```javascript
* OrderDetail.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      orderId: 0,
      orderDetail: {},
      statusList: [],
    };
  },
  created() {
    this.orderId = this.$route.query.order_id; // path의 order_id를 orderId로 선언
    this.getOrderDetail(); // created 단계에서 getOrderDetail를 실행시켜 data를 미리 호출
    this.getStatusList(); // created 단계에서 getStatusList를 실행시켜 data를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getOrderDetail() {
      // getCartList 메소드 호출
      let orderDetail = await this.$api("/api/orderDetail", {
        param: [this.orderId],
      }); // url를 따라 app.js의 /api/:alias를 타고 orderId를 보내고 sql cartList를 통해 data 호출
      this.orderDetail = orderDetail;
      console.log(this.orderDetail); // 데이터를 잘 받아오는지 확인
    },
    async getStatusList() {
      let statusList = await this.$api("/api/statusList"); // 해당 sql를 통해 status data 호출
      this.statusList = statusList;
    },
    goToList() {
      this.$router.push({ path: "/order_management" }); // 해당 메소드 실행 시, /order_management로 라우팅
    },
    async goToUpdate(order_id) {
      // order_id를 받아 sweetAlert2 실행
      this.$swal
        .fire({
          title: "정말 수정하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "MODIFY",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderUpdate", {
              param: [
                this.orderDetail[0].delivery_status,
                this.orderDetail[0].transport_document_number,
                order_id,
              ],
            }); // status, 운송장 번호, order_id data를 파라미터로 보내고 sql orderUpdate를 통해 주문정보 수정
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/order_management" }); // /order_management로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
orderDetail: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.quantity, t3.totalPrice, t3.order_id, t5.*, t4.email, t6.*
        FROM t_product t1, t_image t2, t_orders t3, t_user t4, t_order t5, t_status t6
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t5.delivery_status = t6.status AND t5.order_id = ?`
statusList: `SELECT status FROM t_status`
orderUpdate: `UPDATE t_order SET delivery_status = ?, transport_document_number = ? WHERE order_id = ?`

```

주문 상세 페이지 script 부분입니다. orderDetail sql을 통해 주문에 대한 상세 정보를 가져오고, 주문 상태를 변경할 수 있게, statusList sql문을 통해 주문상태 정보도 가져옵니다.

그리고 주문상태 변경 및 운송장 번호를 등록하기 위해 orderUpdate sql문을 통해 데이터를 update할 수 있도록 구현하였습니다.

---

### 장바구니 기능

```javascript
* MemberCart.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      cartList: {},
      cartId: "",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.cartId = this.$store.state.user.email; // store의 유저 이메일을 cartId로 선언
    this.getCartList(); // created 단계에서 getCartList()를 실행시켜 cartList 데이터를 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {
      // getCartList 메소드 호출
      let cartList = await this.$api("/api/cartList", { param: [this.cartId] }); // url를 따라 app.js의 /api/:alias를 타고 sql cartList로 data 호출
      this.cartList = cartList;
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      cartList.forEach((item) => {
        total += item.totalPrice; // 장바구니에 담긴 제품들 모두 합친 가격
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        // total의 가격이 10만원이 넘어가면 배송료는 0
        deliveryPrice = 0;
      } else {
        deliveryPrice = 3000; // 그 외에는 배송료 3000원
      }
      this.deliveryPrice = deliveryPrice;

      let paymentAmount = total + deliveryPrice; // total 가격과 배송료를 모두 합친 총 결제 금액
      this.paymentAmount = paymentAmount;
    },
    goToOrder() {
      this.$router.push({ path: "/order" }); // /order로 라우팅
    },
    deleteCart(cart_id) {
      // cart_id를 받아 sweetAlert2를 통해 cartList 데이터 삭제
      this.$swal
        .fire({
          title: "정말 삭제하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "DELETE",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/cartDelete", { param: [cart_id] });
            this.getCartList();
            this.$swal.fire("Deleted.", "", "success");
          }
        });
    },
  },
};
</script>

해당 sql
cartList: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.cart_id, t3.quantity, t3.totalPrice, t4.email
        FROM t_product t1, t_image t2, t_cart t3, t_user t4
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t4.email = ?`
cartDelete: `DELETE FROM t_cart WHERE cart_id=?`

```

cartList sql문을 통해 해당 email을 가진 장바구니 정보를 가져옵니다. 삭제 버튼을 누르면 cart_id를 받아 deletaCart sql문을 통해 해당 id를 가진 장바구니 데이터를 삭제합니다.

상품 주문 버튼을 누르면 상품 주문 페이지로 라우팅됩니다.

---

### 상품 주문 기능

```javascript
* ProductOrder.vue

<script>
export default {
  data() {
    // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      cartList: {},
      cartId: "",
      total: 0,
      deliveryPrice: 0,
      paymentAmount: 0,
      userInfo: {},
      sellerInfo: {},
      orderInfo: {},
    };
  },
  created() {
    this.cartId = this.$store.state.user.email; // store의 유저 이메일을 cartId로 선언
    this.getCartList(); // created 단계에서 getCartList를 실행시켜 data 미리 호출
    this.getUserInfo(); // created 단계에서 getUserInfo를 실행시켜 data 미리 호출
    this.getSellerInfo(); // created 단계에서 getSellerInfo를 실행시켜 data 미리 호출
  },
  methods: {
    // 메소드 호출
    getCurrencyFormat(value) {
      // 가격의 ,을 새겨주는 $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getUserInfo() {
      // getUserInfo 메소드 호출
      let userInfo = await this.$api("/api/userInfo", { param: [this.cartId] }); // url를 따라 app.js의 /api/:alias를 타고 cartId를 파라미터로 보내고, sql userInfo를 통해 data 호출
      if (userInfo.length > 0) {
        // UserInfo의 데이터를 가져왔을 때
        this.userInfo = userInfo[0]; // UserInfo의 첫번째만 가져옴
      }
    },
    async getSellerInfo() {
      // getSellerInfo 메소드 호출
      let sellerInfo = await this.$api("/api/sellerInfo"); // url를 따라 app.js의 /api/:alias를 타고 sql sellerInfo를 통해 data 호출
      if (sellerInfo.length > 0) {
        // sellerInfo의 데이터를 가져왔을 때
        this.sellerInfo = sellerInfo[0]; // sellerInfo의 첫번째만 가져옴
      }
    },
    async getCartList() {
      // getCartList 메소드 호출
      let cartList = await this.$api("/api/cartList", { param: [this.cartId] }); // url를 따라 app.js의 /api/:alias를 타고 cartId를 파라미터로 보내고, sql cartList를 통해 data 호출
      this.cartList = cartList;
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      cartList.forEach((item) => {
        total += item.totalPrice; // 주문내역에 담긴 제품들 모두 합친 가격
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        // total의 가격이 10만원이 넘어가면 배송료는 0
        deliveryPrice = 0;
      } else {
        deliveryPrice = 3000; // 그 외에는 배송료 3000원
      }
      this.deliveryPrice = deliveryPrice;

      let paymentAmount = total + deliveryPrice; // total 가격과 배송료를 모두 합친 총 결제 금액
      this.paymentAmount = paymentAmount;
    },
    async orderPayment() {
      this.$swal
        .fire({
          title: "결제를 하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "PAYMENT",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/orderPayment", {
              param: [
                this.userInfo.address,
                this.userInfo.name,
                this.userInfo.phone,
                this.orderInfo.requested_term,
                this.orderInfo.name_of_depositor,
                this.$store.state.user.email,
                this.paymentAmount,
              ],
            }); // 해당 data들을 파라미터로 보내고, sql orderPayment를 통해 data Insert
            this.$api("/api/cartCopy", {
              param: [this.$store.state.user.email],
            }); // 상태관리중인 email data를 파라미터로 보내고, sql cartCopy를 통해 data 복사
            this.$api("/api/deleteCart", {
              param: [this.$store.state.user.email],
            }); // 상태관리중인 email data를 파라미터로 보내고, sql deleteCart 통해 data 삭제
            this.$swal.fire("Complete.", "", "success");
            this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          }
        });
    },
  },
};
</script>

해당 sql
userInfo: `SELECT * FROM t_user WHERE email = ?`
sellerInfo: `SELECT * FROM t_seller`
cartList: `SELECT t1.id, t1.product_name, t1.product_price, t2.path, t3.cart_id, t3.quantity, t3.totalPrice, t4.email
        FROM t_product t1, t_image t2, t_cart t3, t_user t4
        WHERE t1.id = t2.product_id AND t1.id = t3.product_id AND t3.user_email = t4.email AND t2.type = 1 AND t4.email = ?`
orderPayment: `INSERT INTO t_order (address, name, phone, requested_term, name_of_depositor, user_email, payment_amount) VALUES (?, ?, ?, ?, ?, ?, ?)`
cartCopy: `INSERT INTO t_orders (cart_id, product_id, user_email, quantity, totalPrice, order_id)
        SELECT t1.cart_id, t1.product_id, t1.user_email, t1.quantity, t1.totalPrice, MAX(t2.order_id)
        FROM t_cart t1, t_order t2
        WHERE t1.user_email = ?
        GROUP BY t1.cart_id`
deleteCart: `DELETE FROM t_cart WHERE user_email = ?`

```

상품 주문 페이지 script 부분입니다. userInfo sql문을 통해 회원정보를 가져옵니다.

sellerInfo sql문을 통해 입금할 계좌번호 정보를 가져옵니다. cartList sql문을 통해 주문할 제품 정보를 가져옵니다.

orderPayment sql문을 통해 주문 정보를 Insert합니다.

cartCopy sql문을 통해 장바구니의 정보를 복사해줍니다.

deleteCart sql문을 통해 장바구니에 해당 정보를 삭제합니다.

---

### 느낀점

이렇게 쇼핑몰 만들기 미니 프로젝트를 구현해봤습니다. 두달이 넘는 시간동안 유튜브, 구글링, 오픈채팅, 등을 활용하여 많은 정보를 찾아보고 사용해보며 많은 공부가 되었던 프로젝트였습니다.

완성도가 높거나 많은 기능을 담은 프로젝트는 아니지만 처음으로 제대로 된 프로젝트를 만들어봐서 좋은 경험이 된 거 같습니다. 앞으로도 더 공부하여 다른 프로젝트도 만들어볼 것이고 갈수록 완성도도 높고 많은 기능을 담은 프로젝트를 만들어 볼 것입니다.

많이 부족한 제 프로젝트를 봐주셔서 감사드립니다.
