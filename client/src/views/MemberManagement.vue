<template>
  <main class="mt-5">
    <div class="container">
      <h4 class="text-center mb-5">User Management</h4>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Account holder</th>
              <th>Bank name</th>
              <th>Bank account number</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(user, i) in userInfo">
              <td class="align-middle">{{ user.email }}</td>
              <td class="align-middle">{{ user.name }}</td>
              <td class="align-middle">{{ user.address }}</td>
              <td class="align-middle">{{ user.phone }}</td>
              <td class="align-middle">{{ user.account_holder }}</td>
              <td class="align-middle">{{ user.bank_name }}</td>
              <td class="align-middle">{{ user.bank_account_number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

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