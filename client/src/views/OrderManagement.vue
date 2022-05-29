<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="orderList == 0" class="row">
        <h5 class="m-4">주문내역이 없습니다.</h5>
      </div>
      <div v-else>
        <h4 class="text-center mb-5">Order Management</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>주문일자[주문번호]</th>
              <th>주문자 이메일</th>
              <th>입금자명</th>
              <th>결제금액</th>
              <th>주문처리상태</th>
              <th>운송장번호</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(order, i) in orderList">
              <td class="align-middle">
                {{ order.created_date }} [{{ order.id }}]
              </td>
              <td class="align-middle">{{ order.user_email }}</td>
              <td class="align-middle">{{ order.name_of_depositor }}</td>
              <td class="align-middle">
                {{ getCurrencyFormat(order.payment_amount) }}
              </td>
              <td class="align-middle">{{ order.status }}</td>
              <td class="align-middle">
                CJ대한통운<br />{{ order.transport_document_number }}
              </td>
              <td>
                <button
                  class="btn btn-outline-dark"
                  @click="goToDetail(order.order_id)"
                >
                  주문 상세
                </button>
              </td>
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