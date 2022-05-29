<template>
  <main class="mt-3">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h4 class="text-center mb-5">Membership information</h4>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">E-mail</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                disabled
                readonly
                v-model="userInfo.email"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Password</label>
            <div class="col-md-9">
              <input
                type="password"
                class="form-control"
                v-model="userInfo.password"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Name</label>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="userInfo.name" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Address</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="userInfo.address"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Phone</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="userInfo.phone"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Account holder</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="userInfo.account_holder"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-md-3 col-form-label">Bank name</label>
            <div class="col-md-9">
              <select class="form-select" v-model="userInfo.bank_name">
                <option :key="i" v-for="(bank, i) in bankList">
                  {{ bank.bank_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-5 row">
            <label class="col-md-3 col-form-label">Bank account number</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                v-model="userInfo.bank_account_number"
              />
            </div>
          </div>
          <div class="row">
            <div class="d-flex justify-content-between align-items-center">
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-dark"
                  @click="goToList"
                >
                  CANCEL
                </button>
              </div>
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-dark"
                  @click="productUpdate"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

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