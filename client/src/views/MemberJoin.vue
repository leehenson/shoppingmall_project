<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h5 class="mb-5 text-start">BASIC INFOMATION</h5>
          <form class="text-start">
            <div class="form-group mb-5">
              <label class="mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                class="form-control"
                placeholder="(영문소문자/숫자, 4~16자)@example.com"
                v-model="t_user.email"
              />
            </div>
            <div class="form-group mb-5">
              <label class="mb-2">PASSWORD</label>
              <input
                type="password"
                class="form-control"
                placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)"
                v-model="t_user.password"
              />
            </div>
            <div class="form-group mb-5">
              <label class="mb-2">NAME</label>
              <input type="text" class="form-control" v-model="t_user.name" />
            </div>
            <div class="form-group mb-5">
              <label class="mb-2">ADDRESS</label>
              <input
                type="text"
                class="form-control"
                v-model="t_user.address"
              />
            </div>
            <div class="form-group mb-5">
              <label class="mb-2">MOBILE</label>
              <input type="text" class="form-control" v-model="t_user.phone" />
            </div>
            <div class="form-group mb-2">
              <label>REFUND ACCOUNT INFOMATION</label>
            </div>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text">예금주</span>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="t_user.account_holder"
              />
            </div>
            <div class="input-group mb-2">
              <label class="input-group-text">은행명</label>
              <select class="form-select" v-model="t_user.bank_name">
                <option :key="i" v-for="(bank, i) in bankList">
                  {{ bank.bank_name }}
                </option>
              </select>
            </div>
            <div class="input-group mb-5">
              <div class="input-group-prepend">
                <span class="input-group-text">계좌번호</span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="('-'와 숫자만 입력해주세요.)"
                v-model="t_user.bank_account_number"
              />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-secondary"
                  @click="goToLogin"
                >
                  취소하기
                </button>
              </div>
              <div class="col-6 d-grid p-1">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-secondary"
                  @click="memberJoin"
                >
                  저장하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template> ->

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